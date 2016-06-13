PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

test:
	NODE_ENV=test mocha -c --compilers js:babel-core/register | bunyan -o short -l warn
dev:
	NODE_ENV=development browser-refresh | bunyan -o short
start:
	NODE_ENV=production node server.js | bunyan -o short

.PHONY: test dev start
