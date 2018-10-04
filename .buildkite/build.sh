#!/bin/bash
set -e
echo "========== Setup =========="
npm install
echo "========== Test =========="
npm run test -- --coverage
