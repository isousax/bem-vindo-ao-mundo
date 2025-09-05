import type { DedicationData } from "../utils/postMessageData"; 
import type { propsTheme } from "../utils/theme";
import { motion } from "framer-motion";
import { FaMusic, FaBaby } from "react-icons/fa";

export default function MusicSection({
  theme,
  music,
  customText,
}: propsTheme & {
  music?: DedicationData["music"];
    customText?: DedicationData["customText"];
}) {
  const youtubeLink = music?.url?.replace("watch?v=", "embed/") || "";
  const title = customText?.music_phrase || "Uma canção especial para nosso bebê";
  const description = customText?.music_description || "Dê play e deixe a melodia acompanhar este momento único";

  return (
    <section
      className="relative h-full flex items-center justify-center text-center overflow-hidden py-6"
      style={{
        background:
          theme.sex === "F"
            ? "linear-gradient(135deg, #ffd6e7 0%, #ffefef 50%, #ffffff 100%)"
            : "linear-gradient(135deg, #d6eaff 0%, #eff5ff 50%, #ffffff 100%)",
      }}
    >
      {/* Elementos decorativos: escondidos em telas pequenas */}
      <div className="absolute top-[2%] sm:top-10 left-10 opacity-20 sm:block pointer-events-none">
        <FaBaby className={`text-6xl md:text-7xl ${theme.primary}`} />
      </div>

      <div className="absolute bottom-[2%] sm:bottom-10 right-10 opacity-20 sm:block pointer-events-none">
        <FaMusic className={`text-6xl md:text-7xl ${theme.primary}`} />
      </div>

      {/* Bolinhas flutuantes (pequenas e escondidas em mobile) */}
      <div className="absolute top-1/4 left-1/4 w-5 h-5 rounded-full bg-pink-200 opacity-60 animate-float sm:block"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-blue-200 opacity-60 animate-float-delayed sm:block"></div>
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-yellow-200 opacity-60 animate-float sm:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center h-full flex flex-col justify-center">
          {/* Título animado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${theme.primary}`}>
              {title}
            </h2>
            <div className={`h-1 w-20 mx-auto ${theme.sex === "F" ? "bg-pink-300" : "bg-blue-300"}`}></div>
          </motion.div>

          {/* Player de música com card limitado (para evitar overflow da seção) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border-2 border-dashed border-gray-200 w-full max-w-2xl mx-auto
                       max-h-[70dvh]"
          >
            {/* Decoração superior (pequena) */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i % 2 === 0 ? theme.primary : "bg-yellow-300"}`}
                />
              ))}
            </div>

            <div className="mb-4">
              <div className="flex justify-center items-center mb-4">
                <div className={`p-2 rounded-full ${theme.primary} bg-opacity-20`}>
                  <FaMusic className={`text-xl ${theme.primary}`} />
                </div>
              </div>

              {/* iframe responsivo com alturas adaptativas */}
              <div className="w-full">
                <iframe
                  src={youtubeLink}
                  width="100%"
                  height={0}
                  className="rounded-xl shadow-md w-full h-40 sm:h-44 md:h-52"
                  style={{ border: 0 }}
                  title={title}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="text-xs sm:text-lg text-gray-600 italic mb-4">{description}</p>

            {/* Decoração inferior */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${theme.sex === "F" ? "bg-pink-200" : "bg-blue-200"}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Mensagem fofa */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 bg-white bg-opacity-70 backdrop-blur-sm p-3 rounded-xl shadow-sm"
          >
            <p className="text-gray-600 text-sm sm:text-base">
              {theme.sex === "F"
                ? "Cada nota é um beijinho de amor para nossa princesa"
                : "Cada nota é um beijinho de amor para nosso principezinho"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
