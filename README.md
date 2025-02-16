# Online Appointment API

This is a Node.js-based API for managing online appointments. The application uses **Sequelize** as an ORM to interact with a **MySQL** database and **AdminJS** for the admin interface.

## 📌 Prerequisites

Before running the project, ensure that you have the following installed:

- **Node.js (latest version)** – [Download here](https://nodejs.org/)
- **MySQL Database** – Ensure MySQL is installed and running

## 📦 Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-repo/online-appointment-api.git
   cd online-appointment-api
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure Database Connection**

   - Create a `.env` file in the root directory and add the following:
     ```env
     DB_NAME=your_database_name
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_HOST=localhost
     DB_DIALECT=mysql
     PORT=5000
     ```

## 🚀 Running the Project

### 1. Start the MySQL Server

Ensure your MySQL database server is running.

### 2. Run Database Migrations (If Needed)

To create database tables based on Sequelize models, run:

```sh
npm run migrate
```

### 3. Start the Server

```sh
npm start
```

The server should now be running at `http://localhost:5000`.

### 4. Open AdminJS Panel (Optional)

If AdminJS is integrated, visit:

```
http://localhost:5000/admin
```

to manage user records.

## 🛠 Testing User Creation

To test user creation, run the following script:

```sh
node test-insert.js
```

If successful, you should see:

```sh
✅ User created successfully: { ...user data... }
```

## 📜 API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/users`     | Create a new user |
| GET    | `/users`     | Get all users     |
| GET    | `/users/:id` | Get a user by ID  |
| PUT    | `/users/:id` | Update a user     |
| DELETE | `/users/:id` | Delete a user     |

## 🔧 Troubleshooting

- **Issue:** `SequelizeConnectionError: Access denied for user`
  - **Fix:** Ensure MySQL is running and credentials in `.env` are correct.
- **Issue:** `Table does not exist`
  - **Fix:** Run `npm run migrate` to create tables.
- **Issue:** `Cannot insert data`
  - **Fix:** Check logs by enabling Sequelize logging in `config/database.js`.

## 🤝 Contributing

Feel free to submit issues or pull requests to improve the project.

## 📜 License

This project is open-source and available under the MIT License.

