import { clerkClient, clerkMiddleware, createRouteMatcher, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import {NextURL} from "next/dist/server/web/next-url";

type Route = { path: string; title: string };

const isProtectedRoute = createRouteMatcher(['/administracion(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();
    if (userId) {
      const user = await clerkClient.users.getUser(userId);
      const routes: Route[] = user.publicMetadata.allowedRoutes as Route[];
      if (routes.find((route) => req.nextUrl.pathname.includes(route.path))) {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL(routes[0].path, req.url));
      }
    }
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
