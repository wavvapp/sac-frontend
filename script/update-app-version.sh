#!/bin/bash

# Check if version parameter is provided
if [ -z "$APP_VERSION" ]; then
    echo "Error: No version specified. Usage: APP_VERSION=x.y.z $0"
    exit 1
fi

# Validate version format (x.y.z)
if ! [[ $APP_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be in format x.y.z (e.g., 2.3.0)"
    exit 1
fi

# Update version and buildNumber in app.config.js
sed -i -E "s/(version: \")[^\"]+(\",)/\1$APP_VERSION\2/" app.config.js
sed -i -E "s/(buildNumber: \")[^\"]+(\",)/\1$APP_VERSION\2/" app.config.js

echo "Updated app version to $APP_VERSION successfully!"
echo "- Updated main version"
echo "- Updated iOS buildNumber"

exit 0