LD_LIBRARY_PATH=. ./bedrock_server| while read -r line
do
echo "${line}"
if [[ $line == *Player\ connected* ]]; then echo "${line}"  | curl -X POST -H "Content-Type: application/json" -d "{\"embeds\": [{\"title\": \"$(awk '{print$6}')がログインしました。\",\"color\": 5620992}]}" https://discord.com/api/webhooks/123456789/https://discord.com/api/webhooks/1176753071586558022/CKsM3YzUZgB52jX22D64xz_9pGg3_VfPeyni3fz4EAv6R3SvAj8x-FMpC3gJbsoeRHJv ; fi
if [[ $line == *Player\ disconnected* ]]; then echo "${line}"  | curl -X POST -H "Content-Type: application/json" -d "{\"embeds\": [{\"title\": \"$(awk '{print$6}')がログアウトしました。\",\"color\": 15925504}]}" https://discord.com/api/webhooks/123456789/https://discord.com/api/webhooks/1176753071586558022/CKsM3YzUZgB52jX22D64xz_9pGg3_VfPeyni3fz4EAv6R3SvAj8x-FMpC3gJbsoeRHJv ; fi
done;
