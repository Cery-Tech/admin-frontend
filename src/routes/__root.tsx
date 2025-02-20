import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

import { AppSidebar } from '@/modules/sidebar';
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

export const Route = createRootRoute({
  component: () => (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={getQueryClient()}>
        <SidebarProvider
          style={{
            '--sidebar-width': '10rem',
          }}
        >
          <AppSidebar />
          <div className="flex flex-col w-full h-full">
            <main className="w-full flex flex-col h-full">
              <Outlet />
            </main>
          </div>
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
          <Toaster />
        </SidebarProvider>
      </QueryClientProvider>
    </DndProvider>
  ),
});
