import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 72 : 240;

  return (
    <div className="min-h-screen bg-dash-bg text-dash-text">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className="transition-[margin-left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col min-h-screen"
        style={{ marginLeft: sidebarWidth + 32 }} /* 16px left + sidebar + 16px right gap */
      >
        <DashboardHeader sidebarWidth={0} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
