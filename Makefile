# Config
SUPRVISR = ./node_modules/.bin/supervisor -p 50 -e jade,styl,json,js -i node_modules,public -n exit app

# Watch for app changes during dev
.PHONY: dev
dev:
	@export NODE_ENV=development && $(SUPRVISR)

# Test server in production mode
.PHONY: build
build:
	@export NODE_ENV=production && npm start
