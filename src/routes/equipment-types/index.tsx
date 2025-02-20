import { createFileRoute } from '@tanstack/react-router';

import { EquipmentTypePage } from '@/pages/equipment-types';

export const Route = createFileRoute('/equipment-types/')({
  component: EquipmentTypePage,
});
