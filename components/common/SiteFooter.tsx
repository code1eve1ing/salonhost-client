interface SiteFooterProps {
    variant?: "default" | "absolute";
  }
  
  export default function SiteFooter({ variant = "default" }: SiteFooterProps) {
    return (
      <footer
        className={`border-t border-border py-8 ${
          variant === "absolute" ? "absolute bottom-0 left-0 right-0" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 text-sm text-muted-foreground md:px-6">
          <p>© 2026 SalonHost.</p>
        </div>
      </footer>
    );
  }