$key = "~\.ssh\sean-mcbeth.pem"
$user = "azureuser"
$hostname = "highlandas.com"

# Copy the package archive to the server
scp -i ${key} ..\deploy\linux\HFRS.linux.zip ${user}@${hostname}:~/HFRS.linux.zip

# Execute the update script on the remote server
$cmd = (Get-Content -Raw .\deploy.sh) -replace "(?:`r?`n)+", "`n" # make sure the Windows/Unix newline character confusion doesn't happen
ssh -i ${key} ${user}@${hostname} "${cmd}"