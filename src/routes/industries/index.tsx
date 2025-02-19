import { createFileRoute } from '@tanstack/react-router';

import { IndustryPage } from '@/pages/industries';

export const Route = createFileRoute('/industries/')({
  component: IndustryPage,
});
