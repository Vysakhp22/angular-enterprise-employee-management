# Angular Enterprise Employee Management

An Angular 21 standalone employee management application with authentication, route protection, and a dashboard for managing employee records.

## Features

- User signup and login flows
- Route guard for protected dashboard access
- Employee dashboard with summary stats
- Search and filter employees by name, email, department, and status
- Add, edit, and delete employee records
- Local storage–backed mock data and auth state
- Token attachment and refresh flow scaffold via HTTP interceptor
- Tailwind CSS and DaisyUI-based styling setup

## Tech Stack

- Angular 21
- TypeScript
- SCSS
- HTML
- Tailwind CSS 4
- DaisyUI
- Vitest

## Project Structure

```text
src/
  app/
    core/
      guards/
      interceptors/
      models/
      services/
    features/
      auth/
        login/
        signup/
      dashboard/
        components/
```

## Application Flow

- `/` loads the login screen
- `/signup` loads the signup screen
- `/dashboard` loads the protected employee dashboard
- Unmatched routes redirect to `/`

Authentication state is stored in local storage, and dashboard access is protected by `authGuard`.

## Employee Management

The dashboard supports:

- Viewing seeded employee records
- Tracking totals, active employees, departments, and admin counts
- Filtering employees using search, department, and status filters
- Creating new employees
- Updating existing employees
- Removing employees

The app currently uses mocked employee data and browser storage instead of a backend API.

## Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI

### Installation

```bash
npm install
```

### Run the development server

```bash
npm start
```

Then open `http://localhost:4200/` in your browser.

## Available Scripts

- `npm start` – start the development server
- `npm run build` – create a production build
- `npm run watch` – build in watch mode
- `npm test` – run unit tests with Vitest

## Notes

- Authentication and employee persistence are currently mock implementations stored in the browser.
- The interceptor includes a sample token refresh flow intended as a foundation for real backend integration.
- This project was generated with Angular CLI and customized into an employee management application.

## Future Improvements

- Connect authentication to a real backend API
- Persist employee data in a database
- Add role-based authorization
- Add form validation and richer error handling
- Add end-to-end tests

## License

This project is available for learning and internal development purposes.
