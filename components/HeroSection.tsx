export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
      style={{
        background: "linear-gradient(160deg, #0d2340 0%, #1a3a5c 50%, #1e4a74 100%)",
      }}
    >
      {/* Subtle wave pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative side accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-3xl">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
          <span className="text-xs tracking-[0.2em] text-gold/90 font-light">
            徳島市議会議員 2期目
          </span>
        </div>

        {/* Main name */}
        <h1 className="text-5xl font-bold tracking-[0.05em] text-white md:text-7xl">
          森本さとこ
        </h1>

        {/* Furigana / romanization */}
        <p className="mt-2 text-sm tracking-[0.3em] text-white/50 font-light">
          MORIMOTO  SATOKO
        </p>

        {/* Divider */}
        <div className="my-7 flex items-center gap-3" aria-hidden="true">
          <div className="h-px w-12 bg-gold/60" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <div className="h-px w-12 bg-gold/60" />
        </div>

        {/* Slogan */}
        <p className="text-xl font-medium tracking-[0.08em] text-gold md:text-2xl">
          「すべては子どもたちのために」
        </p>

        {/* Tagline */}
        <p className="mt-4 max-w-md text-sm leading-7 text-white/60 font-light md:text-base">
          子育て・教育・地域の安心を守るために。<br />
          市民の声を市政に届ける、頼れる議員です。
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#message"
            className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold tracking-wider text-navy-dark transition-all duration-150 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20"
          >
            メッセージを読む
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-medium tracking-wider text-white/80 transition-all duration-150 hover:border-white/60 hover:text-white"
          >
            お問い合わせ
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl divide-x divide-white/10">
          {[
            { value: "2期目", label: "市議会議員" },
            { value: "副議長", label: "歴任" },
            { value: "4児", label: "の母" },
            { value: "2019年", label: "初当選" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-1 flex-col items-center py-4 px-2">
              <span className="text-lg font-bold text-gold">{stat.value}</span>
              <span className="text-xs text-white/50 mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 right-8 hidden md:flex flex-col items-center gap-2">
        <div className="animate-bob">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <span className="text-[10px] tracking-widest text-white/30 [writing-mode:vertical-rl]">SCROLL</span>
      </div>
    </section>
  );
}
