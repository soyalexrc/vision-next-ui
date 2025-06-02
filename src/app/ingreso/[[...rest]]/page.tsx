import LoginAnimation from '@/components/auth/LoginAnimation';
import { SignIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  redirect('https://admin.visioninmobiliaria.com.ve');

  const user = await currentUser();

  if (user) {
    redirect('/administracion');
  }

  return (
    <main className="grid grid-cols-12 min-h-screen">
      <div className="hidden lg:flex col-span-7 bg-gray-100 items-center justify-center">
        <p>informacion sobre el sistema (carousel animado, etc...)</p>
      </div>
      <div className="col-span-12 lg:col-span-5 px-12 flex justify-center relative">
        {/*<Link href="/">*/}
        {/*  <Button variant="vision" className="absolute top-0 left-0 right-0">*/}
        {/*    Volver a el portal inmobiliario*/}
        {/*  </Button>*/}
        {/*</Link>*/}
        <div>
          <div className="flex justify-center">
            <LoginAnimation />
          </div>
          <SignIn
            appearance={{
              elements: {
                footerAction__signIn: { display: 'none' },
              },
            }}
            fallbackRedirectUrl="/administracion"
            afterSignOutUrl="/ingreso"
          />
        </div>
      </div>
    </main>
  );
}
