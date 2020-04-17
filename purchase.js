var req = new XMLHttpRequest();
req.onerror = console.error.bind(console);
req.onabort = console.error.bind(console);
req.onload = function () {
    if (req.status >= 400) {
        console.error(req);
    }
    else if(typeof req.response === "string"
        && req.response.length > 0) {
        buildStore(JSON.parse(req.response));
    }
    else if (typeof req.response === "object") {
        buildStore(req.response);
    }
};

req.open("GET", "/store-data");
req.responseType = "json";
req.setRequestHeader("Accept", "application/json");
req.send();

function buildStore(evt) {
    var stripe = evt.stripe,
        files = evt.files,
        realTable = document.querySelector("#downloadsList"),
        table = document.createElement("tbody");

    for (var id in files) {
        var info = files[id];

        if (info) {
            var item = document.createElement("tr");
            table.appendChild(item);

            var titleCell = document.createElement("td");
            titleCell.className = "item-title";
            if (/attach-\d+$/.test(id)) {
                titleCell.className += " item-attachment";
            }
            item.appendChild(titleCell);

            var title = document.createElement("dl");
            titleCell.appendChild(title);
            titleCell.appendChild(document.createTextNode(" "));

            var name = document.createElement("dt");
            var ico = document.createElement("span");
            ico.className = `download-icon icon-${info.icon}`;
            ico.title = `${info.icon} icon`;
            name.appendChild(ico);
            name.appendChild(document.createTextNode(info.name));
            title.appendChild(name);

            var size = document.createElement("span");
            size.appendChild(document.createTextNode(" " + info.size));
            name.appendChild(size);

            if (info.description !== "attachment") {
                var descrip = document.createElement("dd");
                descrip.className = "item-description";
                descrip.appendChild(document.createTextNode(info.description));
                title.appendChild(descrip);
            }

            var type = document.createElement("td");
            type.className = "item-type";
            item.appendChild(type);

            var formattedPrice = "(free)";
            if (info.amount) {
                var usd = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "code"
                });
                formattedPrice = usd.format(info.amount / 100);
            }

            var price = document.createElement("td")
            price.className = "item-price";
            price.appendChild(document.createTextNode(formattedPrice));
            item.appendChild(price);

            var action = document.createElement("td");
            action.className = "item-action";
            item.appendChild(action);

            var path = `/download/${id}`;

            if (info.amount) {
                var form = document.createElement("form");
                form.method = "POST";
                form.action = path;
                action.appendChild(form);

                var script = document.createElement("script");
                Object.assign(script, {
                    className: "stripe-button",
                    src: "https://checkout.stripe.com/checkout.js"
                });
                Object.assign(script.dataset, stripe);
                form.appendChild(script);
            }
            else {
                var link = document.createElement("a");
                link.className = "stripe-button-el";
                link.href = path;
                action.appendChild(link);

                var label = document.createElement("span");
                label.appendChild(document.createTextNode("Download"));
                link.appendChild(label);
            }
        }
    }

    realTable.appendChild(table);
}
