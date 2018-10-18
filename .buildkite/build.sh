#!/bin/bash
set -e
echo "========== Setup =========="
npm install
echo "========== Lint ==========="
npm run lint
echo "========== Test ==========="
npm run test -- --coverage
