'use client';

import Snackbar from '@/components/Snackbar';
import Image from 'next/image';
// import Link from 'next/link';
import Stepper from '@/components/Stepper';
import SignatureCanvas from 'react-signature-canvas';
import { useRef, useState } from 'react';
import { http } from '@/utils/axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Inputs = {
  last4PhoneDigits: string;
  lastname: string;
  ci: string;
};

type SnackbarState = {
  show: boolean;
  variant: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
};

interface Props {
  data: any;
}

export function DigitalSignatureContent({ data }: Props) {
  const sigCanvas = useRef<any>(null);
  const [signatureURL, setSignatureURL] = useState<string>('');
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState<number>(1);
  // const [signedDocument, setSignedDocument] = useState<string>('');
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    show: false,
    variant: 'info',
    title: '',
    message: '',
  });
  // const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await validateUserData(data);
  };
  console.log(errors);

  const save = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignatureURL(URL);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignatureURL('');
  };

  // const sendDigitalSign = async () => {
  //   try {
  //     setLoading(true);
  //
  //     const response = await http.post('/api/firma-digital/sendDigitalSignature', {
  //       digitalSignature: signatureURL,
  //       digitalSignatureRequestId: data.data.id,
  //     });
  //     // onClose();
  //     setLoading(false);
  //
  //     if (!response.data.error) {
  //       setCurrentStep(3);
  //       setSnackbarState({
  //         show: true,
  //         variant: 'success',
  //         title: 'Se completo el proceso con exito',
  //         message: `Aqui abajo puedes descargar el documento actualizado con tu firma digital. De igual manera puedes pedirlo cuando quieras a a nuestros asesores bajo el numero de identificaion: ${data.data.id}`,
  //       });
  //       setSignedDocument(response.data.data.signedDocumentURL);
  //       //     mensaje de exito
  //     } else {
  //       //     mensaje de error
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  const validateUserData = async (formValues: Inputs) => {
    const payload = {
      ...formValues,
      userId: data.user.id.toString(),
    };
    const responseValidation = await http.post('/api/firma-digital/validateUserData', payload);
    if (responseValidation.data.error) {
      setSnackbarState({
        show: true,
        title: 'Error de validacion de datos',
        variant: 'error',
        message: responseValidation.data.message,
      });
    } else {
      setSnackbarState({
        show: true,
        title: 'Validacion de datos exitosa',
        variant: 'success',
        message: 'Por favor, continua con la firma para culminar el proceso.',
      });
      setTimeout(() => {
        resetSnackbarState();
      }, 2000);
      setCurrentStep(2);
    }
  };

  if (data.error) {
    return (
      <main className={`min-h-screen p-5 lg:p-10 `}>
        <Snackbar title="Ocurrio un error" variant="error" close={() => {}} message={data.message!} />

        <div className="image-container">
          <Image className="image mt-20" src="/error.jpg" fill={true} alt="Imagen de error" />
        </div>

        <div className="flex justify-center mt-20">
          <Button color="primary">Regresar</Button>
        </div>
      </main>
    );
  }

  const resetSnackbarState = () =>
    setSnackbarState({
      show: false,
      variant: 'info',
      title: '',
      message: '',
    });

  return (
    <main className={`min-h-screen`}>
      <Stepper currentStep={currentStep} steps={['Validacion de datos', 'Firma digital', 'Proceso completado']} />
      {snackbarState.show && (
        <Snackbar close={resetSnackbarState} variant={snackbarState.variant} title={snackbarState.title} message={snackbarState.message} />
      )}
      <div className="px-5 lg:px-20 py-10 mt-20">
        {currentStep === 1 && (
          <div className="flex flex-col justify-center items-center">
            {/*<p>formulario</p>*/}
            {/*<p>Ultimos 4 digitos de numero de telefono registrado que inicia en ***</p>*/}
            {/*<p>Cedula de identidad</p>*/}
            {/*<p>Apellido que inicia con ***</p>*/}
            <h2 className="text-xl mb-8">Por favor completa el siguiente formulario para validar tus datos </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-lg">
              <Input
                type="text"
                placeholder="Ultimos 4 digitos de telefono"
                // description={`De tu numero que inicia en ${data.user.phone.substring(0, 6)}...`}
                {...register('last4PhoneDigits', { required: true, maxLength: 4 })}
                // errorMessage={
                //   errors.last4PhoneDigits?.type === 'required' ? (
                //     <span className="text-red-600">Este campo es requerido</span>
                //   ) : (
                //     errors.last4PhoneDigits?.type === 'maxLength' && <span className="text-red-600">Maximo 4 digitos</span>
                //   )
                // }
              />
              <Input
                type="text"
                placeholder="Apellido"
                // description={`Que inicia en ${data.user?.lastName.substring(0, 2)}...`}
                // errorMessage={errors.lastname && <span className="text-red-600">Este campo es requerido</span>}
                {...register('lastname', { required: true })}
              />
              <Input
                type="text"
                placeholder="Cedula de identidad"
                // description={`Que inicia en ${data.user.ci.substring(0, 2)}...`}
                {...register('ci', { required: true })}
                // errorMessage={errors.ci && <span className="text-red-600">Este campo es requerido</span>}
              />

              <Button type="submit" color="primary" disabled={!isValid}>
                {isSubmitting ? 'Validando informacion' : 'Siguiente'}
              </Button>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-col items-center gap-5">
            <a href={data.data?.filePath} target="_blank">
              <Button color="primary" className="mb-5">
                Ver documento original
              </Button>
            </a>
            <p>A continuacion, provee tu firma digital</p>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              onEnd={save}
              canvasProps={{
                width: 300,
                height: 150,
                className: 'sigCanvas',
              }}
            />

            <div className="flex gap-3">
              <Button onClick={clearSignature}>Limpiar campo de firma</Button>

              <Button disabled={!signatureURL}>Continuar</Button>
            </div>
            {/*<Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>*/}
            {/*  <ModalContent>*/}
            {/*    {(onClose) => (*/}
            {/*      <>*/}
            {/*        <ModalHeader className="flex flex-col gap-1">Confirmar</ModalHeader>*/}
            {/*        <ModalBody>*/}
            {/*          <p>La siguiente imagen representa la firma previamente guardada, estas conforme?</p>*/}
            {/*          {signatureURL && (*/}
            {/*            <div className="flex justify-center max-h-48">*/}
            {/*              <Image width={250} height={200} src={signatureURL} alt="firma digital canvas svg" />*/}
            {/*            </div>*/}
            {/*          )}*/}
            {/*        </ModalBody>*/}
            {/*        <ModalFooter>*/}
            {/*          <Button color="danger" variant="light" onPress={onClose}>*/}
            {/*            Cancelar*/}
            {/*          </Button>*/}
            {/*          <Button color="primary" isLoading={loading} onPress={sendDigitalSign}>*/}
            {/*            {loading ? 'Enviando firma...' : 'Confirmar'}*/}
            {/*          </Button>*/}
            {/*        </ModalFooter>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </ModalContent>*/}
            {/*</Modal>*/}
          </div>
        )}
        {currentStep === 3 && (
          <div className="flex justify-center gap-10">
            <Button color="primary">Volver</Button>
            <a target="_blank">
              <Button color="primary">Descargar documento firmado</Button>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
