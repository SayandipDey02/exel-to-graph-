# GraphApp - User Authentication with Express & MongoDB

This is a simple Node.js web application that implements user authentication (sign in & login) using **Express**, **MongoDB**, **bcrypt**, **JWT**, and **EJS** templates.

## Features

- User Sign-Up with password hashing
- User Login with JWT token and cookie
- Simple EJS-based frontend
- MongoDB integration via Mongoose
- Basic error handling

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (for frontend rendering)
- bcrypt (for password encryption)
- jsonwebtoken (for secure login tokens)
- cookie-parser (for handling cookies)

---

## Installation

1. **Clone the repo:**

```bash
git clone https://github.com/SayandipDey02/exel-to-graph-.git

cd graph-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start MongoDB**

Make sure MongoDB is running locally. You can start it using:

```bash
mongod
```

4. **Run the application:**

```bash
node app.js
```

The server will start on `http://localhost:5000`

---

## Available Routes

### `GET /`
Basic welcome route.

### `GET /signin`
Displays the sign-up form.

### `POST /signin`
- Checks if a user exists
- If not, hashes password and creates user
- Sets a JWT token in a cookie

### `GET /login`
Displays the login form.

### `POST /login`
- Validates user credentials
- Sets a JWT token in a cookie
- Redirects to `/read` if successful

### `GET /read`
Displays a simple page after login (can be used for dashboard or profile view).

---

## Folder Structure

```
graphapp/
│
├── views/
│   ├── signin.ejs
│   ├── login.ejs
│   └── read.ejs
│
├── app.js
├── package.json
└── README.md
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

Built with love by [Sayandip Dey](https://github.com/SayandipDey02.git)
```

---

Let me know your GitHub username and project name if you'd like me to personalize it further or add screenshots, environment variables, etc.