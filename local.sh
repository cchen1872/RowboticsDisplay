ngrok http 8000 > /dev/null &
sleep 10
EXPO_PUBLIC_FLASK_URL=$(curl -s http://localhost:4040/api/tunnels | jq ".tunnels[0].public_url")
EXPO_PUBLIC_FLASK_URL_NAME="EXPO_PUBLIC_FLASK_URL="
echo "GETTING TUNNELED URL"
echo $EXPO_PUBLIC_FLASK_URL
echo EXPO_PUBLIC_FLASK_URL=$EXPO_PUBLIC_FLASK_URL > .env.local 
echo "" > .env.development
npx expo start
pkill ngrok