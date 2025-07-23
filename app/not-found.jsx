import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center container mx-auto justify-center space-y-3">
      <h1 className="text-7xl font-extrabold text-center">404</h1>
      <h2 className="text-3xl font-extrabold text-center">Page Not Found</h2>
      <p className="text-muted-foreground text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <p className="text-muted-foreground text-center">
        Fun fact: Shinkai (深海) is a Japanese word that means "deep sea." 🌊
      </p>

      <Button asChild>
        <Link className="text-center" href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
