import type { EquipmentTypeListResponse } from './types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { EquipmentTypeService } from './service';

export const useGetEquipmentTypes = (
  options?: UseNonRequiredQueryOptions<EquipmentTypeListResponse>
) => {
  return useQuery({
    queryFn: EquipmentTypeService.getList,
    queryKey: QueryKeys.Types,
    ...options,
  });
};

export const useCreateEquipmentType = () => {
  return useMutation({
    mutationFn: EquipmentTypeService.create,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Types);
    },
  });
};

export const useDeleteEquipmentType = () => {
  return useMutation({
    mutationFn: EquipmentTypeService.delete,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Types);
    },
  });
};

export const useUpdateEquipmentType = () => {
  return useMutation({
    mutationFn: EquipmentTypeService.update,
    onSuccess: () => {
      invalidateQueries(QueryKeys.Types);
    },
  });
};
