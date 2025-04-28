# Engineering Assessment Backend (NestJS)

## Project Overview

This project is a backend service built with NestJS that processes uploaded receipt images using Google Cloud Document AI and extracts structured receipt data.

Swagger documentation is also available for easier API exploration and testing.

---

## Project Initialization

1. Clone this repository locally

2. Create a new working branch (e.g. `git checkout -b working-branch`)

3. Set your node environment

   - Run `nvm install && nvm use`, or
   - Alternatively manually set your node to v18+ and npm to v10+

4. Run `npm install` to install dependencies

   _Note: Ensure you have properly set your node version before this step._

5. Set up your environment variables:

### .env File Setup

   - Rename `.env.sample` to `.env` at the root of the project.
   - Make sure to replace the sample values with actual values of the Document AI project and the connected service account.

6. Start the backend server:

```bash
npm run start:dev
```

The backend server should now be running at:

```bash
http://localhost:3000
```

You can verify it is running by visiting:

```bash
GET http://localhost:3000/
```

Which should return:

```text
Hello World!
```

---

## Swagger API Documentation

An interactive API documentation is available at:

```bash
http://localhost:3000/api-docs
```

Using Swagger UI, you can:

- Authorize using `x-api-key` header
- Upload receipt files directly
- See request/response formats
- Test the API without external tools

---

## Project Work

1. Complete all of your work in the working branch you created above.

2. Push commits to your remote working branch as often as you need.

3. Ensure you run tests locally before finalizing:

```bash
npm run test
```

---

## Project Submission

When you are ready to submit your work:

1. Create a Pull Request (PR) into the `main` branch.

2. Merge the above PR.

**⚠️ IMPORTANT: The above action is a one-time submission event. Do not open a PR until you are fully ready to submit your project.**

---

# Project Documentation

## Available Documents

- [API Documentation](./docs/api.md)
- [System Architecture](./docs/architecture.md)

## Notes

- Rate limiting is enabled to prevent abuse.
- Uploaded files are validated for MIME type and size limits.
- API endpoints are protected by an `x-api-key` header validation.

---

## Technologies Used

- NestJS (v10+)
- TypeScript
- @google-cloud/documentai
- Jest (Unit Testing)
- Swagger (API Documentation)