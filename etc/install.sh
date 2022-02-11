# ONE TIME

## get dotnet core 3.1
wget https://packages.microsoft.com/config/ubuntu/21.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-6.0

## Setup project to use LettuceEncrypt
# --> https://github.com/natemcmaster/LettuceEncrypt

## :> install your private key
touch ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
nano ~/.ssh/id_rsa # <- paste it in

## open the firewall
sudo ufw allow http
sudo ufw allow https

## clone repo
mkdir src
cd src
git clone --depth 1 git@github.com:capnmidnight/HFRS.git
cd HFRS
git submodule init
git submodule update --recursive --depth 1

mkdir ~/bin

## test
cd src/HFRS
dotnet run

## CTRL+C to cancel test, then publish
dotnet publish ~/src/HFRS/HFRS -c Release -o ~/bin/HFRS

## run it
cd ~/bin/HFRS
./HFRS

## CTRL+C to cancel, then publish the systemd service
sudo cp ~/HFRS.service /etc/systemd/system/
sudo systemctl daemon-reload

## Allow app to run on port 80/443
sudo setcap CAP_NET_BIND_SERVICE=+eip ~/bin/HFRS/HFRS

## enable auto startup
sudo systemctl enable HFRS

## start systemd service
sudo systemctl start HFRS
sudo systemctl status HFRS
