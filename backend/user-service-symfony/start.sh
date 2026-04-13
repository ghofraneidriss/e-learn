#!/bin/bash

echo "🚀 Starting User Service (Symfony)"
echo "=================================="

# Check if composer dependencies are installed
if [ ! -d "vendor" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Copying from .env.local.example..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your configuration!"
    exit 1
fi

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if ! mongosh --eval "db.adminCommand('ping')" mongodb://localhost:27017 > /dev/null 2>&1; then
    echo "❌ MongoDB is not running!"
    echo "   Start it with: docker-compose up -d mongodb"
    exit 1
fi
echo "✅ MongoDB is running"

# Check if Keycloak is accessible
echo "🔍 Checking Keycloak connection..."
if ! curl -s http://localhost:8081 > /dev/null 2>&1; then
    echo "❌ Keycloak is not accessible!"
    echo "   Start it with: docker-compose up -d keycloak"
    exit 1
fi
echo "✅ Keycloak is accessible"

# Create MongoDB indexes
echo "📊 Creating MongoDB indexes..."
php bin/console doctrine:mongodb:schema:create --index 2>/dev/null || true

# Start Symfony server
echo ""
echo "✅ All checks passed!"
echo "🚀 Starting Symfony server on port 8000..."
echo ""
echo "📝 Service will be available at:"
echo "   - Direct: http://localhost:8000"
echo "   - Via Gateway: http://localhost:8085/api/users"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Main documentation"
echo "   - KEYCLOAK_SETUP.md - Keycloak configuration"
echo "   - INTEGRATION.md - Spring Cloud integration"
echo "   - ANGULAR_INTEGRATION.md - Angular integration"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=================================="
echo ""

# Start server
if command -v symfony &> /dev/null; then
    symfony server:start --port=8000
else
    php -S localhost:8000 -t public/
fi
