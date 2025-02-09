# Blog App

## Overview

This application allows users to explore published posts with a paginated interface and an optimized search functionality powered by debounced requests to reduce unnecessary GraphQL calls. Unauthorized users are limited to viewing public content, while features like creating blogs or accessing drafts are available only after logging in.

The platform is fully responsive, providing a seamless experience across mobile, tablet, and desktop devices.


---

## Features

### General Functionality
- **View Posts**: Users can view all published posts in a paginated format.
- **Search**: Search posts by title with debounced input to minimize unnecessary GraphQL requests.

### Authorization
- Unauthorized users:
  - Cannot create blogs or access drafts.
  - Will be redirected to the login page if attempting restricted actions.
- Login:
  - Users can log in or sign up through the same path.
- Signup Validation:
  - Name must be longer than 3 characters.
  - Password must be at least 8 characters (note: whitespace is not validated).
  - Email must be valid.
  - The email must not already exist in the database.

### Blog Management
- **Create Blog**: Logged-in users can create blogs.
- **Save Draft**: Users can save blogs as drafts and publish them later.
- **Access Control**: Unpublished blogs are accessible only to their authors. If another user tries to manipulate the URL to view unpublished content, they are redirected to their last visited page.

### Responsiveness
- Fully responsive design with support for mobile and tablet views.

---

## Technologies Used

### Core Libraries
- **GraphQL**: For fetching data.
- **Next.js**: Framework for building the application.
- **TypeScript**: Ensures type safety and scalability.

### Additional Libraries
- **next-auth**: For handling user authorization.
- **react-responsive**: To programmatically manage responsiveness.
- **react-toastify**: For showing toast notifications.

---

## What's Done Well

1. Folder structure is well-organized and maintainable.
2. TypeScript was used to ensure type safety.
3. All linting issues were resolved.
4. Reusable responsive components were created, including:
   - Buttons
   - Form inputs
5. Reusable custom hooks were implemented for:
   - **Debounce** functionality.
   - Media query handling.
6. Successfully deployed the app on **Vercel**.

---

## Areas for Improvement

1. **Error Handling**: Although most errors are managed, not all scenarios have been thoroughly tested.
2. **Naming Conventions**: Resolvers and paths may not strictly follow the shared guidelines.
3. **Authentication Method**: REST was used for authentication instead of GraphQL.
4. **Testing**: Did not thoroughly test the app across all scenarios.
5. **UI Design**: The user interface is basic and can be improved.

---

## Local Setup

**Live Application** is Available here [BlogHub](https://blog-app-one-theta.vercel.app/)

If you want to run the application locally, follow these steps:

### Setup

1. Clone the repository and navigate to the project directory.

2. Create a `.env` file and add the following environment variables:
   ```env
   DATABASE_URL=<your_postgres_db_url>
   NEXTAUTH_SECRET=<random_nextauth_secret_base64_string>
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"

### Recommended Node version

Node 22.x

## Installation and Run

```bash
# Install dependencies
npm install
# Apply existing migrations to your database
npx prisma migrate deploy
# Start the development server
npm run dev
```

Now You will have an empty blog website where you can register and add blogs.


