#!/usr/bin/env bash

mkdir -p ./reports

echo "Running Tests for the application"
./node_modules/.bin/cross-env NODE_ENV=test ./node_modules/.bin/react-app-rewired test --env=jsdom --coverage\
  | tee >(./node_modules/.bin/tap-xunit --package='core' --replaceWithUnicodeDot=true > ./reports/tests.xunit.xml)
