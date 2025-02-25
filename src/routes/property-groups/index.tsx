import { createFileRoute } from '@tanstack/react-router';

import { PropertyGroupPage } from '@/pages/property-groups/ui/PropertyGroupPage';

export const Route = createFileRoute('/property-groups/')({
  component: PropertyGroupPage,
});
