import {GetServerSideProps} from "next";
import SignatureCanvas from 'react-signature-canvas'
import {useRef, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
} from "@nextui-org/react";
import {Inter} from "next/font/google";
import Stepper from "@/components/Stepper";
import {useForm, SubmitHandler} from 'react-hook-form';
import {http} from "@/utils/axios";
import {DigitalSignatureRequest} from "@/interfaces/digital-signature-request";
import Image from "next/image";
import {sleep} from "@/utils/delay";

const inter = Inter({subsets: ['latin']})

const url = 'http://100.42.69.119:3000/api/v1/files/genericStaticFileAsset/servicio-inmobiliario+propiedades+VINM-001+documentos+Ficha_Te%C3%8C%C2%81cnica_Visio%C3%8C%C2%81n_Inmobiliaria_VINM_2023-09-26T04:21:05.pdf';

// TODO 1. Validar la solicitud (status en pendiente solamente y fecha de expiracion mayor a now)
// TODO 2. formulario de autenticacion para validar que sea el usuario
// TODO 3. Presentar el documento, y casilla de firma para completar el proceso
// TODO 4. Enviar el id de la peticion (tabla) y la imagen de la firma para ser procesada

type Inputs = {
    last4PhoneDigits: string;
    lastname: string;
    ci: string;
}

export default function DocumentSignature(props: { data: DigitalSignatureRequest }) {
    const {data} = props;
    const {
        register,
        handleSubmit,
        formState: {errors, isLoading, isValid, isSubmitting},
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        await validateUserData(data)
    }

    console.log(isSubmitting);

    const sigCanvas = useRef<any>();
    const [signatureURL, setSignatureURL] = useState<string>('');
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const save = () => {
        const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
        setSignatureURL(URL);
    }

    const clearSignature = () => {
        sigCanvas.current.clear();
        setSignatureURL('');
    }
    const validateUserData = async (data: Inputs) => {
        console.log(data);
        await sleep(5000);
        setCurrentStep(2);
    }

    const sendDigitalSign = () => {
        onClose();
    }

    return (
        <main
            className={`min-h-screen  ${inter.className}`}
        >
            <Stepper currentStep={currentStep} steps={['Validacion de datos', 'Firma digital']}/>
            <div className='px-5 lg:px-20 py-10'>
                {
                    currentStep === 1 &&
                    <div className='flex flex-col justify-center items-center'>
                        {/*<p>formulario</p>*/}
                        {/*<p>Ultimos 4 digitos de numero de telefono registrado que inicia en ***</p>*/}
                        {/*<p>Cedula de identidad</p>*/}
                        {/*<p>Apellido que inicia con ***</p>*/}
                        <h2 className='text-xl mb-8'>Por favor completa el siguiente formulario para validar tus datos </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full max-w-lg'>
                            <Input
                                size='sm'
                                variant='bordered'
                                type="text"
                                label="Ultimos 4 digitos de telefono"
                                description='De tu numero que inicia en 0414 - 482...'
                                { ...register('last4PhoneDigits', {required : true, maxLength: 4}) }
                                errorMessage={errors.last4PhoneDigits?.type === 'required' ? <span className='text-red-600'>Este campo es requerido</span> : errors.last4PhoneDigits?.type === 'maxLength' && <span className='text-red-600'>Maximo 4 digitos</span>}
                            />
                            <Input
                                size='sm'
                                variant='bordered'
                                type="text"
                                label="Apellido"
                                description='Que inicia en Ro...'
                                errorMessage={errors.lastname && <span className='text-red-600'>Este campo es requerido</span>}
                                { ...register('lastname', {required : true}) }
                            />
                            <Input
                                size='sm'
                                variant='bordered'
                                type="text"
                                label="Cedula de identidad"
                                placeholder='Numero de cedula de identidad'
                                { ...register('ci', {required : true}) }
                                errorMessage={errors.ci && <span className='text-red-600'>Este campo es requerido</span>}
                            />

                            <Button type='submit' isLoading={isSubmitting} isDisabled={!isValid}>{isSubmitting ? 'Validando informacion' : 'Siguiente'}</Button>
                        </form>
                    </div>
                }
                {
                    currentStep === 2 &&
                    <div className='flex flex-col items-center gap-5'>
                        <a href={url} target='_blank'>
                            <Button color='primary' className='mb-5'>
                                Ver documento original
                            </Button>
                        </a>
                        <p>A continuacion, provee tu firma digital</p>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor='black'
                            onEnd={save}
                            canvasProps={{
                                width: 300,
                                height: 150,
                                className: 'sigCanvas'
                            }}/>

                        <div className='flex gap-3'>
                            <Button onClick={clearSignature}>
                                Limpiar campo de firma
                            </Button>

                            <Button onClick={onOpen} isDisabled={!signatureURL}>
                                Continuar
                            </Button>
                        </div>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Confirmar</ModalHeader>
                                        <ModalBody>
                                            <p>
                                                La siguiente imagen representa la firma previamente guardada, estas conforme?
                                           </p>
                                            {
                                                signatureURL &&
                                                <div className='flex justify-center'>
                                                    <Image  width={280} height={280} src={signatureURL} alt="firma digital canvas svg"/>
                                                </div>
                                            }


                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cancelar
                                            </Button>
                                            <Button color="primary" onPress={sendDigitalSign}>
                                                Confirmar
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                }
            </div>


        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}: any) => {
    console.log(params.id);
    const request = await http.get(`/files/getDigitalSignatureRequestById/${params.id}`)

    return {
        // redirect: {
        //     permanent: false,
        //     destination: '/'
        // },
        props: {
            data: request.data
        }
    }
}
