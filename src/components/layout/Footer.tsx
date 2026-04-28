import Divider from "@/components/ui/Divider";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <Divider variant="meander" className="mx-auto max-w-5xl px-6" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-center md:flex-row md:text-left">
        <span className="font-display text-sm tracking-[0.2em] text-parchment/50">
          ARCHAION
        </span>
        <span className="text-xs text-parchment/40">
          Usman Tahir &ndash; EHU 2026
        </span>
      </div>
    </footer>
  );
}
