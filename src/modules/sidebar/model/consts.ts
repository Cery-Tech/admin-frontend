import {
  Briefcase,
  Factory,
  ForkliftIcon,
  LinkIcon,
  SettingsIcon,
  TagsIcon,
  TruckIcon,
} from 'lucide-react';

export const NAV_BAR_CONFIG = [
  {
    title: 'Properties',
    url: '/properties',
    icon: SettingsIcon,
  },
  {
    title: 'Model - Types',
    url: '/model-types',
    icon: LinkIcon,
  },
  {
    title: 'Industries',
    url: '/industries',
    icon: Briefcase,
  },

  {
    title: 'Categories',
    url: '/categories',
    icon: TagsIcon,
  },

  {
    title: 'Types',
    url: '/equipment-types',
    icon: ForkliftIcon,
  },
  {
    title: 'Manufacturers',
    url: '/manufacturers',
    icon: Factory,
  },
  {
    title: 'Models',
    url: '/models',
    icon: TruckIcon,
  },
];
