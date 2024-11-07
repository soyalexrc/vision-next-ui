import { http } from '@/utils/axios';
import { GetDigitalSignatureRequestById } from '@/interfaces/digital-signature-request';
import { DigitalSignatureContent } from '@/firma-digital';

// TODO 1. Validar la solicitud (status en pendiente solamente y fecha de expiracion mayor a now)
// TODO 2. formulario de autenticacion para validar que sea el usuario
// TODO 3. Presentar el documento, y casilla de firma para completar el proceso
// TODO 4. Enviar el id de la peticion (tabla) y la imagen de la firma para ser procesada

export default async function DocumentSignature({ params }: { params: { id: string } }) {
  const { data }: { data: GetDigitalSignatureRequestById } = await http.get(`/files/getDigitalSignatureRequestById/${params.id}`);
  // const filePath = data.data?.filePath;

  return (
    <div>
      <DigitalSignatureContent data={data} />
    </div>
  );
}
