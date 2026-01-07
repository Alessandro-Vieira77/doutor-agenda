# 🎯 Doctor Agenda

> This project is a SaaS solution for medical clinics, designed to automate appointment scheduling and patient management. The application centralizes patient and scheduling information, handles scheduling conflicts more efficiently, and streamlines processes.

## 👀 About Project
This project was developed with the goal of demonstrating technical skills in both front-end and back-end development, following standards used in modern applications.

#### The main focus is on:
- Componentization
- Code organization
- Performance
- Scalability
- Best practices with React and Next.js
- Using AI for productivity

---
## 🚀 Demo
- 🌐 Deploy: [live](https://doutor-agenda-one-gamma.vercel.app/)
- 📸 Preview:
<img src="https://i.imgur.com/btni80m.gif" />

---

## ✨ Features
- Account creation and login

  <img src="https://i.imgur.com/jL0Gdgj.gif" width="300px" />   <img src="https://i.imgur.com/I252xKw.gif" width="300px" />

  - Account creation with Google authentication included.
  
- Dashboard

  <img src="https://i.imgur.com/gIq1U0Z.gif" width="800px"/>
  
  - Date selection field for viewing schedules, appointments, patients, and doctors within a defined period.
  - Informative cards for viewing billing, appointments, patients, and doctors.
  - Chart for visualizing schedules and billing.
  - Container for viewing doctors with the highest number of appointments.
  - Container containing the specialties with the highest number of appointments.
  - Table showing today's appointments.
- Appointments

  <img src="https://i.imgur.com/cls7XCK.gif" width="800px"/>

  - Appointment creation with selection of patient, doctor, consultation fee, date, and time, following the dates and time slots made available by the selected doctor.
  - Appointment visualization in a table, displaying the patient’s name, doctor, specialty, date, time, and an option to delete the appointment.
  
- Doctors

  <img src="https://i.imgur.com/Wu4oncL.gif" width="800px"/>
  
  - Doctor registration in the system with name, specialty, consultation fee, availability period (start and end date), and available working hours (start and end time).
  - Visualization of medical data on cards, with options to delete or edit when viewing the details.
- Patients

  <img src="https://i.imgur.com/ryPv5mZ.gif" width="800px" />

  - Patient registration in the system with name, email, phone number, and gender.
  - Table for viewing the registered patients’ data.
  
- Subscription Service

  <img src="https://i.imgur.com/H7Ri0eM.gif" width="800px" />
  
  - Subscription service integrated with Stripe.
  - Subscription cancellation functionality included.

- Fully responsive design

  - Dashboard
    
    <img src="https://i.imgur.com/IzzhMWw.gif" width="600px" />

      

  - Appointments
    
    <img src="https://i.imgur.com/x6ZK5Da.gif" width="600px" />
      

  - Doctors
    
    <img src="https://i.imgur.com/JFtupEJ.gif" width="600px" />


  - Patients
    
    <img src="https://i.imgur.com/P962DTW.gif" width="600px" />

      
---

## 🛠️ Technologies and Tools
### Front-end
- **React** (hooks, componentização)
- **Next.js** (App Router, SSR, SSG)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Query**
- **Git & GitHub**
- **Dayjs**
- **Zod**
- **React-hook-form**

### Back-end
- **Drizzle ORM**
- **Postgre**
- **Actions**
- **next-safe-action**
- **Stripe**
- **Better auth**

---
## 📁 Folder Structure
```bash
src/
├─ actions/
│  ├─ create-clinic/
│  ├─ create-stripe-checkout/
│  ├─ delete-appointment/
│  ├─ delete-doctor/
│  ├─ delete-patient/
│  ├─ get-available-times/
│  ├─ upsert-appointment/
│  ├─ upsert-doctor/
│  └─ upsert-patient/
│
├─ app/
│  ├─ (protected)/
│  │  ├─ _components/
│  │  ├─ appointments/
│  │  ├─ clinic-form/
│  │  ├─ dashboard/
│  │  ├─ doctors/
│  │  ├─ patients/
│  │  └─ subscription/
│  │
│  ├─ api/
│  │  ├─ auth/
│  │  └─ stripe/
│  │
│  ├─ authentication/
│  │  ├─ components/
│  │  └─ page.tsx
│  │
│  ├─ new-subscription/
│  │  └─ page.tsx
│  │
│  └─ layout.tsx
```
---
## ⚙️ Installation and Execution
### Prerequisites
- Node.js >= 18
- npm - >= 11.5.2 
```bash
# Clone the repository
git clone https://github.com/Alessandro-Vieira77/doutor-agenda.git

# Access the project folder
cd doutor-agenda

# Install dependencies
npm install

# Run the project in development mode
npm run dev

```
## 📈 Lessons Learned from the Project
- During the development of this project, the following practices were employed:
- Organization of front-end projects
- Best practices with React and Next.js
- Creation of reusable components
- Asynchronous data consumption and handling
- Writing clean and readable code

## 🚧 Next Steps
- Implement unit tests
- Improve accessibility
- Optimize performance
- Add subtle animations

## 👨‍💻 Developer

### Alessandro Viera

- [LinkedIn](www.linkedin.com/in/alessandro-vieira02)

## License
This project is licensed under the:  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
