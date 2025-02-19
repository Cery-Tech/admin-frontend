import { createFileRoute } from '@tanstack/react-router';

import { PropertiesPage } from '@/pages/properties';

const RouteComponent = PropertiesPage;

export const Route = createFileRoute('/properties/')({
  component: RouteComponent,
});
