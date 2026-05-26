export default function GoldDivider({ align = "center" }: { align?: "left" | "center" }) {
  return (
    <div
      className={`flex items-center gap-2 my-4 ${align === "left" ? "justify-start" : "justify-center"}`}
      aria-hidden="true"
    >
      <div className="h-px w-10 bg-gold" />
      <div className="w-2 h-2 bg-gold rotate-45 flex-shrink-0" />
      <div className="h-px w-10 bg-gold" />
    </div>
  );
}
