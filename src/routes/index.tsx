import { createFileRoute, Link } from '@tanstack/react-router';
import { Briefcase, Factory, LinkIcon, SettingsIcon, TagsIcon, TruckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Route = createFileRoute('/')({
  component: App,
});

const routesWithDescriptions = [
  {
    path: '/properties',
    title: 'Equipment Properties',
    description:
      'View and edit equipment properties. This will affect which fields are available when creating or editing equipment.',
    icon: SettingsIcon,
  },
  {
    path: '/model-types',
    title: 'Model Type Relations',
    description:
      'View and edit model type relations. Join equipment types to models to create a hierarchy.',
    icon: LinkIcon,
  },
  {
    path: '/industries',
    title: 'Industries',
    description: 'View and edit industries. Industries are big groups of industries.',
    icon: Briefcase,
  },
  {
    path: '/categories',
    title: 'Categories',
    description: 'View and edit categories. Categories are used to group equipment types.',
    icon: TagsIcon,
  },
  {
    path: '/manufacturers',
    title: 'Manufacturers',
    description: 'View and edit manufacturers. Manufacturers are used to group equipment by brand.',
    icon: Factory,
  },
  {
    path: '/models',
    title: 'Models',
    description: 'View and edit equipment models',
    icon: TruckIcon,
  },
];

function App() {
  return (
    <div className="container mx-auto py-8 lg:pt-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Cery-Admin!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routesWithDescriptions.map((route) => (
          <Card
            key={route.path}
            className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{route.title}</CardTitle>
              <route.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <CardDescription className="text-sm text-muted-foreground mb-4 flex-1">
                {route.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={route.path}>Go to {route.title}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
