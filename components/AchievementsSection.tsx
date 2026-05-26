import GoldDivider from "./GoldDivider";

const achievements = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    tag: "子育て支援",
    title: "こども誰でも通園制度",
    description:
      "生後6ヶ月〜3歳未満のお子さんが月10時間まで保育施設を利用できる制度を推進。働いていない保護者の方も利用可能です。",
    budget: "629万円",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    tag: "健康・教育",
    title: "幼児健康診査の拡充",
    description:
      "1歳6ヶ月・3歳児健診を5歳まで拡充し、無料で実施。子どもの成長を切れ目なくサポートします。（2,039万円）",
    budget: "2,039万円",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    tag: "議会改革",
    title: "タブレット導入・ペーパーレス化",
    description:
      "議会へのタブレット端末導入を推進し、紙代替・コスト削減・議会運営の効率化を実現しました。",
    budget: null,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    tag: "子育て支援",
    title: "傍聴者向け託児サービス",
    description:
      "子育て中の市民が安心して市議会を傍聴できるよう、託児サービスを開始。誰でも参加しやすい議会を実現しました。",
    budget: null,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    tag: "次世代",
    title: "大学生インターン受け入れ",
    description:
      "2名の大学生インターン生を受け入れ、政治・社会の仕組みを学ぶ機会を提供。次世代の政治参加を促進しました。",
    budget: null,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    tag: "環境",
    title: "ペットボトル水平リサイクル",
    description:
      "市内で回収したペットボトルを再商品化する事業を推進。徳島市の環境への取り組みを強化しました。（3,061万円）",
    budget: "3,061万円",
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="bg-blue-light py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            主な実績・取り組み
          </p>
          <h2 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
            市民のために、動き続けています
          </h2>
          <GoldDivider />
          <p className="mt-2 max-w-lg text-sm leading-7 text-text-muted">
            子育て・教育・議会改革・環境など、さまざまな分野で市民の声を市政に反映してきました。
          </p>
        </div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Icon + tag */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-pale text-navy">
                  {item.icon}
                </div>
                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-navy leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-xs text-text-muted/60">
          ※ 予算額は令和6年度 徳島市定例会での提案・審議に基づく数値です
        </p>
      </div>
    </section>
  );
}
