export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground text-center">
        <p>
          © {new Date().getFullYear()} Acme. Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors font-medium"
          >
            Next.js
          </a>
          {", "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors font-medium"
          >
            shadcn/ui
          </a>
          {", "}
          and{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors font-medium"
          >
            Tailwind CSS
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
