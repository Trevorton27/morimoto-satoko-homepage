import GoldDivider from "./GoldDivider";

export default function MessageSection() {
  return (
    <section id="message" className="bg-white py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Photo placeholder */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="h-72 w-56 rounded-2xl bg-blue-light md:h-80 md:w-64 overflow-hidden flex items-end justify-center"
                   style={{ background: "linear-gradient(160deg, #e8f0f8, #d0e2f0)" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy/30">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-xs tracking-widest">森本さとこ</span>
                </div>
              </div>
              {/* Decorative frame accent */}
              <div className="absolute -bottom-3 -right-3 h-72 w-56 rounded-2xl border-2 border-gold/30 md:h-80 md:w-64 -z-10" aria-hidden="true" />
            </div>
          </div>

          {/* Message text */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              ご挨拶
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
              市民の皆さまへ
            </h2>
            <GoldDivider align="left" />

            <div className="mt-2 space-y-4 text-base leading-8 text-text-muted">
              <p>
                議会議員として活動を始めてから、間もなく7年が経過しようとしています。
                「子どもたちを安やかに守っていくことこそが、徳島市にとって最優先の課題である」——
                この強い決意を胸に、「すべては子どもたちのために」という信念を持って市政の場へ飛び込んだあの日から、片時も初心を忘れることなく活動を続けてまいりました。
              </p>
              <p>
                子育て中のお母さんとして、4人の子どもたちの成長を傍らで見守りながら、
                地域の皆さまが安心して暮らせる徳島市をつくるために全力を尽くしてまいります。
              </p>
              <p>
                皆さまのおひとりおひとりの声が、市政を動かす力になります。
                どうぞ、お気軽にご意見・ご相談をお寄せください。
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="text-xs tracking-widest text-gold font-medium">徳島市議会議員</p>
                <p className="text-xl font-bold text-navy mt-1">森本さとこ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
