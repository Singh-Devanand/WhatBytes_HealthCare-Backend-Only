Healthcare Management API :

A RESTful Healthcare Management API built using Node.js, Express.js, MongoDB, and Mongoose. It provides secure user authentication and CRUD operations for patients, doctors, and patient-doctor assignments.


Installation and Setup :
1. Clone the repository-
git clone YOUR_GITHUB_REPOSITORY_URL
cd healthcare-api

2. Install dependencies-
npm install
npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser cors


4. Start the server-
npm start

API Endpoints:

1. Authentication-
a. register (/api/auth/register)
b. login (/api/auth/login)
c. logout (/api/auth/logout)

2. Patient Management-
a. creating a patient (/api/patients)
b. Get your patients (/api/patients)
c. Get a patient by ID (/api/patients/:id)
d. Update a patient (/api/patients/:id)
e. Delete a patient (/api/patients/:id)

3. Doctor Management-
a. Create a doctor (/api/doctors)
b. Get your doctors (/api/doctors)
c. Get a doctor by ID (/api/doctors/:id)
d. Update a doctor (/api/doctors/:id)
e. Delete a doctor (/api/doctors/:id)

4. Patient-Doctor Mappings-
a. Assign a doctor to a patient (/api/mappings)
b. Get your mappings (/api/mappings)
c. Get a patient's doctor assignments (/api/mappings/:patient_id)
d. Remove a mapping (/api/mappings/:id)

THANK YOU !
