import GoldDivider from "./GoldDivider";

export default function AboutSection() {
  return (
    <section id="about" className="bg-navy py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Decorative column */}
          <div
            className="hidden md:flex items-center justify-center"
            aria-hidden="true"
          >
            <span
              className="select-none text-[12rem] font-bold leading-none text-gold/10"
              style={{ letterSpacing: "-0.05em" }}
            >
              誠
            </span>
          </div>

          {/* Text column */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="text-2xl font-light tracking-[0.1em] text-gold lg:text-3xl">
              店について
            </h2>
            <GoldDivider />

            <p className="mt-4 text-base leading-8 text-white/80">
              当店は、徳島の豊かな食文化を大切にしながら、地元の食材を使った心温まる料理をお届けしております。
            </p>
            <p className="mt-4 text-base leading-8 text-white/70">
              阿波の国の恵みを、ひと皿ひと皿に込めて。四季折々の味わいをどうぞお楽しみください。鳴門のわかめ、徳島産すだち、阿波尾鶏など、地元が誇る食材を余すことなく活かした料理をご提供いたします。
            </p>
            <p className="mt-4 text-base leading-8 text-white/70">
              地域の皆さまに愛され続ける場所として、これからも誠実な料理と温かいおもてなしを大切にしてまいります。
            </p>

            <div className="mt-8 border-b border-gold pb-1">
              <span className="text-sm tracking-[0.2em] text-gold">
                森本さとこ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
