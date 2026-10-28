# Whatabytes Backend API

A RESTful backend API for managing user authentication, patients, and doctors. The API uses JSON requests and responses, with JWT-based authentication.

## Features

- User Registration and Login
- JWT Token Generation
- User Logout
- Create, Read, Update, and Delete Patient Records
- Create Doctor Records
- RESTful API Architecture
- JSON-Based API Responses
- MongoDB Document ID Support

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Postman for API Testing

## Base URL

Configure the `base_url` variable in Postman.

For local development, the URL may look like:

```text
http://localhost:5000
```

Replace the port with the one configured in your backend.

---

## API Endpoints

### 1. Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in an existing user |
| GET | `/api/auth/logout` | Log out the current user |

### Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**

<img width="1915" height="996" alt="Screenshot 2026-10-28 115124" src="https://github.com/user-attachments/assets/bc5a1e39-3de3-4933-aa32-b03fbce7f3e2" />


**Success Response:** `201 Created`

Returns a success message, user details, and a JWT token.

### Login User

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "YourStrongPassword"
}
```

**Success Response:** `200 OK`

Returns a success message, user details, and a JWT token.

### Logout User

**Endpoint:** `GET /api/auth/logout`

This endpoint logs out the current user according to the authentication mechanism implemented in the backend.

---

## 2. Patient Management APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/patients` | Fetch all patients |
| POST | `/api/patients` | Create a new patient |
| GET | `/api/patients/:id` | Fetch a patient by ID |
| PUT | `/api/patients/:id` | Update patient details |
| DELETE | `/api/patients/:id` | Delete a patient |

### Create Patient

**Endpoint:** `POST /api/patients`

**Request Body:**

```json
{
  "name": "Devanand",
  "age": 23,
  "gender": "Male",
  "address": "Ghaziabad, UP"
}
```

**Success Response:** `201 Created`

Returns a success message and the newly created patient record.

### Get All Patients

**Endpoint:** `GET /api/patients`

Returns the patient count and a list of patient records.

**Example Response:**

```json
{
  "message": "Patients fetched successfully",
  "count": 1,
  "patients": []
}
```

The example above illustrates the response structure; the actual array depends on the database contents.

### Get Patient by ID

**Endpoint:** `GET /api/patients/:id`

Replace `:id` with the patient's actual MongoDB document ID.

**Example:**

```text
GET /api/patients/YOUR_PATIENT_ID
```

Returns the matching patient record.

### Update Patient

**Endpoint:** `PUT /api/patients/:id`

**Request Body:**

```json
{
  "name": "Deepu Singh",
  "age": 24,
  "gender": "Male",
  "address": "Noida, UP"
}
```

**Success Response:** `200 OK`

Returns a success message and the updated patient details.

### Delete Patient

**Endpoint:** `DELETE /api/patients/:id`

Replace `:id` with the patient's actual ID.

**Success Response:** `200 OK`

Returns a confirmation message when the patient is successfully deleted.

---

## 3. Doctor Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/doctors` | Create a new doctor |

### Create Doctor

**Endpoint:** `POST /api/doctors`

**Request Body:**

```json
{
  "name": "Dr. Example",
  "specialization": "Dental",
  "email": "doctor@example.com",
  "phone": "9000000000",
  "experience": 10
}
```

**Success Response:** `201 Created`

Returns a success message and the newly created doctor record.

Use fictional details for testing and avoid publishing real personal information.

---

## JWT Authentication in Postman

The registration and login endpoints return a JWT token.

To use the token with another API request:

1. Send a registration or login request.
2. Copy the `token` value from the response.
3. Open the API request that requires authentication.
4. Select the **Authorization** tab.
5. Choose **Bearer Token** as the authentication type.
6. Paste the token into the Token field.
7. Click **Send**.

Postman will send the following header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Use this method for protected endpoints if your backend implements Bearer token authentication. If the backend uses cookies, follow its cookie-based authentication implementation instead.

## HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 OK | Request completed successfully |
| 201 Created | Resource created successfully |
| 400 Bad Request | Invalid or missing request data |
| 401 Unauthorized | Authentication is missing or invalid |
| 403 Forbidden | Access is denied |
| 404 Not Found | Requested resource was not found |
| 500 Internal Server Error | Unexpected server-side error |

The actual status codes depend on the backend implementation.

---

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Postman

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the backend project directory:

```bash
cd your-project-folder
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the backend root directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

These variable names are examples. Use the exact names expected by your source code.

**Important:** Never upload your `.env` file or expose database credentials, JWT secrets, or real passwords on GitHub.

### Step 4: Start the Server

If your project has a development script, run:

```bash
npm run dev
```

Otherwise, use the appropriate start command defined in your `package.json`.

### Step 5: Test the APIs

Open Postman and configure the `base_url` variable with your local backend URL.

Example:

```text
http://localhost:5000
```

Then test the endpoints using the HTTP methods and request bodies documented above.

---

## Testing with Postman

The provided Postman screenshots demonstrate successful responses for the following operations:

- User registration
- User login
- User logout
- Fetching all patients
- Creating a patient
- Fetching a patient by ID
- Updating a patient
- Deleting a patient
- Creating a doctor

The screenshots show successful HTTP responses, including `200 OK` and `201 Created`.

## Security Best Practices

- Keep credentials and secrets in environment variables.
- Never commit `.env` files to GitHub.
- Use strong passwords and a secure JWT secret.
- Avoid sharing active JWT tokens publicly.
- Use fictional data when demonstrating APIs in public repositories.
- Verify authentication and authorization requirements for protected endpoints.

## Conclusion

The Whatabytes Backend API provides endpoints for user authentication and patient and doctor management. Its RESTful structure makes it possible to test the application's operations through Postman and integrate them with a frontend application.

## Author

**Devanand Singh**
