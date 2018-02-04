const stripe = require("stripe"),
      fs = require("fs"),
      path = require("path"),
      { promisify } = require("util"),
      readFile = promisify(fs.readFile),
      lstat = promisify(fs.lstat);


const dataFilePath = path.join(__dirname, "fileData.json"),
      logo = "https://www.highlandas.com/images/logo.min.png",
      icons = {
        ppt: "powerpoint",
        pptx: "powerpoint",
        pdf: "pdf",
        default: "powerpoint"
      };

let files = null,
  publicFiles = null;

function formatFileSize(size) {
  if(size < 0) {
    throw new Error("size cannot be less than 0");
  }
  else if(size === 0) {
    return "0B";
  }
  else {
    const basis = 1000,
      units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      magnitude = Math.floor(Math.log(size) / Math.log(basis)),
      divisor = Math.pow(basis, magnitude),
      value = size / divisor;

    return `${value.toFixed(1)} ${units[magnitude - 1]}`;
  }
}


async function getFiles() {
  const file = await readFile(dataFilePath, "utf8");

  files = JSON.parse(file);
  publicFiles = JSON.parse(file);

  for(let name in files) {
    const file = files[name],
      publicFile = publicFiles[name];
    if(file) {
      try {
        const parts = path.parse(file.fileName),
          ext = parts.ext.substring(1),
          icon = icons[ext] || icons.default,
          p = path.join("resources", file.fileName),
          stats = await lstat(p),
          size = formatFileSize(stats.size);

        Object.assign(file, {
          path: p,
          icon,
          size: `(${ext.toLocaleUpperCase()} ${size})`
        });

        Object.assign(publicFile, file);
        delete publicFile.path;

      }
      catch(exp) {
        delete files[name];
        delete publicFiles[name]
      }
    }
  }
}

getFiles();

fs.watch(dataFilePath, {
  persistent: false
}, getFiles);


function withStripe(thunk) {
  return function(req, res, next) {
    const stripePublicKey = process.env.STRIPE_PUBLIC_KEY,
      stripePrivateKey = process.env.STRIPE_PRIVATE_KEY,
      s = stripe(stripePrivateKey);

    if(!stripePublicKey || !stripePrivateKey) {
      res.status(501)
        .send("Server is not configured correctly");
    }
    else {
      thunk(req, res, next, stripePublicKey, stripePrivateKey, s);
    }
  }
}

function withFile(thunk) {
  return withStripe(function(req, res, next, stripePublicKey, stripePrivateKey, stripe) {
    const { id } = req.params,
      file = files[id];
    if(!file) {
      res.status(404)
        .send(`No file ${id}`);
    }
    else {
      thunk(req, res, next, stripePublicKey, stripePrivateKey, stripe, file);
    }
  });
}

module.exports = function express(appServer) {

  appServer.get("/store-data", withStripe(function(req, res, next, stripePublicKey, stripePrivateKey, stripe) {
    const info = {
      stripe: {
        key: stripePublicKey,
        image: logo,
        locale: "auto",
        zipCode: true,
      },
      files: publicFiles
    };

    res.status(200).send(info);
  }));

  appServer.get("/download/:id", withFile(function(req, res, next, stripePublicKey, stripePrivateKey, stripe, file) {
    if(file.amount) {
      res.status(402)
        .send(`The price for ${file.name} is USD${file.amount/100}.`);
    }
    else {
      res.status(200)
        .download(file.path);
    }
  }));

  appServer.post("/download/:id", withFile(async function(req, res, next, stripePublicKey, stripePrivateKey, stripe, file) {

    if(file.amount > 0) {
      const {
          stripeToken,
          stripeTokenType,
          stripeEmail
        } = req.body;

      if(!(stripeToken && stripeTokenType && stripeEmail)) {
        res.status(400)
          .send("Missing account info");
      }
      else {
        const customer = await stripe.customers.create({
          email: stripeEmail,
          source: stripeToken
        });

        const charge = await stripe.charges.create({
          amount: file.amount,
          description: `'${file.name}' ${file.description}`,
          currency: "usd",
          customer: customer.id
        });
      }

      res.download(file.path);
    }
  }));

};
