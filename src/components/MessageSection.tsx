import type { propsTheme } from "../utils/theme";
import type { DedicationData } from "../utils/postMessageData";

export default function MessageSection({
  theme,
  customText,
}: propsTheme & {
  customText?: DedicationData["customText"];
}) {
  return (
    <section className={`relative py-16 px-4 ${theme.colorBgMessage} min-h-screen min-w-full flex items-center justify-center`}>
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-5 text-6xl md:text-8xl text-rose-100 opacity-60">
        ❝
      </div>
      <div className="absolute bottom-10 right-5 text-6xl md:text-8xl text-amber-200 opacity-60 rotate-180">
        ❝
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className={`section-title relative text-3xl md:text-4xl font-bold text-center mb-10 text-white shadow-sm transition-all duration-700`}
        >
          {customText?.title_message || "Mensagem dos Papais"}
        </h2>

        <div
          className={`bg-[#1f2937] rounded-2xl p-6 md:p-10 shadow-lg relative transition-all duration-700 delay-150 `}
        >
          <div className="absolute -top-4 -left-2 md:-top-6 md:-left-4 text-5xl md:text-7xl text-rose-300 opacity-80">
            “
          </div>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed md:leading-loose mb-6 md:mb-8 relative z-10">
            { customText?.message || "Querida Sophia, desde o momento em que descobrimos que você estava a caminho, nossos corações se encheram de amor e esperança. Cada ultrassom, cada chute, cada movimento era uma emoção nova. Agora, com você em nossos braços, entendemos o verdadeiro significado do amor incondicional. Que sua vida seja repleta de saúde, alegria e descobertas. Amamos você mais do que palavras podem expressar!"}
          </p>

          <div className="flex items-center justify-end">
            <div
              className={`${
                theme.sex === "F"
                  ? "w-10 h-0.5 bg-rose-300 mr-3"
                  : "w-10 h-0.5 bg-sky-300 mr-3"
              }`}
            ></div>
            <p
              className={`${
                theme.sex === "F" ? "text-[#f9a8d4]" : "text-[#3be2ff]"
              } font-semibold text-base md:text-lg`}
            >
              {customText?.assign || "Mamãe e Papai"}
            </p>
          </div>
        </div>

        {/* Elemento decorativo adicional */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-amber-200 opacity-20"></div>
      </div>
    </section>
  );
}
