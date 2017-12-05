import getObject from "../http/getObject";

(async function() {
  const scripts = document.querySelectorAll("script"),
    lastScript = scripts.length > 0 && scripts[scripts.length - 1];

  if(lastScript) {
    const id = lastScript.dataset.id;
    if(!id) {
      window.STORE_DATA_PROMISE = getObject("/store-data");
    }
    else {
      const data = await window.STORE_DATA_PROMISE,
        stripe = data.stripe,
        info = data.files[id];

      if(info) {
        const item = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.className = "item-title";
        if(/attach-\d+$/.test(id)) {
          titleCell.className += " item-attachment";
        }
        item.appendChild(titleCell);

        const title = document.createElement("dl");
        titleCell.appendChild(title);
        titleCell.appendChild(document.createTextNode(" "));

        const name = document.createElement("dt");
        const ico = document.createElement("span");
        ico.className = `download-icon icon-${info.icon}`;
        ico.title = `${info.icon} icon`;
        name.appendChild(ico);
        name.appendChild(document.createTextNode(info.name));
        title.appendChild(name);

        const size = document.createElement("span");
        size.appendChild(document.createTextNode(" " + info.size));
        name.appendChild(size);

        if(info.description !== "attachment") {
          const descrip = document.createElement("dd");
          descrip.className = "item-description";
          descrip.appendChild(document.createTextNode(info.description));
          title.appendChild(descrip);
        }

        const type = document.createElement("td");
        type.className = "item-type";
        item.appendChild(type);

        let formattedPrice = "(free)";
        if(info.amount) {
          const usd = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "code"
            });
          formattedPrice = usd.format(info.amount / 100);
        }

        const price = document.createElement("td")
        price.className = "item-price";
        price.appendChild(document.createTextNode(formattedPrice));
        item.appendChild(price);

        const action = document.createElement("td");
        action.className = "item-action";
        item.appendChild(action);

        const path = `/download/${id}`;

        if(info.amount) {
          const form = document.createElement("form");
          form.method = "POST";
          form.action = path;
          action.appendChild(form);

          const script = document.createElement("script");
          Object.assign(script, {
            className: "stripe-button",
            src: "https://checkout.stripe.com/checkout.js"
          });
          Object.assign(script.dataset, stripe);
          form.appendChild(script);
        }
        else {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "stripe-button-el";
          button.addEventListener("click", () =>
            document.location = path);
          action.appendChild(button);

          const label = document.createElement("span");
          label.appendChild(document.createTextNode("Download"));
          button.appendChild(label);
        }

        lastScript.parentElement.replaceChild(item, lastScript);
      }
    }
  }
})();
