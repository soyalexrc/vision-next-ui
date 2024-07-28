import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import { getDownloadURL, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';

// export const runtime = 'edge';

export async function GET(req: NextRequest) {
  let image = req.nextUrl.searchParams.get('image') ?? '';
  const title = req.nextUrl.searchParams.get('title') ?? '';
  if (image) {
    const code = image.split('/').find((i) => i.startsWith('VINM_'));
    image = image.split('imagenes')[1].split('?')[0];
    const imageRef = ref(storage, `Servicio Inmobiliario/inmuebles/${code}/imagenes/${image}`);
    image = await getDownloadURL(imageRef);
  }

  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full ">
          <img src={image} alt="" width="100%" height="80%" style={{ objectFit: 'cover' }} />
          <span tw="px-4">
            <p tw="text-4xl">{title}</p>
          </span>
        </div>
      ),
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
