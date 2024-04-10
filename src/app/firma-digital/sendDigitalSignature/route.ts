// type ResponseData = {
//   data: any;
//   message: string;
// };

export default async function POST(req: Request) {
  const baseUrl = process.env.URL_BACKEND;

  const responseValidation = await fetch(`${baseUrl}/files/sendDigitalSignature`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(req.body),
  });

  const jsonResponseValidation = await responseValidation.json();
  return Response.json(jsonResponseValidation, { status: 200 });
}
