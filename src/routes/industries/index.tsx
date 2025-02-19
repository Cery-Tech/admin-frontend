import { createFileRoute } from '@tanstack/react-router';

import { IndustryPage } from '@/pages/industry';

export const Route = createFileRoute('/industries/')({
  component: IndustryPage,
});
