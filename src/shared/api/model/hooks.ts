import type { ModelListResponse } from './types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { ModelService } from './service';

export const useGetModels = (options?: UseNonRequiredQueryOptions<ModelListResponse>) => {
  return useQuery({
    queryFn: ModelService.getList,
    queryKey: QueryKeys.Models,
    ...options,
  });
};

export const useCreateModel = () => {
  return useMutation({
    mutationFn: ModelService.create,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Models);
    },
  });
};

export const useDeleteModel = () => {
  return useMutation({
    mutationFn: ModelService.delete,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Models);
    },
  });
};

export const useUpdateModel = () => {
  return useMutation({
    mutationFn: ModelService.update,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Models);
    },
  });
};
