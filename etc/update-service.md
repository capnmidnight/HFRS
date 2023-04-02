# When updating permissions and environment variables for the SystemD service

## Put the new service definition file in place
> sudo cp ~/HFRS.service /etc/systemd/system/HFRS.service

## Register the changes with SystemD
> sudo systemctl daemon-reload

## Restart the service
> sudo systemctl restart HFRS