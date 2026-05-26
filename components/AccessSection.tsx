import GoldDivider from "./GoldDivider";

export default function AccessSection() {
  return (
    <section id="access" className="bg-cream py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-2xl font-light tracking-[0.1em] text-navy lg:text-3xl">
            アクセス
          </h2>
          <GoldDivider />
          <p className="mt-2 text-sm text-navy/60">
            お気軽にお越しください
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          {/* Address block */}
          <address className="not-italic">
            <dl className="space-y-6">
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-gold">
                  住所
                </dt>
                <dd className="mt-1 text-base text-navy">
                  〒770-8064<br />
                  徳島市城南町3丁目2−20
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-gold">
                  電話
                </dt>
                <dd className="mt-1 text-base text-navy">
                  <a
                    href="tel:09031938738"
                    className="hover:text-gold transition-colors duration-150"
                  >
                    090-3193-8738
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-gold">
                  営業時間
                </dt>
                <dd className="mt-1 space-y-1 text-sm text-navy">
                  <p>月〜金: 11:30〜14:00 / 17:30〜22:00</p>
                  <p>土・日・祝: 11:30〜22:00（通し営業）</p>
                  <p className="mt-2 text-navy/60">定休日: 毎週水曜日</p>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-gold">
                  メール
                </dt>
                <dd className="mt-1 text-base text-navy">
                  <a
                    href="mailto:satokomorimoto55@gmail.com"
                    className="hover:text-gold transition-colors duration-150 break-all"
                  >
                    satokomorimoto55@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </address>

          {/* Map placeholder */}
          <div
            className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-navy/30 bg-white"
            role="img"
            aria-label="地図表示エリア（Googleマップを表示予定）"
          >
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <p className="text-sm text-navy/50">Googleマップを表示予定</p>
              <p className="text-xs text-navy/40">徳島市城南町3丁目2−20</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
