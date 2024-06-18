'use client';
import { Button, Checkbox, Input, Link, Select, SelectItem, Textarea } from '@nextui-org/react';
import NextLink from 'next/link';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { DeleteIcon, UploadIcon } from '@/components/icons';

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
              <Input size="sm" type="text" label="Nombre" />

              <div className="grid gap-4 grid-cols-2 my-5">
                <Input size="sm" type="email" label="Email" />
                <Input size="sm" type="tel" label="Telefono" />
              </div>

              <h2 className="text-2xl my-10">Estoy interesado en </h2>

              <div className="grid gap-4 grid-cols-2 my-5">
                <Select size="sm" label="Rol / Posicion">
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select size="sm" label="Oficina">
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Textarea minRows={5} label="Mensaje" labelPlacement="outside" placeholder="Enter your description" className="w-full" />

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
                <Checkbox defaultSelected />
                <span className="text-sm">
                  He leido y acepto los{' '}
                  <Link underline="always" as={NextLink} href="/">
                    terminos y condiciones
                  </Link>
                </span>
              </div>

              <div className="flex justify-center">
                <Button size="lg" className="bg-red-900 text-white">
                  Enviar informacion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
