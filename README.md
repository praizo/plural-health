# Plural Health — Patient & Appointment Management Dashboard

A full-stack dashboard application for managing patients and appointments. The app allows users to view appointments, filter/sort them, add new patients, and schedule appointments.

---

## How to run locally

1.  **Clone Repo**
    ```bash
    git clone <repository-url>
    cd plural-health
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/plural-health
    ```

4.  **Seed Database**
    Populate the database with initial dummy data:
    ```bash
    npx tsx scripts/seed.ts
    ```

5.  **Start development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Architectural Decisions

*   **Framework:** Used **Next.js (App Router)** to leverage server-side rendering and built-in API routes, keeping the architecture unified.
*   **Language:** Adopted **TypeScript** for type safety, better developer experience, and maintainability.
*   **Database:** Chose **MongoDB** for its flexibility with document schemas (Patients/Appointments) and ease of integration with Next.js.
*   **State Management:** Used **TanStack Query (React Query)** for efficient server state management (caching, loading states, re-fetching).
*   **Styling:** Used **Tailwind CSS** for rapid, utility-first styling and responsive design.
*   **Forms:** Implemented **React Hook Form** with **Yup** validation for robust form handling.

## Web Routes

| Route | Description |
| :--- | :--- |
| `/` | **Dashboard**: Main view listing appointments with search, filtering, and actions to add patients/appointments. |

## API Routes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/appointments` | Fetch all appointments (supports filtering/sorting logic on client side for this demo). |
| **POST** | `/api/appointments` | Create a new appointment. |
| **GET** | `/api/patients` | Fetch all patients. |
| **POST** | `/api/patients` | Create a new patient record. |
| **GET** | `/api/patients/search` | Search for patients by name or ID. |

## Missing items (Future Improvements)

*   **Authentication:** Implement Auth.js (NextAuth) for secure login/signup.
*   **Server-side Pagination:** Move pagination logic to the backend for better scalability with large datasets.
*   **Edit/Delete:** Add functionality to edit or cancel appointments and update patient details.
*   **Tests:** Add unit and integration tests (Jest/React Testing Library/Playwright).

## Time Spent

*   ~12 hours
