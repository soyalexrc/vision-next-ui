// type ResponseData = {
//   data: any;
//   message: string;
// };

import axios from 'axios';

export async function POST(req: Request) {
  const baseUrl = process.env.URL_BACKEND;
  const data = await req.json();

  const responseValidation = await axios.post(`${baseUrl}/files/sendDigitalSignature`, data);

  const jsonResponseValidation = await responseValidation.data;
  return Response.json(jsonResponseValidation, { status: 200 });
}
