import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { homePath } from "@/lib/paths";

export default function About() {
  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center">
      <Placeholder
        label="Coming Soon"
        button={
          <Button asChild variant="outline">
            <Link className="text-white hover:bg-blue-500" href={homePath()}>Return Home</Link>
          </Button>
        }
      />
    </div>
  );
}