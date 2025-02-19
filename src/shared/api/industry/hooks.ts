import type { IndustryListResponse } from './types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { IndustryService } from './service';

export const useGetIndustries = (options?: UseNonRequiredQueryOptions<IndustryListResponse>) => {
  return useQuery({
    queryFn: IndustryService.getList,
    queryKey: QueryKeys.Industries,
    ...options,
  });
};

export const useCreateIndustry = () => {
  return useMutation({
    mutationFn: IndustryService.create,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Industries);
    },
  });
};

export const useDeleteIndustry = () => {
  return useMutation({
    mutationFn: IndustryService.delete,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Industries);
    },
  });
};

export const useUpdateIndustry = () => {
  return useMutation({
    mutationFn: IndustryService.update,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Industries);
    },
  });
};
