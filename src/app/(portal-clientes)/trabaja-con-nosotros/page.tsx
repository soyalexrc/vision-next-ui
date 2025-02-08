'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { DeleteIcon, UploadIcon } from '@/components/icons';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { toast } from 'sonner';
import { LinkIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendWorkWithUsForm } from '@/actions/contact';
import { WorkWithUsFormSchema } from '@/lib/interfaces/WorkWithUs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Lottie from 'lottie-react';
import successAnimation from '@/lib/lottie/success-animation.json';
import Image from 'next/image';

export default function WorkWithUs() {
  const [uploadedFile, setUploadedFile] = useState<{ path: string; name: string }>({ name: '', path: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  // TODO manejar un maximo de peso por archivo
  // TODO limitar acciones de subida infinita por dispositivo
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof WorkWithUsFormSchema>>({
    resolver: zodResolver(WorkWithUsFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      cvUrl: '',
      role: '',
      office: '',
    },
  });

  async function onSubmit(values: z.infer<typeof WorkWithUsFormSchema>) {
    const { success, error } = await sendWorkWithUsForm(values);
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
      case 'office':
        return 'Oficina';
      case 'role':
        return 'Rol / Posicion';
      case 'cvUrl':
        return 'Agregar un archivo CV';
      default:
        return key;
    }
  }

  function resetForm() {
    form.reset();
    setOpen(false);
    setUploadedFile({ name: '', path: '' });
  }

  const removeFile = async () => {
    const fileRef = ref(storage, uploadedFile.path);

    await deleteObject(fileRef);
    setUploadedFile({ name: '', path: '' });
    toast.success(`Se elimino: el archivo con exito!`);
  };

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const basePath = 'recepcion cv';
    try {
      if (e.target.files) {
        for (const file of Array.from(e.target.files)) {
          const fileRef = ref(storage, `${basePath}/${form.getValues('name') || 'otros'}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);
          setUploadedFile({ name: snapshot.ref.name, path: url });
          form.setValue('cvUrl', url);
          toast.success(`Se cargo: ${snapshot.ref.name} con exito!`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <section className="relative w-full h-[300px] md:h-[600px]">
        <Image
          src="/banners/trabaja-con-nosotros.png"
          // className="object-bottom"
          fill
          alt="Banner publicitario de inmuebles"
        />
        {/*<img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />*/}
        {/*<div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center">*/}
        {/*  <h2 className="text-white lg:text-4xl tracking-widest">Trabaja con nosotros.</h2>*/}
        {/*</div>*/}
      </section>
      <section className="lg:px-24 my-10">
        <h1 className="text-4xl text-center mb-10">Unete a nuestro equipo</h1>
        <div className="flex justify-center">
          <div className=" w-full max-w-[800px]">
            <div className="px-4">
              <h2 className="text-3xl mb-4">Mis datos</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Nombres y apellidos</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2 my-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Numero de telefono</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <h2 className="text-2xl my-10">Estoy interesado en </h2>

                  <div className="grid gap-4 grid-cols-2 my-5">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rol / Posicion</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una opcion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Asesor inmobiliario">Asesor inmobiliario</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="office"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Oficina</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una opcion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Paseo la granja">Paseo la granja</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Escribe una descripcion corta." className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {uploadedFile.path === '' && (
                    <Button
                      onClick={() => inputRef.current?.click()}
                      variant="ghost"
                      type="button"
                      className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-600 my-10 cursor-pointer"
                    >
                      <UploadIcon fill="gray" height={22} width={22} style={{ marginRight: '.5rem' }} />
                      <p className="font-bold text-gray-600">Agregar archivo</p>
                    </Button>
                  )}

                  {uploadedFile.path !== '' && <h4 className="text-xl mt-10 text-center mb-5">Documentos</h4>}

                  <div>
                    {uploadedFile.path !== '' && (
                      <div className="p-3">
                        <div className="flex items-center justify-between gap-5">
                          <Link href={uploadedFile.path} target="_blank" className="flex items-center underline">
                            <LinkIcon height={22} width={22} />
                            <p className="ml-5">{uploadedFile.name} </p>
                          </Link>
                          <button onClick={removeFile}>
                            <DeleteIcon fill="red" width={22} height={22} />
                          </button>
                        </div>
                      </div>
                    )}
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

                  <div className="my-5 flex items-center justify-center">
                    <Checkbox defaultChecked />
                    <span className="text-sm mx-2">
                      He leido y acepto los
                      <Link href="/">terminos y condiciones</Link>
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" className="bg-red-900 text-white">
                      Enviar informacion
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
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

      <input type="file" ref={inputRef} className="hidden" id="file" onChange={uploadFile} />
    </>
  );
}
