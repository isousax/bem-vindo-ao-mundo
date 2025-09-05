import { useEffect, useState } from "react";
import type { propsTheme } from "../utils/theme";
import type { DedicationData } from "../utils/postMessageData";
import { format } from "date-fns";
import {
  FaBirthdayCake,
  FaClock,
  FaRulerVertical,
  FaWeight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import type { Variants } from "framer-motion";

export default function Footer({
  theme,
  customText,
  basic,
}: propsTheme & {
  customText?: DedicationData["customText"];
  basic?: DedicationData["basic"];
}) {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
    <footer
      className={`min-h-screen min-w-full flex flex-col items-center justify-center ${theme.gradientLow} relative overflow-hidden p-6`}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-5 w-16 h-16 rounded-full bg-pink-300 opacity-30 animate-bounce-slow"></div>
      <div className="absolute bottom-20 right-8 w-20 h-20 rounded-full bg-blue-300 opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-12 w-12 h-12 rounded-full bg-yellow-300 opacity-30 animate-bounce-slower"></div>

      {/* Conteúdo principal */}
      <div
        className={`flex flex-col items-center justify-center text-center max-w-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Imagem/Ícone central */}
        <div className="relative mb-8">
          <div className="w-40 h-40 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-24 h-24 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Elemento decorativo ao redor */}
          <div className="absolute -inset-4 border-4 border-pink-200 rounded-full opacity-50 animate-ping-slow"></div>
        </div>

        {/* Mensagem principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {`Para ${theme.sex === "F" ? "Nossa Princesa" : "Nosso Príncipe"}`}
        </h2>

        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
          Com todo amor do mundo,
          <br />
          <span className={`${theme.primary} font-semibold`}>
            {customText?.assign || "Mamãe e Papai"}
          </span>
        </p>

        {/* Detalhes do nascimento */}
        <div className="z-10 p-6 bg-white/90 backdrop-blur-sm max-w-md md:max-w-[85%] lg:max-w-[900px] transition-all duration-700 bg-white rounded-2xl shadow-md mb-8 w-full">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            {customText?.sub_title_final || "Nosso Presente Mais Precioso"}
          </h3>
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
                    className={`info-card flex flex-col items-center justify-center bg-white p-3 md:p-4 rounded-xl transform-gpu transition-all duration-300`}
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
      </div>

      {/* Efeito de confete (apenas visual) */}
      <div className="absolute bottom-0 left-0 w-full flex justify-around opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${theme.confetti}`}
            style={{
              animation: `confete 3s ease-in-out ${i * 0.5}s infinite`,
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
}
