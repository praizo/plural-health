# Plural Health Coding Assessment — Patient & Appointment Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)

A modern, full-stack healthcare dashboard application built as a coding assessment for Plural Health. Designed to streamline patient and appointment management, it leverages the latest web technologies to provide a seamless experience.

## 🚀 Features

-   **Dashboard Overview**: Real-time view of upcoming appointments and patient statistics.
-   **Appointment Management**:
    -   View, filter, and sort appointments by date, clinic, or status.
    -   Create new appointments with conflict detection.
    -   Track appointment status (e.g., "Seen doctor", "Processing").
-   **Patient Management**:
    -   Register new patients with detailed demographic information.
    -   Search for patients by name or hospital ID.
    -   View patient history and details.
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
-   **Data Persistence**: Robust data storage using MongoDB.

## 🛠️ Tech Stack

-   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **Backend**: Next.js API Routes
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
-   **Testing**: [Jest](https://jestjs.io/)
-   **Icons**: Custom SVG assets

## 📂 Project Structure

```bash
plural-health/
├── public/              # Static assets (images, icons)
├── scripts/             # Utility scripts (database seeding)
├── src/
│   ├── app/             # Next.js App Router pages and API routes
│   │   ├── api/         # Backend API endpoints
│   │   └── ...          # Frontend pages
│   ├── components/      # Reusable UI components
│   │   ├── appointments/# Appointment-related components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── patients/    # Patient-related components
│   │   └── ui/          # Generic UI elements (Buttons, Modals, etc.)
│   ├── lib/             # Utilities, hooks, and types
│   │   ├── db/          # Database connection and models
│   │   ├── hooks/       # Custom React hooks
│   │   └── types/       # TypeScript definitions
│   └── services/        # API client services
└── ...config files      # Configuration (Tailwind, TypeScript, Jest, etc.)
```

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **MongoDB** instance (local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/plural-health.git
    cd plural-health
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/plural-health
    ```

4.  **Seed the Database**
    Populate your database with initial dummy data:
    ```bash
    npx tsx scripts/seed.ts
    ```

5.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Running Tests

This project uses Jest for unit testing backend logic and services.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 🔌 API Documentation

### Appointments

-   `GET /api/appointments`: Retrieve all appointments.
-   `POST /api/appointments`: Create a new appointment.

### Patients

-   `GET /api/patients`: Retrieve all patients.
-   `POST /api/patients`: Register a new patient.
-   `GET /api/patients/search?q={query}`: Search patients by name or ID.

## 🔮 Future Improvements

-   **Authentication**: Implement secure user authentication (e.g., NextAuth.js).
-   **Server-Side Pagination**: Optimize data fetching for large datasets.
-   **E2E Testing**: Add Cypress or Playwright for end-to-end testing.
-   **Dark Mode**: Add theming support.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
