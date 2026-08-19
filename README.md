# SustainAI - Living Digital Twin for Sustainable Cities


SustainAI is a cutting-edge web application that provides a living digital twin for sustainable cities. It fuses computer vision, predictive forecasting, and reinforcement learning to help city administrators monitor, predict, and act on urban infrastructure data in real time.

## 🌟 Key Features

*   **Interactive Digital Twin:** A 3D interactive map visualizing the city's real-time state, including traffic congestion, energy flow, and carbon emissions.
*   **Command Palette Search:** Fast, keyboard-driven navigation (⌘K or Ctrl+K) to quickly jump between features.
*   **Comprehensive Dashboards:**
    *   **Mobility:** Traffic flow, congestion maps, and EV charging station tracking.
    *   **Energy:** Real-time grid load, solar/wind generation, and consumption patterns.
    *   **Carbon Intelligence:** Emissions tracking against sustainability targets.
    *   **AI Predictions:** Machine learning-driven forecasts and anomaly detection.
    *   **Decision Engine:** Policy optimization and actionable recommendations.
*   **Supabase Authentication:** Secure login using Google OAuth and email/password, with comprehensive profile management.
*   **Beautiful UI/UX:** Built with React, Tailwind CSS, and Framer Motion for a fluid, responsive, and visually stunning "glassmorphic" experience.

## 🛠️ Technology Stack

*   **Frontend Framework:** React 19 + Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Vanilla CSS (for custom scrollbars and animations)
*   **Animations:** Framer Motion & GSAP
*   **3D Rendering:** Three.js + React Three Fiber / Drei
*   **Charts & Maps:** Recharts, D3.js, Leaflet (React-Leaflet)
*   **Authentication & Backend:** Supabase (Auth, Storage, Database)
*   **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn
*   A [Supabase](https://supabase.com/) project (for authentication and profile management)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dishan775/Sustain-Ai-.git
    cd Sustain-Ai-
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    *Note: Ensure you have configured the Google OAuth provider in your Supabase project settings and added `http://localhost:5173/auth/callback` to your allowed redirect URLs.*

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Navigate to `http://localhost:5173` to see the application running.

## 📂 Project Structure

```text
src/
├── assets/         # Images, videos, and static assets
├── components/     # React components
│   ├── dashboard/  # Admin dashboard views, widgets, and layouts
│   ├── shared/     # Reusable UI components (GlassCard, NavButton, etc.)
│   └── ...         # Landing page sections (Hero, Nav, etc.)
├── contexts/       # React contexts (e.g., AuthContext)
├── lib/            # Utilities, Supabase client, animation variants
├── App.tsx         # Main application entry point
├── AppLayout.tsx   # Landing page layout structure
├── main.tsx        # React root rendering
├── router.tsx      # Application routing (React Router)
└── index.css       # Global styles and Tailwind directives
```

## 🔐 Authentication Setup

This project uses Supabase for authentication. To enable full functionality:



## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/dishan775/Sustain-Ai-/issues).

## 📄 License

This project is licensed under the MIT License.
