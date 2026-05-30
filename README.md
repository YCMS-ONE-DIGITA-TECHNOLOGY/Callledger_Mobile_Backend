# CallLedger Mobile Backend

Backend APIs for the CallLedger Employee Mobile Application built using Node.js, Express.js, MySQL, and JWT Authentication.

## Features

* Employee Login Authentication
* JWT-Based Authorization
* Employee Profile API
* SIM ICCID Assignment
* One Employee → One ICCID Mapping
* One ICCID → One Employee Mapping
* MySQL Database Integration

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* JSON Web Token (JWT)
* dotenv
* CORS

---

## Project Structure

```text
employee-mobile-backend
│
├── config
├── controllers
├── middleware
├── routes
├── .env
├── server.js
└── package.json
```

---

## API Endpoints

### Employee Login

**POST**

```text
/api/employee/login
```

Parameters:

* company_code
* username
* password

---

### Assign SIM ICCID

**POST**

```text
/api/employee/store-sim
```

Parameters:

* sim_iccid
* status

---

### Employee Profile

**GET**

```text
/api/employee/profile
```

---

## Authentication

Protected APIs require a valid JWT token.

```text
Authorization: Bearer JWT_TOKEN
```

---

## Business Rules

* One employee can be assigned only one ICCID.
* One ICCID can be assigned to only one employee.
* Employee authentication requires Company Code, Username, and Password.
* Employee information is fetched using JWT authentication.

---

## Author

**Siddhi Patil**
