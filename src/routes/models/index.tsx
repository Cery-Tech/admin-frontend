import { createFileRoute } from '@tanstack/react-router';

import { ModelPage } from '@/pages/equipment-models/ui/ModelPage';

export const Route = createFileRoute('/models/')({
  component: ModelPage,
});
