import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/pages/DashboardHome';
import MobilityPage from './components/dashboard/pages/MobilityPage';
import EnergyPage from './components/dashboard/pages/EnergyPage';
import CarbonPage from './components/dashboard/pages/CarbonPage';
import AIPredictionsPage from './components/dashboard/pages/AIPredictionsPage';
import DecisionEnginePage from './components/dashboard/pages/DecisionEnginePage';
import ScenariosPage from './components/dashboard/pages/ScenariosPage';
import GraphNetworkPage from './components/dashboard/pages/GraphNetworkPage';
import MonitoringPage from './components/dashboard/pages/MonitoringPage';
import ReportsPage from './components/dashboard/pages/ReportsPage';
import SettingsPage from './components/dashboard/pages/SettingsPage';
import ProfilePage from './components/dashboard/pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'mobility',
        element: <MobilityPage />,
      },
      {
        path: 'energy',
        element: <EnergyPage />,
      },
      {
        path: 'carbon',
        element: <CarbonPage />,
      },
      {
        path: 'predictions',
        element: <AIPredictionsPage />,
      },
      {
        path: 'decisions',
        element: <DecisionEnginePage />,
      },
      {
        path: 'scenarios',
        element: <ScenariosPage />,
      },
      {
        path: 'graph',
        element: <GraphNetworkPage />,
      },
      {
        path: 'monitoring',
        element: <MonitoringPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
