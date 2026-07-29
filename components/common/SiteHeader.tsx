import Link from "next/link";
import { Scissors } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";

interface SiteHeaderProps {
  children?: ReactNode; // optional nav/actions rendered on the right
  mobileMenu?: ReactNode
}


export default function SiteHeader({ children, mobileMenu }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* // TODO: remove background from logo, favicon  */}
          <Image
            src="/logo.png"
            alt="Company Logo"
            height={42.5}
            width={170}
          />
        </Link>
        {children}
      </div>
      {mobileMenu ?? <></>}
    </header>
  );
}