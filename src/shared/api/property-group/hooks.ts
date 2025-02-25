import type { PropertyGroup, PropertyGroupListQueryResponse } from './types';
import type { NumberMap } from '@/shared/types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../consts';
import { invalidateQueries } from '../query-utils';
import { PropertyGroupService } from './service';

export const useGetPropertyGroup = (
  options?: UseNonRequiredQueryOptions<PropertyGroupListQueryResponse>
) => {
  return useQuery({
    queryFn: async () => {
      const propertyMap: NumberMap<PropertyGroup> = {};
      const { property_group } = await PropertyGroupService.getList();

      property_group.forEach((group) => {
        propertyMap[group.group_id] = group;
      });

      return { property_group, propertyMap };
    },
    queryKey: QueryKeys.PropertyGroup,
    ...options,
  });
};

export const useCreatePropertyGroup = () => {
  return useMutation({
    mutationFn: PropertyGroupService.create,
    onSuccess: () => {
      invalidateQueries(QueryKeys.PropertyGroup);
    },
  });
};

export const useDeletePropertyGroup = () => {
  return useMutation({
    mutationFn: PropertyGroupService.delete,
    onSuccess: () => {
      invalidateQueries(QueryKeys.PropertyGroup);
    },
  });
};

export const useUpdatePropertyGroup = () => {
  return useMutation({
    mutationFn: PropertyGroupService.update,
    onSuccess: () => {
      invalidateQueries(QueryKeys.PropertyGroup);
    },
  });
};
