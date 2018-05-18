
.PHONY: help build test docs


help:
	@echo "Makefile for simple-validator"
	@echo "	make build - make a new build"
	@echo "	make test - run the test cases against the build"
	@echo "	make docs - regenerate the docs"

build-dir:
	mkdir -p ./dist

plain-build: build-dir
	NODE_MODULES=. webpack --config=./config/webpack.js

min-build: build-dir
	NODE_MODULES=. webpack --config=./config/webpack-min.js

build: plain-build min-build

test: plain-build
	(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 --compilers js:babel-core/register $(ARGS))

docs:
	(export NODE_PATH=./; find ./src -name '*.js' |sort -t'/' -k2.2 -k2.1 | xargs jsdoc2md --separators --template README.hbs --files ) > README.md
