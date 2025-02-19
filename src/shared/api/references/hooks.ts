'use client';

import type { UploadFileType } from './consts';
import type {
  CategoriesGetRequest,
  CategoriesGetResponse,
  Industry,
  ManufacturerGetResponse,
  ManufacturerHookResponse,
  UploadedImage,
  VehicleCategory,
  VehicleType,
} from './types';
import type { UseNonRequiredQueryOptions } from '@/shared/types/queries';
import type { DefaultError } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { parseErrorMessage } from '@/shared/utils/toasts';

import { QueryKeys } from '../consts';
import { ReferencesService } from './services';

type VehicleCategoriesHookResponse = {
  categories: VehicleCategory[];
  keyMap: Record<string, VehicleCategory>;
};

export const useVehicleCategories = (
  params?: CategoriesGetRequest,
  options?: UseNonRequiredQueryOptions<CategoriesGetResponse, VehicleCategoriesHookResponse>
) => {
  return useQuery({
    queryKey: QueryKeys.Categories,
    queryFn: () => ReferencesService.getCategoriesList(params),
    select(data) {
      return {
        categories: [...data.categories].sort((a, b) => a.id - b.id),
        keyMap: data.categories.reduce(
          (acc, item) => {
            acc[item.id] = item;

            return acc;
          },
          {} as Record<string, VehicleCategory>
        ),
      };
    },
    ...options,
  });
};

export const useVehicleTypes = () => {
  return useQuery({
    queryKey: QueryKeys.Types,
    queryFn: ReferencesService.getTypesList,
    select(data) {
      return {
        types: data.types,
        keyMap: data.types.reduce(
          (acc, item) => {
            acc[item.id] = item;

            return acc;
          },
          {} as Record<string, VehicleType>
        ),
      };
    },
  });
};

export const useManufacturerInfo = (
  options?: UseNonRequiredQueryOptions<ManufacturerGetResponse, ManufacturerHookResponse>
) => {
  return useQuery<ManufacturerGetResponse, DefaultError, ManufacturerHookResponse>({
    queryKey: QueryKeys.Manufacturers,
    queryFn: ReferencesService.getManufacturersList,
    select(data) {
      return {
        manufacturers: data.manufacturers,
        makeMap: data.manufacturers.reduce(
          (acc, item) => {
            acc[item.id.toString()] = item;

            return acc;
          },
          {} as ManufacturerHookResponse['makeMap']
        ),
        modelMap: data.manufacturers.reduce(
          (acc, item) => {
            item.models?.forEach((model) => {
              acc[model.id.toString()] = model;
            });

            return acc;
          },
          {} as ManufacturerHookResponse['modelMap']
        ),
      };
    },
    ...options,
  });
};

export const useIndustriesList = () => {
  return useQuery({
    queryKey: QueryKeys.Industries,
    queryFn: ReferencesService.getIndustriesList,
    select(data) {
      return {
        industries: data.industries,
        keyMap: data.industries.reduce(
          (acc, item) => {
            acc[item.id] = item;

            return acc;
          },
          {} as Record<string, Industry>
        ),
      };
    },
  });
};

export const useUploadImages = () => {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = useCallback(async (key: UploadFileType, file: File) => {
    setLoadingMap((prev) => ({ ...prev, [key]: true }));

    try {
      const { images } = await ReferencesService.uploadImage({ key, files: [file] });

      return images[0] as UploadedImage;
    } catch (error) {
      setErrorMap((prev) => ({ ...prev, [key]: parseErrorMessage(error) }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [key]: false }));
    }
  }, []);

  const uploadImages = useCallback(async (key: UploadFileType, files: File[]) => {
    setIsLoading(true);

    const { images } = await ReferencesService.uploadImage({ key, files });

    setIsLoading(false);

    return images;
  }, []);

  return {
    uploadImage,
    uploadImages,
    loadingMap,
    isLoading,
    errorMap,
  };
};
