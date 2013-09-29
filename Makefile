# Config
SUPRVISR = ./node_modules/.bin/supervisor -p 50 -e jade,styl,json,js -i node_modules,public -n exit app/server

# Watch for app changes during dev
.PHONY: dev
dev:
	@ NODE_ENV=development $(SUPRVISR)

# Test server in production mode
.PHONY: build
build:
	@ NODE_ENV=production node app/server
