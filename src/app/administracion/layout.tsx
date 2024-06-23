import Header from '@/components/layout/administracion/Header';
import Sidenav from '@/components/layout/administracion/SideNav';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidenav />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}
