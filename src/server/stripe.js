const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || "pk_test_6pRNASCoBOKtIshFeQd4XMUh",
      stripePrivateKey = process.env.STRIPE_PRIVATE_KEY || "sk_test_BQokikJOvBiI2HlWgH4olfQ2",
      stripe = require("stripe")(stripePrivateKey),
      path = require("path");

function res(f) {
  return path.join("resources", f);
}

const logo = "https://www.highlandfrs.com/images/logo.min.png";

const files = {
  "ranks" :{
    path: res("US Uniformed Services guide to Ranks.v2016.pdf"),
    amount: 1500,
    name: "US Uniformed Services Guid to Ranks, 2016 ed.",
    description: "A rank and reference guide to the Uniformed Services of the United States of America",
    icon: "pdf",
    size: "(PDF 1.0MB)"
  },
  "who": {
    path: res("2017_ADRP_Conference_HighlandFrS_Session_8B.pptx"),
    name: "CPT Mr. Who: How Bad Add/Sals Can Sink Your Stewardship",
    description: "ADRP International Conference, Las Vegas, NV - 27 SEP 2017 - as presented by Melody Allen McBeth and Roxanne (Globis) Thurston",
    icon: "powerpoint",
    size: "(PPTX 0.9MB)"
  },
  "who-attach-1": {
    path: res("HFRS - add_sal suggested formats.pdf"),
    name: "Standard Addressee and Salutation Formats",
    description: "attachment",
    icon: "pdf",
    size: "(PDF 0.9MB)"
  },
  "partnership": {
    path: res("How_a_Partnership_Can_Improve_Your_Stewardship.pdf"),
    name: "How a Partnership Can Improve Your Stewardship",
    description: "South East Donor Relations Conference - 9 JUN 2017, as presented by Melody Allen McBeth and Michael Dotson",
    icon: "pdf",
    size: "(PDF 0.8MB)"
  },
  "partnership-attach-1": {
    path: res("HFRS-Event_Comm_Request_Form-Event.pdf"),
    name: "Template Request Form - Events",
    description: "attachment",
    icon: "pdf",
    size: "(PDF 0.4MB)"
  },
  "partnership-attach-2": {
    path: res("HFRS-Event_Comm_Request_Form-Gala.pdf"),
    name: "Template Request Form - Gala",
    description: "attachment",
    icon: "pdf",
    size: "(PDF 0.4MB)"
  },
  "partnership-attach-3": {
    path: res("HFRS-Event_Comm_Request_Form-Sol.pdf"),
    name: "Template Request Form - Solicitation",
    description: "attachment",
    icon: "pdf",
    size: "(PDF 0.3MB)"
  },
  "gift-horse": {
    path: res("AASP_Reg_Dallas_03172017.zip"),
    name: "Looking a Gift Horse in the Mouth",
    description: "Dallas AASP Regional Symposium - 17 MAR 2017, as presented by Melody Allen McBeth and Anita Lawson",
    icon: "powerpoint",
    size: "(ZIP 5.8MB)"
  },
  "data-integrity-pdf": {
    path: res("The_Economics_of_Data_Integrity.pdf"),
    name: "The Economics of Data Integrity (abridged)",
    description: "AASP Summit, 29 OCT 2015, as presented by Melody Allen McBeth",
    icon: "pdf",
    size: "(PDF 6.8MB)"
  },
  "data-integrity-ppt": {
    path: res("CASE_CCA_2015_Economics.pptx"),
    name: "The Economics of Data Integrity",
    description: "CASE Conference for Community Colleges, 2 OCT 2015, as presented by Melody Allen McBeth and Lynn Andrews",
    icon: "powerpoint",
    size: "(PPTX 1.5MB)"
  }
};

function withStripe(thunk) {
  return function(req, res, next) {
    if(!stripePublicKey || !stripePrivateKey) {
      res.status(501)
        .send("Server is not configured correctly");
    }
    else {
      thunk(req, res, next);
    }
  }
}

function withFile(thunk) {
  return withStripe(function(req, res, next) {
    const { id } = req.params,
      file = files[id];
    if(!file) {
      res.status(404)
        .send(`No file ${id}`);
    }
    else {
      thunk(req, res, next, file);
    }
  });
}

module.exports = function express(appServer) {

  appServer.get("/store-data", withStripe(function(req, res, next) {
    const info = {
      stripe: {
        key: stripePublicKey,
        image: logo,
        locale: "auto",
        zipCode: true,
      },
      files: JSON.parse(JSON.stringify(files))
    };

    for(let key in info.files) {
      if(info.files[key].amount) {
        delete info.files[key].path;
      }
    }

    res.status(200).send(info);
  }));

  appServer.get("/download/:id", withFile(function(req, res, next, file) {
    if(file.amount > 0) {
      res.status(402)
        .send(`The price for ${file.name} is USD${file.amount/100}.`);
    }
    else {
      res.status(200)
        .download(file.path);
    }
  }));

  appServer.post("/download/:id", withFile(async function(req, res, next, file) {

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
