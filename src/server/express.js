const path = require("path"),
  documentPath = path.join(__dirname, "..", "..", "resources", "logo.ai"),
  price = 1500;

module.exports = function express(appServer) {

  const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || "pk_test_6pRNASCoBOKtIshFeQd4XMUh",
    stripePrivateKey = process.env.STRIPE_PRIVATE_KEY || "sk_test_BQokikJOvBiI2HlWgH4olfQ2",
    stripe = require("stripe")(stripePrivateKey);

  appServer.get("/stripe-key", function(req, res, next) {
    res.status(200).send(stripePublicKey);
  });

  appServer.post("/charge", function(req, res, next) {
    const {
      stripeToken,
      stripeTokenType,
      stripeEmail
    } = req.body;


    console.log(stripeToken, stripeTokenType, stripeEmail);

    stripe.customers.create({
      email: stripeEmail,
      source: stripeToken
    })
      .then((customer) =>
        stripe.charges.create({
          amount: price,
          description: "'CPT Mr. Who?' How Bad Add/Sals Can Sink Your Stewardship",
          currency: "usd",
          customer: customer.id
        }))
      .then((charge) =>
        res.download(documentPath));
  });

};
