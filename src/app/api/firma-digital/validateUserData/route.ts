// type ResponseData = {
//   valid: boolean;
//   message: string;
// };

import {NextResponse} from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const baseUrl = process.env.URL_BACKEND;
  const data = await req.json();

  console.log('here', data);

  const responseValidation = await axios.post(`${baseUrl}/files/validateUserForSignatureAuthorization`, data);

  const jsonResponseValidation = await responseValidation.data;
  return NextResponse.json(jsonResponseValidation, { status: 200 });
}
