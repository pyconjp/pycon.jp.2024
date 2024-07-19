# Makefile for installing git-secrets and adding Google API key pattern

# Variables
PATTERN='AIza[0-9A-Za-z_\-]{35}'

# Default target
all: install-git-secrets add-pattern

# Target to install git-secrets using Homebrew
install-git-secrets:
	@if ! command -v git-secrets &> /dev/null; then \
		echo "git-secrets not found, installing via Homebrew..."; \
		brew install git-secrets; \
	else \
		echo "git-secrets is already installed."; \
	fi
	git secrets --install -f

# Target to add Google API key pattern
add-pattern:
	@if [ -d .git ]; then \
		echo "Adding Google API key pattern to git-secrets..."; \
		git secrets --add $(PATTERN); \
	else \
		echo "This directory is not a git repository."; \
	fi

.PHONY: all install-git-secrets add-pattern
