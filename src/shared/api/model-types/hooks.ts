import type { ModelTypeListResponse } from './types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { ModelTypeService } from './service';

export const useGetModelTypes = (options?: UseNonRequiredQueryOptions<ModelTypeListResponse>) => {
  return useQuery({
    queryFn: ModelTypeService.getList,
    queryKey: QueryKeys.ModelTypes,
    ...options,
  });
};

export const useCreateModelType = () => {
  return useMutation({
    mutationFn: ModelTypeService.create,
    onSuccess: () => {
      invalidateQueries(QueryKeys.ModelTypes);
    },
  });
};

export const useDeleteModelType = () => {
  return useMutation({
    mutationFn: ModelTypeService.delete,
    onSuccess: () => {
      invalidateQueries(QueryKeys.ModelTypes);
    },
  });
};
