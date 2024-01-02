import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  valid: boolean;
  message: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const baseUrl = process.env.URL_BACKEND;

  if (req.method === 'POST') {
    const responseValidation = await fetch(`${baseUrl}/files/validateUserForSignatureAuthorization`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(req.body),
    });

    const jsonResponseValidation = await responseValidation.json();
    res.status(200).json(jsonResponseValidation);
  }
}
