# Make a space to do work
rm -rf ~/bin/HFRS.old/
rm -rf ~/bin/HFRS.new/
mkdir ~/bin/HFRS.new/ ~/bin/HFRS.new/certs/

# Unpack the .NET package archive
unzip ~/HFRS.linux.zip -d ~/bin/HFRS.new/

# Enable execution of certain parts
chmod 700 ~/bin/HFRS.new/HFRS

# Copy the Let's Encrypt certificates
for certfile in cert.pem chain.pem fullchain.pem privkey.pem ; do
	sudo cp -L /etc/letsencrypt/live/highlandas.com/"${certfile}" ~/bin/HFRS.new/certs/"${certfile}"
	sudo chown smcbeth:smcbeth ~/bin/HFRS.new/certs/"${certfile}"
done

# Backup the old and put in the new
sudo systemctl stop HFRS
mv ~/bin/HFRS/ ~/bin/HFRS.old/
mv ~/bin/HFRS.new/ ~/bin/HFRS/
sudo systemctl start HFRS

# Cleanup
rm ~/HFRS.linux.zip