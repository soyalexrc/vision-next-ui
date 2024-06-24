'use client';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { DeleteIcon, UploadIcon } from '@/components/icons';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const animals = [{ label: 'sample', value: 2 }];

export default function WorkWithUs() {
  const [myFiles, setMyFiles] = useState<any>([]);

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  const removeFile = (file: any) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  return (
    <>
      <section className="relative">
        <img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center">
          <h2 className="text-white lg:text-4xl tracking-widest">Trabaja con nosotros.</h2>
        </div>
      </section>
      <section className="lg:px-24 my-10">
        <h1 className="text-4xl text-center mb-10">Unete a nuestro equipo</h1>
        <div className="flex justify-center">
          <div className=" w-full max-w-[800px]">
            <div className="px-4">
              <h2 className="text-3xl mb-4">Mis datos</h2>
              <Input type="text" placeholder="Nombre" />

              <div className="grid gap-4 grid-cols-2 my-5">
                <Input type="email" placeholder="Email" />
                <Input type="tel" placeholder="Telefono" />
              </div>

              <h2 className="text-2xl my-10">Estoy interesado en </h2>

              <div className="grid gap-4 grid-cols-2 my-5">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rol / Posicion</SelectLabel>
                      {animals.map((animal) => (
                        <SelectItem value={animal.value.toString()} key={animal.value}>
                          {animal.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Oficina</SelectLabel>
                      {animals.map((animal) => (
                        <SelectItem value={animal.value.toString()} key={animal.value}>
                          {animal.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Textarea placeholder="Enter your description" className="w-full" />

              <div {...getRootProps({ className: 'dropzone' })} className="p-3 border-2 border-dashed border-gray-600 my-10 cursor-pointer">
                <input {...getInputProps()} />
                <div className="flex items-center justify-center">
                  <UploadIcon fill="gray" height={22} width={22} style={{ marginRight: '.5rem' }} />
                  <p className="font-bold text-gray-600">Agrega tu cv aqui</p>
                </div>
              </div>
              <div>
                {myFiles.length > 0 &&
                  myFiles.map((file: any) => (
                    <div key={file.path} className="p-3">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center">
                          <UploadIcon fill="gray" height={22} width={22} />
                          <p>{file.path} </p>
                        </div>
                        <button onClick={removeFile(file)}>
                          <DeleteIcon fill="red" width={22} height={22} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="my-5 flex items-center justify-center">
                <Checkbox defaultChecked />
                <span className="text-sm">
                  He leido y acepto los
                  <Link href="/">terminos y condiciones</Link>
                </span>
              </div>

              <div className="flex justify-center">
                <Button className="bg-red-900 text-white">Enviar informacion</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
