import {GetServerSideProps} from "next";
import SignatureCanvas from 'react-signature-canvas'
import {useRef, useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import MultiPagePDFViewer from "@/components/pdf/MultiPagePDFViewer";

const url = 'http://100.42.69.119:3000/api/v1/files/genericStaticFileAsset/servicio-inmobiliario+propiedades+VINM-001+documentos+Ficha_Te%C3%8C%C2%81cnica_Visio%C3%8C%C2%81n_Inmobiliaria_VINM_2023-09-26T04:21:05.pdf';




export default function DocumentSignature() {
    const sigCanvas = useRef<any>();
    const [signatureURL, setSignatureURL] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const save = () => {
        const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
        setSignatureURL(URL);
    }

    return (
        <div>
            hello there
            <Button onPress={onOpen}>Open modal</Button>
            {/*<MultiPagePDFViewer pdfUrl='https://www.orimi.com/pdf-test.pdf' />*/}
            <SignatureCanvas
                ref={sigCanvas}
                penColor='black'
                canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'sigCanvas'
            }} />

            <Button onClick={() => sigCanvas.current.clear()}>
                clear
            </Button>

            <Button onClick={save}>
                save
            </Button>

            {
                signatureURL &&
                <img src={signatureURL} alt="firma digital canvas svg"/>
            }
            <Modal size='full' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <iframe src={url} width='100%' height='100%' style={{ minHeight: '500px' }} loading='lazy'></iframe>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        // redirect: {
        //     permanent: false,
        //     destination: '/'
        // },
        props: {}
    }
}
