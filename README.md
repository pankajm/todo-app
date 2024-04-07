This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Clone the app using
   ```bash
   git clone https://github.com/pankajm/todo-app.git
   ```
3. Go to the todo-app directory
4. Install necessary dependencies using

```bash
npm i
```
  ### OR
```bash
yarn
```

4. Run the development server

```bash
npm run dev
```
  ### OR
```bash
yarn dev
```


Open ``` http://localhost:3000 ``` with your browser to see the result. (The port may differ depending on currently running processes)

## Project Details - Todo App

* The landing page is a login page where user has to enter username and password to login to app.
* User can create, edit, delete a todo OR mark it as complete
* If user is already logged in then landing on login page will be redirected to todo page (app)
* User has to logout in order to go to login page.

## Technologies Used

1. React v18
2. Next.js v14 (app router)
3. Typescript
4. Zustand state management
5. React-bootstrap (for components)
6. bootstrap.min.css for utility classes
7. React-hook-form
8. Vitest with react-testing-library for unit tests.

