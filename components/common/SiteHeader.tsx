import Link from "next/link";
import { Scissors } from "lucide-react";
import { ReactNode } from "react";

interface SiteHeaderProps {
  children?: ReactNode; // optional nav/actions rendered on the right
  mobileMenu?: ReactNode
}

export default function SiteHeader({ children, mobileMenu }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Scissors className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold text-foreground">
            SalonHost
          </span>
        </Link>
        {children}
      </div>
      {mobileMenu ?? <></>}
    </header>
  );
}