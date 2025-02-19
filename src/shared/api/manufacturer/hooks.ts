import type { ManufacturerListResponse } from './types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { ManufacturerService } from './service';

export const useGetManufacturers = (
  options?: UseNonRequiredQueryOptions<ManufacturerListResponse>
) => {
  return useQuery({
    queryFn: ManufacturerService.getList,
    queryKey: QueryKeys.Manufacturers,
    ...options,
  });
};

export const useCreateManufacturer = () => {
  return useMutation({
    mutationFn: ManufacturerService.create,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Manufacturers);
    },
  });
};

export const useDeleteManufacturer = () => {
  return useMutation({
    mutationFn: ManufacturerService.delete,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Manufacturers);
    },
  });
};

export const useUpdateManufacturer = () => {
  return useMutation({
    mutationFn: ManufacturerService.update,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Manufacturers);
    },
  });
};
