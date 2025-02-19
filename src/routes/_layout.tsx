import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppSidebar } from '@/modules/sidebar';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <main className="flex w-full h-full min-h-dvh">
      <AppSidebar />
      <Outlet />
    </main>
  );
}
