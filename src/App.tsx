import { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import PhotoSection from "./components/PhotoSection";
import MessageSection from "./components/MessageSection";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";
import ScrollHint from "./components/ScrollHint";
import SplashScreen from "./components/ui/SplashScreen";
import { babyThemes } from "./utils/theme";
import type { DedicationData } from "./utils/postMessageData";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [showScrollHint] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<DedicationData | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Efeito de carregamento simulado
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Dados mock para demonstração
      setData({
        customText: {
          title_photos: "Momentos Especiais Edited",
          title_message: "Mensagem dos Papais Edited",
          message:
            "Desde o momento em que descobrimos que você estava a caminho, nossos corações se encheram de amor e esperança. Cada ultrassom, cada chute, cada movimento era uma emoção nova. Agora, com você em nossos braços, entendemos o verdadeiro significado do amor incondicional. Que sua vida seja repleta de saúde, alegria e descobertas. Amamos você mais do que palavras podem expressar! Edited",
          assign: "Mamãe e Papai Edited",
          sub_title_final: "Nosso Presente Mais Precioso Edited",
          title_journey: "Nossa Jornada Edited",
        },
        basic: {
          email: "italowilliams2020@gmail.com",
          nome_baby: "João",
          sexo_baby: "Menina",
          data_nascimento: "2025-09-04T11:28",
          peso_baby: "2,000",
          altura_baby: "50",
          data_pregnancy: "2025-09-17",
          data_ultrasound: "2025-09-03",
          data_sex: "2025-09-09",
        },
        photos: [
          {
            preview:
              "https://dedicart-file-worker.dedicart.workers.dev/file/temp/bem_vindo_ao_mundo/1756996149980.jpeg",
            title: "title",
            description: "desc",
          },
        ],
        music: {
          title:
            "Xamã - Aeromoça Feat. Flora Matos | Prod. Take a Day Trip (Fragmentado)",
          url: "https://www.youtube.com/watch?v=K7Mfhu64jvE",
          channel: "Xamã",
        },
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollCooldown = useRef(false);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (scrollCooldown.current) return;
      if (Math.abs(e.deltaY) < 30) return;
      scrollCooldown.current = true;
      setTimeout(() => (scrollCooldown.current = false), 700);
      if (e.deltaY > 0 && activeIndex < sectionsRef.current.length - 1) {
        e.preventDefault();
        goToSection(activeIndex + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        e.preventDefault();
        goToSection(activeIndex - 1);
      }
    },
    [activeIndex]
  );

  useEffect(() => {
    const handleScroll = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;
      sectionsRef.current.forEach((el, i) => {
        if (!el) return;
        const offsetTop = el.offsetTop;
        const offsetCenter = offsetTop + el.clientHeight / 2;
        const distance = Math.abs(center - offsetCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSection = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && activeIndex > 0) {
        goToSection(activeIndex - 1);
      } else if (deltaY < 0 && activeIndex < sectionsRef.current.length - 1) {
        goToSection(activeIndex + 1);
      }
    }
    touchStartY.current = null;
  };

  // Atualiza dot ativo ao rolar
  const handleScrollHintClick = () => {
    if (activeIndex === sectionsRef.current.length - 1) {
      goToSection(0);
    } else {
      goToSection(activeIndex + 1);
    }
  };

  if (loading || !data) return <SplashScreen />;

  const theme =
    babyThemes[data?.basic?.sexo_baby === "Menina" ? "menina" : "menino"];

  const sections = [
    <Header theme={theme} basic={data?.basic} />,
    <PhotoSection
      theme={theme}
      photos={data?.photos}
      customText={data?.customText}
    />,
    <MessageSection theme={theme} customText={data?.customText} />,
    <TimelineSection theme={theme} customText={data?.customText} basic={data?.basic} />,
    <Footer theme={theme} customText={data?.customText} basic={data?.basic} />,
  ];

  return (
    <div
      className="w-full min-h-screen relative bg-gray-50 text-gray-800 overflow-x-hidden scroll-smooth"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <main className="relative">
        {/* Indicadores de navegação */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {sections.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-none focus:outline-none ${
                i === activeIndex
                  ? `${theme.colorBg} scale-125 shadow-lg`
                  : "bg-gray-300 scale-100"
              }`}
              onClick={() => goToSection(i)}
              aria-label={`Ir para seção ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
            ></button>
          ))}
        </div>

        <div className="snap-y snap-mandatory scroll-smooth">
          {sections.map((section, i) => (
            <section
              key={i}
              ref={(el) => {
                sectionsRef.current[i] = el;
              }}
              className="snap-start h-screen w-full relative"
            >
              {section}
            </section>
          ))}
        </div>

        {showScrollHint && (
          <ScrollHint
            onClick={handleScrollHintClick}
            className="animate-bounce transition-transform"
          />
        )}
      </main>
    </div>
  );
}
