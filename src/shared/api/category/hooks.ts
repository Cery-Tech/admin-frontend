import type { CategoryListResponse } from './types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { CategoryService } from './service';

export const useGetCategories = (options?: UseNonRequiredQueryOptions<CategoryListResponse>) => {
  return useQuery({
    queryFn: CategoryService.getList,
    queryKey: QueryKeys.Categories,
    ...options,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: CategoryService.create,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Categories);
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: CategoryService.delete,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Categories);
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: CategoryService.update,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Categories);
    },
  });
};
