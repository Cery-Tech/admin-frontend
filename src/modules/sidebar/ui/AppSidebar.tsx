import { Briefcase, Factory, LinkIcon, SettingsIcon, TagsIcon, TruckIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
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

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex flex-row-reverse">
                  <SidebarTrigger />
                  <span>Cery - Admin</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
