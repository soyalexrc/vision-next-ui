import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignUpPage() {
  const url =
    'https://api.whatsapp.com/send?phone=51917902604&text=%F0%9F%98%80%20Hola!%2C%20Estoy%20tratando%20de%20ingresar%20a%20la%20seccion%20administrativa%20de%20Vision%20Inmobiliaria%2C%20pero%20parece%20que%20no%20estoy%20registrad%40%2C%20Pueden%20ayudarme%3F';
  return (
    <div className="grid place-items-center h-screen">
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Eres miembro de Vision Inmobiliaria?</CardTitle>
          <CardDescription>Si ves este mensaje es porque aun no tienes acceso con un correo o nombre de usuario.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href={url} target="_blank">
            <Button>Comunicarse con soporte tecnico</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
