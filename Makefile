.PHONY: install dev build preview clean check help

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

check: ## Type-check the whole project (catches broken imports etc.)
	npx tsc --noEmit

build: ## Build for production
	npm run build

preview: ## Preview production build
	npm run preview

clean: ## Clean node_modules and dist
	rm -rf node_modules dist

