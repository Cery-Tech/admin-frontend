import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { AdminService } from './service';

export const useGetAdminPropertiesFields = () => {
  return useQuery({
    queryKey: QueryKeys.AdminProperties,
    queryFn: AdminService.getFields,
  });
};

export const useCreateAdminPropertyMutation = () => {
  return useMutation({
    mutationFn: AdminService.addField,
    onSuccess: () => {
      invalidateQueries(QueryKeys.AdminProperties);
    },
  });
};

export const useUpdateAdminPropertyMutation = () => {
  return useMutation({
    mutationFn: AdminService.updateField,
    onSuccess: () => {
      invalidateQueries(QueryKeys.AdminProperties);
    },
  });
};

export const useDeleteAdminPropertyMutation = () => {
  return useMutation({
    mutationFn: AdminService.deleteField,
    onSuccess: () => {
      invalidateQueries(QueryKeys.AdminProperties);
    },
  });
};
