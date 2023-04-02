$key = "~\.ssh\sean-mcbeth.pem"
$user = "azureuser"
$hostname = "highlandas.com"

ssh -i ${key} ${user}@${hostname}