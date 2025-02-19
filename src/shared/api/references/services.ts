import type { FetchBlob } from '../helpers/fetch';
import type { UploadFileType } from './consts';
import type {
  CategoriesGetRequest,
  CategoriesGetResponse,
  IndustriesGetResponse,
  ManufacturerGetResponse,
  UploadedImage,
  VehicleTypesResponse,
} from './types';

import { EquipmentApi } from '../client';

class References {
  getManufacturersList = async () => {
    return EquipmentApi.GET<ManufacturerGetResponse>('/manufacturers');
  };

  getIndustriesList = async () => {
    return EquipmentApi.GET<IndustriesGetResponse>('/industries');
  };

  getCategoriesList = async (params?: CategoriesGetRequest) => {
    return EquipmentApi.GET<CategoriesGetResponse>('/categories', { params });
  };

  getTypesList = async () => {
    return EquipmentApi.GET<VehicleTypesResponse>('/types');
  };

  uploadImage = async ({
    key,
    ...rest
  }: { key: UploadFileType } & ({ files: File[] } | { blobs: FetchBlob[] })) => {
    if ('files' in rest) {
      return EquipmentApi.POST_DATA<{ images: UploadedImage[] }>('/image', {
        [key]: rest.files,
      });
    }

    return EquipmentApi.POST_DATA<{ images: UploadedImage[] }>('/image', {
      [key]: rest.blobs,
    });
  };
}

export const ReferencesService = new References();
