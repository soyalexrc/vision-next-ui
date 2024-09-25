import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FormSkeleton() {
  return (
    <div className="p-5">
      <Card className="w-full ">
        <CardHeader className="px-4 sm:px-6 lg:px-8">
          <CardTitle>
            <Skeleton className="h-8 w-3/4 max-w-2xl" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-3xl" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 max-w-xs" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 max-w-xs" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2 sm:col-span-2 lg:col-span-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 max-w-xs" />
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-1/4 max-w-xs" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-full max-w-md mx-auto" />
        </CardFooter>
      </Card>
    </div>
  );
}
