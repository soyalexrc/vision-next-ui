import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-demand revalidation endpoint.
 *
 * Called by the backend (vision-hono) after a property is created, updated,
 * its status/featured flag changes, or it is deleted — so the public property
 * page reflects the change immediately instead of waiting for the time-based
 * `revalidate` window in inmuebles/[slug]/page.tsx.
 *
 * Auth: a shared secret in `process.env.REVALIDATE_SECRET`, sent either as the
 * `x-revalidate-secret` header or a `secret` field in the JSON body.
 *
 * Body: { slug?: string, secret?: string }
 *   - With `slug`: revalidates /inmuebles/<slug> + the listing page.
 *   - Without `slug`: revalidates only the listing page.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ revalidated: false, message: 'REVALIDATE_SECRET is not configured' }, { status: 500 });
  }

  let body: { slug?: string; secret?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty / invalid body is allowed — falls back to header auth + listing-only
  }

  const provided = req.headers.get('x-revalidate-secret') ?? body.secret;

  if (provided !== secret) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }

  const revalidated: string[] = [];

  if (body.slug && body.slug.trim() !== '') {
    const path = `/inmuebles/${body.slug.trim()}`;
    revalidatePath(path);
    revalidated.push(path);
  }

  // Always refresh the listing so price/status changes show up there too.
  revalidatePath('/inmuebles');
  revalidated.push('/inmuebles');

  return NextResponse.json({ revalidated: true, paths: revalidated });
}
