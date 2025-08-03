export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-6 text-center text-sm text-muted-foreground">
      <div className="container px-4 md:px-6">&copy; {new Date().getFullYear()} PharmaStore. All rights reserved.</div>
    </footer>
  )
}
