
  # nikolaigrigorev.com
  It is a personal web page.

  
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npm run build && npm run start` to serve the production build through the Express server with security middleware.

  ## Security

  - GitHub Pages is the active deployment target (`.github/workflows/deploy.yml`), so browser policies and CI scans are the primary protections there.
  - Automated security workflows are configured for dependency audit and CodeQL analysis.
  - Dependabot is enabled for npm and GitHub Actions updates.
  
