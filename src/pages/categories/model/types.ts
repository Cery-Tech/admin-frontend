import type { Category } from '@/shared/api/category/types';

export type CategoryTableItem = Category & {
  industry_name: string;
};
