#!/bin/bash -e

domain=highlandas.com
user=asueruser
assembly=HFRS.Site

for certfile in cert.pem chain.pem fullchain.pem privkey.pem ; do
	cp -L /etc/letsencrypt/live/${domain}/${certfile} /home/${user}/bin/${assembly}/certs/${certfile}.new
	chown ${user}:${user} /home/${user}/bin/${assembly}/certs/${certfile}.new
	mv /home/${user}/bin/${assembly}/certs/${certfile}.new /home/${user}/bin/${assembly}/certs/${certfile}
done