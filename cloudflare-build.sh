#!/bin/bash
set -e

echo "Setting npm registry to official source..."
npm config set registry https://registry.npmjs.org/

echo "Running build..."
npm run build
