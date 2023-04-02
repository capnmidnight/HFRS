# Get .NET 7, Zip, Unzip, and Certbot
sudo apt-get update
sudo apt-get install -y \
    dotnet-sdk-7.0 \
    zip \
    unzip

sudo snap install --classic certbot

# Create a directory for it
mkdir ~/bin ~/bin/HFRS ~/bin/HFRS/certs

# Unpack the package
unzip ~/HFRS.linux.zip -d ~/bin/HFRS

# Set executable bits
chmod 700 ~/bin/HFRS/HFRS

# Install the Let's Encrypt renewal hooks
sudo cp -r ~/letsencrypt/* /etc/letsencrypt/
sudo chown -R root:root /etc/letsencrypt/renewal-hooks/*

# Copy the Let's Encrypt certs so we can use them from the server
for certfile in cert.pem chain.pem fullchain.pem privkey.pem ; do
	sudo cp -L /etc/letsencrypt/live/highlandas.com/"${certfile}" ~/bin/HFRS.new/certs/"${certfile}"
	sudo chown azureuser:azureuser ~/bin/HFRS.new/certs/"${certfile}"
done

# Create the SystemD service
sudo mv ~/HFRS.service /etc/systemd/system/HFRS.service
sudo chown root:root /etc/systemd/system/HFRS.service
sudo systemctl daemon-reload
sudo setcap CAP_NET_BIND_SERVICE=+eip ~/bin/HFRS/HFRS
sudo systemctl enable HFRS

# Startup
sudo systemctl start HFRS

# Cleanup
rm ~/HFRS.linux.zip
rm -rf ~/letsencrypt/