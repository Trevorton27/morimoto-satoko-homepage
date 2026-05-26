export default function SiteFooter() {
  return (
    <footer className="bg-navy py-10 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <p className="text-xs tracking-[0.3em] text-gold/70 font-light">徳島市議会議員</p>
            <p className="mt-1 text-xl font-bold tracking-[0.05em] text-white">森本さとこ</p>
            <p className="mt-2 text-sm font-light text-white/50 tracking-widest">
              「すべては子どもたちのために」
            </p>
          </div>

          {/* Office info */}
          <address className="not-italic text-sm text-white/50 text-center md:text-right leading-7">
            <p>森本さとこ後援会事務所</p>
            <p>〒770-8064 徳島市城南町3丁目2−20</p>
            <a href="tel:09031938738" className="hover:text-white/80 transition-colors">
              TEL: 090-3193-8738
            </a>
          </address>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <small className="text-xs text-white/30">
            © 2026 森本さとこ後援会. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
