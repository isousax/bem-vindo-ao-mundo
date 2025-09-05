import { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import PhotoSection from "./components/PhotoSection";
import MessageSection from "./components/MessageSection";
import TimelineSection from "./components/TimelineSection";
import MusicSection from "./components/MusicSection";
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
  const scrollCooldown = useRef(false);

  // handshake/fallback refs (sem annotations TS)
  const receivedFromParent = useRef(false);
  const parentOriginRef = useRef("https://dedicart.com.br");
  const fallbackFetchTimeoutRef = useRef(null);

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  //recebe dados via postMessage
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const msg = e.data;
      if (!msg || typeof msg !== "object") return;
      if (e.origin !== "https://dedicart.com.br") return;

      if (msg.type === "DEDICATION_DATA") {
        parentOriginRef.current = e.origin || "*";
        setData(msg.payload);
        receivedFromParent.current = true;
        setLoading(false);
        if (fallbackFetchTimeoutRef.current) {
          clearTimeout(fallbackFetchTimeoutRef.current);
          fallbackFetchTimeoutRef.current = null;
        }
      }
    }

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
      if (fallbackFetchTimeoutRef.current) {
        clearTimeout(fallbackFetchTimeoutRef.current);
        fallbackFetchTimeoutRef.current = null;
      }
    };
  }, []);

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

  //if (loading || !data) return <SplashScreen />;

  const theme =
    babyThemes[data?.basic?.sexo_baby === "Menina" ? "menina" : "menino"];

  const sections = [
    <Header theme={theme} basic={data?.basic} />,
    <MusicSection
      theme={theme}
      music={data?.music}
      customText={data?.customText}
    />,
    <PhotoSection
      theme={theme}
      photos={data?.photos}
      customText={data?.customText}
    />,
    <MessageSection theme={theme} customText={data?.customText} />,
    <TimelineSection
      theme={theme}
      customText={data?.customText}
      basic={data?.basic}
    />,
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
              className="snap-start h-screen w-full relative overflow-hidden"
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
