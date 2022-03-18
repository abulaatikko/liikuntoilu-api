# liikuntoilu

Old Liikuntoilu service (2006-2015) was shut down. Here is an API to the data.

* http://liikuntoilu.net/
* http://liikuntoilu.net/api/

## Requirements

* node.js and npm
* mysql
* pm2 (or equivalent)
* nginx (or equivalent)

## Installation

1. git clone https://github.com/abulaatikko/liikuntoilu.git
2. schema.sql
3. cp app/backend/config.sample app/backend/config.js; vim app/backend/config.js
4. npm install
5. bower install
6. grunt dist (*dev* and *test* supported as well)
7. pm2 start app/backend/server.js --name liikuntoilu-backend --watch app/backend/
8. nginx

```
server {
    listen 80;
    listen [::]:80;

    server_name liikuntoilu.net;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
