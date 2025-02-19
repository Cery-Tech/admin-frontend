import { createFileRoute } from '@tanstack/react-router';

import { ModelTypesPage } from '@/pages/model-types';

export const Route = createFileRoute('/model-types/')({
  component: ModelTypesPage,
});
