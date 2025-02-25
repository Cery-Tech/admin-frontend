import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';

import { AppSidebar } from '@/modules/sidebar';
import { NAV_BAR_CONFIG } from '@/modules/sidebar/model/consts';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const loc = useLocation();

  const currentRoute = NAV_BAR_CONFIG.find((item) => loc.pathname.includes(item.url));

  console.debug('currentRoute', currentRoute, loc);

  return (
    <main className="flex w-full h-full min-h-dvh">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        {currentRoute ? <h1 className="text-2xl font-bold p-4">{currentRoute.title}</h1> : null}
        <Outlet />
      </div>
    </main>
  );
}
