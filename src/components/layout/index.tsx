import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useContext } from 'react';
import { UiContext } from '@/context/UiContext';

export default function Layout({ children }: any) {
  const { showToolbar } = useContext(UiContext);

  return (
    <>
      {showToolbar && <Header />}
      {children}
      <Footer />
    </>
  );
}
