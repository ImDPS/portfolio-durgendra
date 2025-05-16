#!/usr/bin/env node

/**
 * This script ensures that the contentlayer dependencies work properly with Next.js 14+
 * It will be run automatically when someone runs `npm install` in the repository.
 */

console.log("\x1b[36m%s\x1b[0m", "🔧 Preparing environment for contentlayer with Next.js 14+");

const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(process.cwd(), 'package.json');

try {
  // Read the package.json file
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check if the overrides are already in place
  if (!packageJson.overrides || !packageJson.overrides['next-contentlayer']) {
    console.log("📦 Adding Next.js compatibility overrides for contentlayer...");
    
    // Add the overrides
    packageJson.overrides = {
      ...packageJson.overrides,
      'next-contentlayer': {
        'next': '$next'
      }
    };
    
    // Write the updated package.json file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("\x1b[32m%s\x1b[0m", "✅ Successfully added compatibility overrides for Next.js!");
  } else {
    console.log("\x1b[32m%s\x1b[0m", "✅ Compatibility overrides already in place!");
  }
  
  console.log("\x1b[33m%s\x1b[0m", "ℹ️ You can now run npm install without compatibility issues.");
  
} catch (error) {
  console.error("\x1b[31m%s\x1b[0m", "❌ Error setting up contentlayer compatibility:", error.message);
  process.exit(1);
} 