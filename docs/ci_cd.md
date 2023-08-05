# Working with CI/CD

This is a guide to working with CI/CD in this project. The CI/CD is based on [GitHub Actions](https://github.com/features/actions).

# Setup

1. Creating a .github/workflows folder in the root of your repository.
2. Created a .yaml file with the following content:

```yaml
name: Nest CI

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

jobs:
  build:
    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [16.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - name: Copy env # copy in your env file
        run: 'echo -e "${{secrets.ENV}}" > .env'
      # - run: npm run test
      - run: npm ci
      - run: npm run build
      - run: npm install -g pm2
      # - run: pm2 start "npm run start:prod" --name "nest"
      - run: pm2 restart nest
      # - name: Run deploy script
      #   run: ./.github/scripts/startup.dev.sh
      #   shell: bash
```

Now notice that it is self hosted , it is actually self hosted in the EC2 instance with named Proprietary Services . Github runner should be in coderunner/codebase.

We are using pm2 to run the application in the background.
