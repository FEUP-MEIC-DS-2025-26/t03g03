# POC: Google OAuth2 Login

A minimal proof-of-concept service that implements Google OAuth2 login. The project uses Docker and docker-compose for easy testing and deployment.

For now use google as the OAuth2 provider, but will need to be adapted to Jumpseller (https://jumpseller.pt/support/api/#section/Authentication/OAuth2).

If OAuth2 is not required, simple API token authentication should be sufficient.


## Requirements

Docker and docker-compose.


## Overview

This service reads OAuth2 client credentials from `client_secret.json` (mounted into the container) or from environment variables. It exposes a `/login` endpoint to start the OAuth flow and a `/callback` endpoint to receive the authorization response.


## How to create `client_secret.json` (Google OAuth2)

Follow these steps to create an OAuth2 client, download the credentials JSON and rename it to `client_secret.json`.

1. Access Google Cloud Console
   - URL: https://console.cloud.google.com
   - Select or create a Project.

2. Configure the OAuth consent screen
   - Navigate to **APIs & Services** > **OAuth consent screen**.
   - Choose **External** (for testing) or **Internal** as needed.
   - Fill in the required fields (app name, support email, scopes if requested) and save.

3. Create OAuth 2.0 credentials
   - Go to **APIs & Services** > **Credentials** > **Create Credentials** > **OAuth client ID**.
   - Application type: `Web application`.
   - In **Authorized redirect URIs** add the callback URI used by the app, for example:
     - `http://localhost:5000/callback`
     - (or build it from `REDIRECT_HOST`, `REDIRECT_PORT` and `REDIRECT_PATH` environment variables)
   - In **Authorized JavaScript origins** add, if needed:
     - `http://localhost:5000`
   - Create the credential.

4. Download the JSON credentials
   - After creation, click **Download** to get the JSON file (usually named like `credentials-xxxxx.json`).

5. Rename and place the file
   - Rename the downloaded file to `client_secret.json`.
   - Place it in the project root next to `docker-compose.yml` so it is available as `./client_secret.json`.
   - The provided `docker-compose.yml` mounts `./client_secret.json` into the container at `/app/client_secret.json`.

6. Environment variable alternative
   - The app also accepts environment variables for the same values. To point to a custom JSON path, set `CLIENT_SECRET_PATH`.
   - SSL and other runtime options can be controlled via environment variables such as `USE_SSL`, `SSL_CERT_PATH`, `SSL_KEY_PATH`, `REDIRECT_HOST`, `REDIRECT_PORT` and `REDIRECT_PATH`.

7. Security and good practices
   - Do not commit `client_secret.json` to the repository. Dont exclude `client_secret.json` off ` .gitignore`.
   - Keep secrets out of source control and restrict file permissions.

8. Quick test
   - Run `docker-compose up`.
   - Open a browser and visit the `/login` endpoint to start the OAuth flow.
   - After consenting, Google will redirect back to the configured callback URI and the service should complete the login flow.

## Notes

- This is a POC: adapt secret handling and session storage before production use.
- The app expects `FLASK_SECRET_KEY` (or it will use a default). Set a secure secret for session support.
