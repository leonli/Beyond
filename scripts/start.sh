#!/bin/bash
chown -R ubuntu:ubuntu /opt/node_home
su - ubuntu -c "NODE_ENV=production pm2 start /opt/node_home/server.js --name=beyond"
