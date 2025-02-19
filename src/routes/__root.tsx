import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AppSidebar } from '@/modules/sidebar';
import { getQueryClient } from '@/shared/api/queryClient';

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
          <TanStackRouterDevtools />
          <Toaster />
        </SidebarProvider>
      </QueryClientProvider>
    </DndProvider>
  ),
});
