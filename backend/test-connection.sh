#!/bin/bash

echo "Testing Frontend-Backend Connection"
echo "======================================"
echo ""

# Check if backend is running
echo "1. Testing Backend Health Endpoint..."
if curl -s http://localhost:3001/health > /dev/null; then
    echo "Backend is running on http://localhost:3001"
    curl -s http://localhost:3001/health | jq '.' || curl -s http://localhost:3001/health
    echo ""
else
    echo "Backend is NOT running!"
    echo "Start it with: cd backend && npm run dev"
    echo ""
    exit 1
fi

# Test GET campaigns
echo "2. Testing GET /campaigns..."
if curl -s http://localhost:3001/campaigns > /dev/null; then
    echo "GET /campaigns endpoint is working"
    CAMPAIGN_COUNT=$(curl -s http://localhost:3001/campaigns | jq '. | length' 2>/dev/null || echo "N/A")
    echo "Found $CAMPAIGN_COUNT campaigns"
    echo ""
else
    echo "GET /campaigns endpoint failed"
    echo ""
fi

# Test POST campaign
echo "3. Testing POST /campaigns..."
TEST_RESPONSE=$(curl -s -X POST http://localhost:3001/campaigns \
  -H "Content-Type: application/json" \
  -d '{"name":"Connection Test","type":"Email","description":"Testing frontend-backend connection"}')

if echo "$TEST_RESPONSE" | grep -q "id"; then
    echo "POST /campaigns endpoint is working"
    echo "Created campaign:"
    echo "$TEST_RESPONSE" | jq '.' 2>/dev/null || echo "$TEST_RESPONSE"
    echo ""
else
    echo "POST /campaigns endpoint failed"
    echo "Response: $TEST_RESPONSE"
    echo ""
fi

echo "======================================"
echo "Connection test complete!"
echo ""
echo "Next steps:"
echo "1. Make sure frontend is running: npm run dev"
echo "2. Open http://localhost:3000"
echo "3. Check browser console for connection status"


