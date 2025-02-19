import { Building, GroupIcon, Link, PlaneTakeoffIcon, SettingsIcon, TruckIcon } from 'lucide-react';

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
    icon: Link,
  },
  {
    title: 'Industries',
    url: '/industries',
    icon: PlaneTakeoffIcon,
  },

  {
    title: 'Categories',
    url: '/categories',
    icon: GroupIcon,
  },
  {
    title: 'Manufacturers',
    url: '/manufacturers',
    icon: Building,
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
