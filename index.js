LD_LIBRARY_PATH=. ./bedrock_server| while read -r line
2do
3echo "${line}"
4if [[ $line == *Player\ connected* ]]; then echo "${line}"  | curl -X POST -H "Content-Type: application/json" -d "{\"embeds\": [{\"title\": \"$(awk '{print$6}')がログインしました。\",\"color\": 5620992}]}" https://discord.com/api/webhooks/123456789/https://discord.com/api/webhooks/1270124631248080896/6GepAJoS01DRZ6eDE7LwM5AKPNbQU5-ogBneQsTQrOI5MA_NGwz31umxRX8WBTWQpPkG ; fi
5if [[ $line == *Player\ disconnected* ]]; then echo "${line}"  | curl -X POST -H "Content-Type: application/json" -d "{\"embeds\": [{\"title\": \"$(awk '{print$6}')がログアウトしました。\",\"color\": 15925504}]}" https://discord.com/api/webhooks/123456789/https://discord.com/api/webhooks/1270124631248080896/6GepAJoS01DRZ6eDE7LwM5AKPNbQU5-ogBneQsTQrOI5MA_NGwz31umxRX8WBTWQpPkG ; fi
6done;
