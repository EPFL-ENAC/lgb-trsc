# Variables
VENV_DIR = .venv
PYTHON = $(VENV_DIR)/bin/python
PIP = $(VENV_DIR)/bin/pip
UV = /bin/uv

# Targets
.PHONY: all setup install run clean lint

all: setup install run

setup:
	python3 -m venv $(VENV_DIR)

install: setup
	$(PIP) install -r requirements.txt

run:
	$(PYTHON) -m uvicorn app.main:app --host 0.0.0.0 --port 8060

clean:
	rm -rf $(VENV_DIR)

lint:
	$(PYTHON) -m lefthook run pre-commit
