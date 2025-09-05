import type { propsTheme } from "../utils/theme";
import type { DedicationData } from "../utils/postMessageData";
import { format } from "date-fns";

const formatDate = (date: string | undefined) => {
  if (!date) return "—";
  return format(new Date(date), "dd/MM/yyyy");
};

export default function TimelineSection({
  theme,
  customText,
  basic,
}: propsTheme & {
  customText?: DedicationData["customText"];
  basic?: DedicationData["basic"];
}) {
  const timeline = [
    {
      date: `${formatDate(basic?.data_pregnancy) || "-"}`,
      text: "Descoberta da gravidez - o dia mais feliz das nossas vidas!",
    },
    {
      date: `${formatDate(basic?.data_ultrasound) || "-"}`,
      text: "Primeiro ultrassom - ouvimos seu coraçãozinho bater pela primeira vez.",
    },
    {
      date: `${formatDate(basic?.data_sex) || "-"}`,
      text: `Descobrimos que seria ${theme.sex === "F" ? "uma linda menininha" : "um lindo menininho"} - começo dos preparativos!`,
    },
    {
      date: `${formatDate(basic?.data_nascimento) || "-"}`,
      text: `Nascimento ${theme.sex === "F" ? "da nossa princesa" : "do nosso príncipe"}  ${basic?.nome_baby || "-"} - o dia mais especial de todos!`,
    },
  ];

  return (
    <section
      className={`timeline-section py-6 px-4 ${theme.gradientLow} min-h-screen min-w-full flex flex-col items-center justify-center`}
    >
      <h2 className="section-title text-4xl md:text-4xl font-bold text-center mb-10 text-gray-800 transition-all">
        {customText?.title_journey || "Nossa Jornada"}
      </h2>

      {/* Container com scroll interno */}
      <div className="timeline-container max-w-4xl max-h-[80dvh] overflow-y-auto mx-auto relative w-full px-4">
        {/* Wrapper que cresce com os itens da timeline */}
        <div className="relative w-full">
          {/* Linha vertical central (desktop) */}
          <div
            className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-1 h-full ${theme.colorBg}`}
          ></div>

          {/* Linha vertical lateral (mobile) */}
          <div
            className={`block md:hidden absolute left-3.5 top-0 w-1 h-full ${theme.colorBg}`}
          ></div>

          {/* Lista de eventos */}
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className={`flex md:justify-center transition-all duration-700 delay-${
                  idx * 150
                } ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Ponto na linha */}
                <div className="flex flex-col items-center mr-4 md:mr-0">
                  <div
                    className={`w-8 h-8 rounded-full ${theme.colorBg} border-4 border-white shadow-lg z-10`}
                  ></div>
                </div>

                {/* Conteúdo */}
                <div
                  className={`bg-gray-700 p-4 rounded-xl shadow-md max-w-md z-10 ${
                    idx % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  } flex-1`}
                >
                  <div className={`${theme.primary} font-bold text-lg mb-2`}>
                    {item.date}
                  </div>
                  <p className="text-white/80 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
