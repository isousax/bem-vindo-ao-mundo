import type { propsTheme } from "../utils/theme";
import type { DedicationData } from "../utils/postMessageData";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaBirthdayCake,
  FaClock,
  FaWeight,
  FaRulerVertical,
} from "react-icons/fa";
import { format } from "date-fns";
import StarsBackground from "./ui/StarsParticles";

export default function Header({
  theme,
  basic,
}: propsTheme & { basic?: DedicationData["basic"] }) {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const namePulse: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, textShadow: "0 8px 30px rgba(0,0,0,0.12)" },
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "—";
    return format(new Date(date), "dd/MM/yyyy");
  };

  const formatTime = (time: string | undefined) => {
    if (!time) return "—";
    return format(new Date(time), "HH:mm");
  };

  const formatPeso = (value: string | undefined) => {
    if (!value) return "—";

    const formattedValue = value.toString().replace(/[^0-9]/g, "");
    return formattedValue ? `${formattedValue}g` : "—";
  };

  const items = [
    { icon: <FaBirthdayCake />, label: formatDate(basic?.data_nascimento) },
    { icon: <FaClock />, label: formatTime(basic?.data_nascimento) + "h" },
    { icon: <FaWeight />, label: formatPeso(basic?.peso_baby) },
    { icon: <FaRulerVertical />, label: `${basic?.altura_baby + "cm" || "—"}` },
  ];

  return (
    <header
      className={`relative min-h-screen flex items-center justify-center text-center overflow-hidden ${theme.gradient}`}
      aria-label="Cabeçalho da dedicatória"
    >
      {/* Partículas de estrelas */}
      <StarsBackground />

      {/* Nuvens - wrapper com zIndex acima das partículas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
        <div className="cloud cloud-6"></div>
        <div className="cloud cloud-7"></div>
      </div>

      {/* Conteúdo principal */}
      <motion.div
        className="z-10 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-[95%] md:max-w-[85%] lg:max-w-[900px] transition-all duration-700 borda-brilhante"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <motion.h2
            className="font-semibold text-gray-600 text-lg md:text-xl mb-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            {theme.sex === "F" ? "Bem-vinda" : "Bem-vindo"} ao mundo,{" "}
          </motion.h2>

          <motion.h1
            className={`${theme.primary} font-extrabold text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight`}
            variants={namePulse}
            initial="initial"
            whileHover="hover"
            aria-label="Nome do bebê"
          >
            {basic?.nome_baby || "—"}
          </motion.h1>

          <motion.p
            className="text-gray-600 text-base md:text-lg mb-4 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            {theme.sex === "F"
              ? "Nossa pequena anjinha chegou para iluminar nossas vidas."
              : "Nosso pequeno anjinho chegou para iluminar nossas vidas."}
          </motion.p>

          {/* Info cards com tilt e stagger */}
          <motion.div
            className="mt-4 w-full grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-4 justify-center items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((it, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                className="w-full md:w-auto"
              >
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  glareEnable={false}
                  scale={1.02}
                  transitionSpeed={250}
                  className="rounded-xl"
                >
                  <div
                    className={`info-card flex flex-col items-center justify-center bg-white p-3 md:p-4 rounded-xl shadow-md hover:shadow-xl transform-gpu transition-all duration-300`}
                    style={{ minWidth: 120 }}
                  >
                    <div
                      className={`text-2xl md:text-3xl ${theme.primary} mb-2`}
                    >
                      {it.icon}
                    </div>
                    <p className="text-gray-600 text-sm md:text-base break-words">
                      {it.label}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Observação: se quiser Lottie, importe <Lottie animationData={...} /> e posicione com zIndex 2 */}
    </header>
  );
}
