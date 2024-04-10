import { revalidatePath } from 'next/cache';
import {NextApiRequest} from "next";

type Params = {
  secret: string;
};

export async function POST(req: NextApiRequest, context: { params: Params }) {
  // Check for secret to confirm this is a valid request
  console.log(context.params.secret);
  console.log(process.env.SECRET_REVALIDATE_TOKEN);

  console.log(context.params.secret === process.env.SECRET_REVALIDATE_TOKEN);
  if (context.params.secret !== process.env.SECRET_REVALIDATE_TOKEN) {
    return Response.json(
      {
        message: 'Invalid token',
      },
      { status: 401 },
    );
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    revalidatePath(req.body?.path);
    return Response.json({ revalidated: true }, { status: 200 });
  } catch (err) {
    return Response.json(
      {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        message: 'Error revalidating',
      },
      {
        status: 500,
      },
    );
  }
}
