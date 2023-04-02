$key = "~\.ssh\vmaccess.pem"
$user = "azureuser"
$hostname = "higlandas.com"

echo "I hope you didn't forget to edit the SystemD service file!"

# Copy the Let's Encrypt update hooks
scp -i ${key} -r .\letsencrypt\* ${user}@${hostname}:~/letsencrypt/

# Copy the SystemD service file to the remote server
scp -i ${key} .\HFRS.service sudo ${user}@${hostname}:~/HFRS.service

# Copy the .NET package archive to the remote server
scp -i ${key} ..\deploy\HFRS.linux.zip ${user}@${hostname}:~/HFRS.linux.zip

# Execute the install script on the remote server
$cmd = (Get-Content -Raw .\install.sh) -replace "(?:`r?`n)+", "`n" # make sure the Windows/Unix newline character confusion doesn't happen
ssh -i ${key} ${user}@${hostname} "${cmd}"