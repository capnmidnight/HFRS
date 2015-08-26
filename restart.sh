read -e -p "view old log file? " -i "Y" choice
if [ $choice = "Y" ]; then
    less ~/.forever/HFRSServer.log
fi

forever stop "HFRSServer"

read -e -p "delete old log file? " -i "N" choice
if [ $choice != "N" ]; then
    rm ~/.forever/HFRSServer.log
fi
cd ..
git pull
cd server
forever --uid "HFRSServer" -a start /usr/local/bin/npm start
