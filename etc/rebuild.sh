sudo systemctl stop HFRS

dotnet publish ~/src/HFRS/HFRS -c Release -o ~/bin/HFRS

sudo systemctl start HFRS
