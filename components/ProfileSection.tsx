import GoldDivider from "./GoldDivider";

const timeline = [
  { year: "1981年", event: "10月29日 鹿児島県奄美大島生まれ" },
  { year: "高校卒業後", event: "航空自衛隊に入隊" },
  { year: "移住", event: "結婚を機に徳島市へ" },
  { year: "2019年 4月", event: "徳島市議会議員 初当選", highlight: true },
  { year: "2023年 4月", event: "2期目 当選", highlight: true },
  { year: "2025年 3月", event: "徳島市議会 副議長 就任", highlight: true },
];

const values = [
  {
    icon: "👧",
    label: "子育て・教育",
    desc: "4人の子を持つ母として、子育て世代の声を代弁します",
  },
  {
    icon: "🏘️",
    label: "地域コミュニティ",
    desc: "地域行事・小学校 PTA活動に積極参加",
  },
  {
    icon: "🏛️",
    label: "オープンな市政",
    desc: "ペーパーレス化や託児サービスで、開かれた議会を推進",
  },
  {
    icon: "🌿",
    label: "環境・持続可能性",
    desc: "リサイクル推進など、次世代に美しい環境を残す",
  },
];

export default function ProfileSection() {
  return (
    <section id="profile" className="bg-white py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Profile
          </p>
          <h2 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
            プロフィール
          </h2>
          <GoldDivider />
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
          {/* Left: Bio */}
          <div>
            <h3 className="text-lg font-bold text-navy border-l-4 border-gold pl-4">
              基本情報
            </h3>
            <dl className="mt-5 space-y-3">
              {[
                { label: "氏名", value: "森本 さとこ（Morimoto Satoko）" },
                { label: "生年月日", value: "1981年10月29日" },
                { label: "出身地", value: "鹿児島県 奄美大島" },
                { label: "現住所", value: "徳島市" },
                { label: "家族", value: "4児の母（高2・中3・小6・小4）" },
                { label: "スポーツ", value: "バレーボール・剣道" },
                { label: "音楽", value: "THE BLUE HEARTS / あいみょん" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3 text-sm">
                  <dt className="w-24 flex-shrink-0 font-medium text-gold">{label}</dt>
                  <dd className="text-text-muted leading-6">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Values */}
            <h3 className="mt-10 text-lg font-bold text-navy border-l-4 border-gold pl-4">
              大切にしていること
            </h3>
            <ul className="mt-5 space-y-4">
              {values.map((v) => (
                <li key={v.label} className="flex items-start gap-3">
                  <span className="text-xl leading-none mt-0.5" aria-hidden="true">{v.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{v.label}</p>
                    <p className="text-sm text-text-muted leading-5 mt-0.5">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Timeline */}
          <div>
            <h3 className="text-lg font-bold text-navy border-l-4 border-gold pl-4">
              政治歴
            </h3>
            <ol className="mt-6 relative border-l border-navy/10 ml-2" aria-label="政治キャリア年表">
              {timeline.map((item, i) => (
                <li key={i} className="mb-8 ml-6">
                  <span
                    className={`absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white ${
                      item.highlight ? "bg-gold" : "bg-navy/20"
                    }`}
                    aria-hidden="true"
                  />
                  <time className="text-xs font-medium tracking-wider text-gold">
                    {item.year}
                  </time>
                  <p
                    className={`mt-0.5 text-sm leading-6 ${
                      item.highlight
                        ? "font-semibold text-navy"
                        : "text-text-muted"
                    }`}
                  >
                    {item.event}
                  </p>
                </li>
              ))}
            </ol>

            {/* Quote */}
            <blockquote className="mt-4 rounded-xl bg-blue-light p-5 border-l-4 border-gold">
              <p className="text-sm leading-7 text-text-muted italic">
                「子どもたちの笑顔が輝く徳島市をつくるために、これからも市民の皆さまとともに歩み続けてまいります。」
              </p>
              <footer className="mt-3 text-xs font-medium text-gold">
                — 森本さとこ
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
