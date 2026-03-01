
  # nikolaigrigorev.com
  It is a personal web page.

  
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npm run build && npm run start` to serve the production build through the Express server with security middleware.

  ## Security

  - Cloudflare Pages is the deployment target (`.github/workflows/deploy.yml`) with edge security headers via `public/_headers`.
  - Automated security workflows are configured for dependency audit and CodeQL analysis.
  - Dependabot is enabled for npm and GitHub Actions updates.

  ## Cloudflare Setup

  Configure these GitHub repository settings before running the deploy workflow:
  - Secret: `CLOUDFLARE_API_TOKEN` (token with Cloudflare Pages deploy permissions)
  - Secret: `CLOUDFLARE_ACCOUNT_ID`
  - Variable: `CLOUDFLARE_PROJECT_NAME` (your Cloudflare Pages project name)
  
