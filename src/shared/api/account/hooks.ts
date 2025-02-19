'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { AccountService } from './service';

export const useGetUser = () => {
  return useQuery({
    queryKey: QueryKeys.User,
    queryFn: AccountService.getUser,
    retry: 1,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AccountService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.User });
    },
  });
};
