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
<img width="1896" height="993" alt="Screenshot 2026-10-28 115325" src="https://github.com/user-attachments/assets/433848d0-9bc2-49de-ab9a-56b32ad64ebc" />


**Success Response:** `200 OK`

Returns a success message, user details, and a JWT token.

### Logout User

**Endpoint:** `GET /api/auth/logout`

This endpoint logs out the current user according to the authentication mechanism implemented in the backend.

<img width="1902" height="985" alt="Screenshot 2026-10-28 115452" src="https://github.com/user-attachments/assets/34f717f0-f260-49f7-8fb3-6de78e039179" />


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

<img width="1898" height="992" alt="Screenshot 2026-10-28 120759" src="https://github.com/user-attachments/assets/dc11e656-f73c-4755-b4df-5907ce8e1ff4" />


**Success Response:** `201 Created`

Returns a success message and the newly created patient record.

### Get All Patients

**Endpoint:** `GET /api/patients`

Returns the patient count and a list of patient records.

**Example Response:**

<img width="1911" height="992" alt="Screenshot 2026-10-28 121123" src="https://github.com/user-attachments/assets/6213884b-cfba-449a-8c60-26301a7f16c2" />


The example above illustrates the response structure; the actual array depends on the database contents.

### Get Patient by ID

**Endpoint:** `GET /api/patients/:id`

Replace `:id` with the patient's actual MongoDB document ID.

**Example:**
<img width="1902" height="991" alt="Screenshot 2026-10-28 121515" src="https://github.com/user-attachments/assets/5e0a78c0-4c6d-4e24-b0ff-954dfdd77ab3" />


Returns the matching patient record.

### Update Patient

**Endpoint:** `PUT /api/patients/:id`

**Request Body:**

<img width="1917" height="992" alt="Screenshot 2026-10-28 121952" src="https://github.com/user-attachments/assets/c869e0d7-1618-4900-ba82-190c80612196" />


**Success Response:** `200 OK`

Returns a success message and the updated patient details.

### Delete Patient

**Endpoint:** `DELETE /api/patients/:id`

Replace `:id` with the patient's actual ID.

**Success Response:** `200 OK`

Returns a confirmation message when the patient is successfully deleted.

<img width="1888" height="982" alt="Screenshot 2026-10-28 122051" src="https://github.com/user-attachments/assets/abe73e78-8364-49da-ac7c-3c68a700ca66" />


## 3. Doctor Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/doctors` | Create a new doctor |
| GET | `/api/doctors` | Fetch all doctors |
| GET | `/api/doctors/:id` | Fetch a doctor by ID |
| PUT | `/api/doctors/:id` | Update doctor details |
| DELETE | `/api/doctors/:id` | Delete a doctor |

**Note:** Confirm that these routes are implemented in your backend before documenting them as available endpoints.

### Create Doctor

**Endpoint:** `POST /api/doctors`

**Request Body:**

<img width="1907" height="1007" alt="Screenshot 2026-10-28 122821" src="https://github.com/user-attachments/assets/d0156f74-009d-4bba-8572-8e9c10df1e05" />



**Success Response:** `201 Created`

Returns a success message and the newly created doctor record.

### Get All Doctors

**Endpoint:** `GET /api/doctors`

Fetches the list of doctors stored in the database.
<img width="1907" height="990" alt="Screenshot 2026-10-28 122901" src="https://github.com/user-attachments/assets/b12864a6-ab51-43be-bb49-3d961283da62" />


### Get Doctor by ID

**Endpoint:** `GET /api/doctors/:id`

Replace `:id` with the doctor's MongoDB document ID.

<img width="1888" height="987" alt="Screenshot 2026-10-28 123235" src="https://github.com/user-attachments/assets/3f0b061d-965a-4985-a6ab-d2547f20fd71" />


Returns the matching doctor record.

### Update Doctor

**Endpoint:** `PUT /api/doctors/:id`

**Request Body:**

<img width="1915" height="992" alt="Screenshot 2026-10-28 123630" src="https://github.com/user-attachments/assets/907b2b1d-010f-4016-a738-6176ee1b4fd0" />


Updates the specified doctor's details.

### Delete Doctor

**Endpoint:** `DELETE /api/doctors/:id`

Replace `:id` with the doctor's MongoDB document ID.

Deletes the specified doctor if the endpoint is implemented by the backend.

<img width="1903" height="991" alt="Screenshot 2026-10-28 123720" src="https://github.com/user-attachments/assets/0fa0f172-d561-460b-8b61-a633e0bcefe5" />



## 4. Patient-Doctor Mapping APIs

These APIs manage the assignment of doctors to patients. All mapping routes use authentication middleware.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/mappings` | Assign a doctor to a patient |
| GET | `/api/mappings` | Retrieve all patient-doctor mappings |
| GET | `/api/mappings/:patient_id` | Retrieve mappings for a specific patient |
| DELETE | `/api/mappings/:id` | Delete a patient-doctor mapping |

### 4.1 Assign Doctor to Patient

**Method:** `POST`

**Endpoint:** `/api/mappings`

**Authorization:** Bearer Token

**Request Body:**
<img width="1897" height="1023" alt="Screenshot 2026-10-28 124528" src="https://github.com/user-attachments/assets/50222364-d456-41a4-93b6-aa3a8d32651d" />




### 4.2 Get All Patient-Doctor Mappings

**Method:** `GET`

**Endpoint:** `/api/mappings`

**Authorization:** Bearer Token

Returns the patient-doctor mappings stored in the database.

**Postman Screenshot:**

<img width="1913" height="1007" alt="Screenshot 2026-10-28 124616" src="https://github.com/user-attachments/assets/9122150f-247b-46c2-85e7-694491bfc80e" />


### 4.3 Get Patient-Doctor Mappings by Patient ID

**Method:** `GET`

**Endpoint:** `/api/mappings/:patient_id`

**Authorization:** Bearer Token

**Example Request:**

```http
GET /api/mappings/YOUR_PATIENT_ID
```

Replace `YOUR_PATIENT_ID` with the ID of the patient whose doctor mappings you want to retrieve.

**Postman Screenshot:**

<img width="1907" height="968" alt="Screenshot 2026-10-28 125213" src="https://github.com/user-attachments/assets/b20206cb-cf30-4916-a96e-675334dd6d3f" />


### 4.4 Delete Patient-Doctor Mapping

**Method:** `DELETE`

**Endpoint:** `/api/mappings/:id`

**Authorization:** Bearer Token

**Example Request:**

```http
DELETE /api/mappings/YOUR_MAPPING_ID
```

Replace `YOUR_MAPPING_ID` with the ID of the mapping you want to delete.

**Postman Screenshot:**

<img width="1905" height="1005" alt="Screenshot 2026-10-28 125953" src="https://github.com/user-attachments/assets/a3d7c28c-20d6-4a9f-b017-99d332e35f1b" />



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
