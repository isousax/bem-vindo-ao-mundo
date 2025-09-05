import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { propsTheme } from "../utils/theme";
import type { DedicationData } from "../utils/postMessageData";
import PhotoCarousel from "./ui/PhotoCarousel";

export default function PhotoSection({
  theme,
  photos = [
    {
      preview:
        "https://dedicart-file-worker.dedicart.workers.dev/file/temp/bem_vindo_ao_mundo/1756996149980.jpeg",
      title: "Coração Ardente",
      description:
        "Em meio à vida cotidiana, você é o fogo que ilumina meu caminho, aquecendo meu coração com seu amor incondicional.",
    },
    {
      preview:
        "https://dedicart-file-worker.dedicart.workers.dev/file/temp/bem_vindo_ao_mundo/1756996149980.jpeg",
      title: "Coração Ardente",
      description:
        "Em meio à vida cotidiana, você é o fogo que ilumina meu caminho, aquecendo meu coração com seu amor incondicional.",
    },
    {
      preview:
        "https://dedicart-file-worker.dedicart.workers.dev/file/temp/bem_vindo_ao_mundo/1756996149980.jpeg",
      title: "Coração Ardente",
      description:
        "Em meio à vida cotidiana, você é o fogo que ilumina meu caminho, aquecendo meu coração com seu amor incondicional.",
    }
  ],
  customText,
}: propsTheme & {
  photos?: DedicationData["photos"];
  customText?: DedicationData["customText"];
}) {
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    // Determinar o modo de visualização baseado no tamanho da tela
    const checkViewMode = () => {
      setViewMode(window.innerWidth < 768 ? "carousel" : "grid");
    };

    checkViewMode();
    window.addEventListener("resize", checkViewMode);

    return () => {
      window.removeEventListener("resize", checkViewMode);
    };
  }, []);

  useEffect(() => {
    // Animação de elementos ao scroll
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".photo-item, .carousel-item, .desktop-photo-item")
      .forEach(function (item) {
        observer.observe(item);
      });

    return () => observer.disconnect();
  }, [viewMode]);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const renderDesktopGrid = () => {
    return (
      <div className="desktop-gallery hidden md:block mt-8">
        <div className="flex justify-center">
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: `repeat(${photos.length}, minmax(0, 1fr))`,
            }}
          >
            {photos?.map((photo, index) => (
              <div
                key={photo.preview}
                className="desktop-photo-item max-h-[60dvh] aspect-[3/4] relative rounded-2xl cursor-pointer overflow-hidden group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={photo.preview}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="photo-overlay absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30 flex items-end">
                  <div className="photo-info text-white p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 w-full">
                    <h3 className="font-bold text-lg">{photo.title}</h3>
                    <p className="text-sm mt-1">{photo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visualização em lightbox */}
        {selectedPhoto !== null && (
          <div
            className="lightbox fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div
              className="lightbox-content max-w-4xl max-h-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedPhoto].preview}
                alt={photos[selectedPhoto].title}
                className="max-w-full max-h-[80dvh] object-contain"
              />
              <div className="photo-info text-white mt-4 text-center">
                <h3 className="font-bold text-xl">
                  {photos[selectedPhoto].description}
                </h3>
                <p className="mt-2">{photos[selectedPhoto].description}</p>
              </div>
              <button
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
                onClick={closeLightbox}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <section
      className={`photo-section ${theme.gradientLow} text-center min-h-screen min-w-full flex flex-col items-center justify-center p-4 py-12`}
      aria-label="Seção de fotos"
    >
      <motion.h2
        className={`${
          theme.sex === "F" ? "line-title-f" : "line-title-m"
        } text-3xl md:text-5xl font-semibold mb-8 ${theme.primary}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {customText?.title_photos || "Momentos Especiais"}
      </motion.h2>

      {/* Carrossel para Mobile */}
      <div className="md:hidden w-full">
        <PhotoCarousel
          photos={photos}
          showNavigation={false} // remove as setas no mobile
          slidesPerViewMobile={1}
        />
      </div>

      {/* Grid para Desktop */}
      <div className="hidden md:block">{renderDesktopGrid()}</div>
    </section>
  );
}