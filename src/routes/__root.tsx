import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

import { AppSidebar } from '@/modules/sidebar';
import { NAV_BAR_CONFIG } from '@/modules/sidebar/model/consts';
import { getQueryClient } from '@/shared/api/queryClient';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

const Root = () => {
  const loc = useLocation();

  const currentRoute = NAV_BAR_CONFIG.find((item) => loc.pathname.includes(item.url));

  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={getQueryClient()}>
        <SidebarProvider
          style={{
            '--sidebar-width': '10rem',
          }}
        >
          <AppSidebar />
          <div className="flex flex-col flex-1 w-full">
            {currentRoute ? (
              <h1 className="text-2xl font-bold px-4 py-2">{currentRoute.title}</h1>
            ) : null}
            <main className="flex flex-col w-full overflow-auto">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>

        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
        <Toaster />
      </QueryClientProvider>
    </DndProvider>
  );
};

export const Route = createRootRoute({
  component: Root,
});
