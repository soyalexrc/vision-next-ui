import dynamicIconImports from 'lucide-react/dynamicIconImports';

export type AllowedRoute = {
  title: string;
  path: string;
  icon: keyof typeof dynamicIconImports;
};
