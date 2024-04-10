// type ResponseData = {
//   valid: boolean;
//   message: string;
// };
export default async function POST(req: Response) {
  const baseUrl = process.env.URL_BACKEND;

  const responseValidation = await fetch(`${baseUrl}/files/validateUserForSignatureAuthorization`, {
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
