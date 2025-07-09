import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-6xl mb-4">404</CardTitle>
          <p className="text-xl text-muted-foreground">Pokemon Not Found</p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            The Pokemon you're looking for seems to have escaped!
          </p>
          <Link href="/">
            <Button>Return to Explorer</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
