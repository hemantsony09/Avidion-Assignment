#!/bin/bash

echo "Setting up Campaign Manager Backend with PostgreSQL"
echo "======================================================"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed!"
    echo "Install it first:"
    echo "macOS: brew install postgresql@14"
    echo "Linux: sudo apt-get install postgresql"
    exit 1
fi

echo "PostgreSQL is installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo ".env file created"
    echo "Please edit .env with your database credentials"
else
    echo ".env file exists"
fi

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Setting up database..."
echo "Please ensure PostgreSQL is running and create the database:"
echo "psql -U postgres"
echo "CREATE DATABASE campaign_manager;"
echo "\\q"
echo ""
read -p "Press Enter after creating the database..."

echo ""
echo "Running database migration..."
npm run migrate

if [ $? -eq 0 ]; then
    echo ""
    read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run seed
    fi
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the backend: npm run dev"
echo "2. Start the frontend: cd .. && npm run dev"
echo ""



