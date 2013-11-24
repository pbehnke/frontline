TESTS = $(shell find test -name "*.js")

test:
	@./node_modules/.bin/mocha $(TESTS) --reporter spec

.PHONY: test