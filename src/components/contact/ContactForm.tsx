'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContactFormSchema } from '@/lib/interfaces/Contact';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { sendContactForm } from '@/actions/contact';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import Lottie from 'lottie-react';
import successAnimation from '@/lib/lottie/success-animation.json';
import SocialMediaBar from '@/app/(portal-clientes)/contacto/SocialMediaBar';

type Props = {
  showLabels: boolean;
  from: string;
};

export default function ContactForm({ showLabels, from }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      from,
      phone: '',
      message: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    const { success, error } = await sendContactForm(values);
    if (success) {
      toast.success('Se envio el mensaje con extio!');
      setOpen(true);
    } else {
      toast.error(`Ocurrio un error al intentar enviar el mensaje: ${error}`);
      console.log(error);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'name':
        return 'Nombre';
      case 'email':
        return 'Correo electronico';
      case 'phone':
        return 'Numero de telefono';
      default:
        return key;
    }
  }

  function resetForm() {
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-1">
                {showLabels && <FormLabel>Nombres y apellidos</FormLabel>}
                <FormControl>
                  <Input placeholder={!showLabels ? 'Nombres y apellidos' : ''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={`grid gap-4 my-5 ${from === 'GENERAL' ? 'md:grid-cols-2' : ''}`}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {showLabels && <FormLabel>Email</FormLabel>}
                  <FormControl>
                    <Input placeholder={!showLabels ? 'Email' : ''} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {showLabels && <FormLabel>Telefono</FormLabel>}
                  <FormControl>
                    <Input placeholder={!showLabels ? 'Telefono' : ''} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {from === 'GENERAL' && <h2 className="text-2xl mt-10 mb-3">Estoy interesado en </h2>}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Textarea placeholder="Escribir mensaje aqui" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center my-5 gap-2">
            <Checkbox defaultChecked />
            <span className="text-sm">
              He leido y acepto los
              <Link href="/">terminos y condiciones</Link>
            </span>
          </div>

          {Object.keys(form.formState.errors).length > 0 && (
            <Alert variant="destructive" className="my-5">
              <AlertTitle>Existen errores en las siguientes secciones del formulario</AlertTitle>
              <AlertDescription>
                <ul>
                  {Object.keys(form.formState.errors).map((key) => (
                    <li key={key}>
                      <span className="mr-2">*</span>
                      <span>{formatErrorSection(key)}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center">
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full lg:w-auto bg-red-900">
              {form.formState.isSubmitting && (
                <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
              )}
              {form.formState.isSubmitting ? 'Enviando informacion...' : 'Enviar informacion'}
            </Button>
          </div>
        </form>
      </Form>

      <div>
        <div>
          <p className="text-center my-5">O, Contactanos aqui abajo</p>
        </div>
        <SocialMediaBar />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Gracias por comunicarte con nosotros!</DialogTitle>
            <DialogDescription>Nos comunicaremos contigo en las proximas 48 horas.</DialogDescription>
          </DialogHeader>
          <div>
            <Lottie loop={false} animationData={successAnimation} />
          </div>
          <DialogFooter>
            <div className="flex justify-center w-full">
              <Button type="button" variant="vision" onClick={resetForm}>
                Entendido
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
