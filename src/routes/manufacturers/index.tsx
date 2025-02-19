import { createFileRoute } from '@tanstack/react-router';

import { ManufacturerPage } from '@/pages/manufacturers';

export const Route = createFileRoute('/manufacturers/')({
  component: ManufacturerPage,
});
