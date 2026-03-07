export function Footer() {
  return (
    <footer className="w-full py-8 text-center border-t-2 border-aura-foreground/10 mt-20 relative z-20">
      <p className="font-sans font-medium text-aura-foreground/60">
        © {new Date().getFullYear()} Izzy. Built with creative chaos.
      </p>
    </footer>
  );
}
