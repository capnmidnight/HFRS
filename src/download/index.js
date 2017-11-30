import getText from "../http/getText";

(async function() {
  const stripeKey = await getText("/stripe-key"),
    form = document.querySelector("form"),
    script = document.createElement("script");

  Object.assign(script, {
    className: "stripe-button",
    src: "https://checkout.stripe.com/checkout.js"
  });

  Object.assign(script.dataset, {
    key: stripeKey,
    amount: 1500,
    name: "CPT Mr. Who?",
    description: "How Bad Add/Sals Can Sink Your Stewardship",
    image: "https://www.highlandfrs.com/images/logo.min.png",
    locale: "auto",
    zipCode: true
  });

  form.appendChild(script);
})();
