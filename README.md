# TodoApp - We Did ✨

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [License](#license)

## Introduction

TodoApp - We Did is a collaborative to-do list application that helps users manage tasks efficiently. This project is designed with a mobile-first approach, focusing on user-friendly task management with real-time synchronization using Supabase.

## Features

- ✅ Add, edit, and delete tasks
- 🗂️ Organize tasks into categories
- 📱 Mobile-first design for a seamless experience on smartphones
- 🔑 User authentication with Supabase
- 📊 Real-time task updates
- 💡 Responsive and intuitive UI

## Tech Stack

- **Frontend:**
  - React
  - Vite
  - TailwindCSS
- **Backend:**
  - Supabase (for backend and authentication)

## Installation

To get started with the project, follow the instructions below:

1. Clone the repository:

   ```bash
   git clone https://github.com/haikalbintang/TodoApp-We-Did.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TodoApp-We-Did
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Supabase project credentials:

   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_KEY=your-supabase-anon-key
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

## Usage

Once the app is running, you can:

1. Sign up or log in using the provided Supabase authentication system.
2. Add new tasks and manage your to-do lists in real-time.
3. View and update tasks on your mobile device.

## Authentication

This project uses [Supabase](https://supabase.com/) for user authentication. Ensure that you have a Supabase account and the necessary credentials to enable login functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Happy coding! 😊
