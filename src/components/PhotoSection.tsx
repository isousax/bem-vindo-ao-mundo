import { useEffect, useState } from "react";
import type { propsTheme } from "../utils/theme";
import type { DedicationData } from "../utils/postMessageData";

export default function PhotoSection({
  theme,
  photos = [],
  customText,
}: propsTheme & {
  photos?: DedicationData["photos"];
  customText?: DedicationData["customText"];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

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
                className="max-w-full max-h-[80vh] object-contain"
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
    >
      <h2
        className={`${
          theme.sex === "F" ? "line-title-f" : "line-title-m"
        } text-3xl md:text-5xl font-semibold mb-8 ${theme.primary}`}
      >
        {customText?.title_photos || "Momentos Especiais"}
      </h2>

      {/* Carrossel para Mobile */}
      <div className="carousel-container md:hidden">
        <div className="carousel-wrapper relative">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {photos.map((photos) => (
              <div
                className="carousel-item aspect-[3/4] w-full flex-shrink-0"
                key={photos.preview}
              >
                <div className="carousel-image-container h-full mx-2 rounded-2xl overflow-hidden shadow-lg relative">
                  <img
                    src={photos.preview}
                    alt={photos.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="carousel-caption absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                    <h3 className="font-bold text-sm">{photos.title}</h3>
                    <p className="text-xs">{photos.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles do Carrossel */}
        <div className="carousel-controls flex justify-center mt-4 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? `${theme.colorBg}` : "bg-gray-300"
              }`}
              onClick={() => goToPhoto(index)}
              aria-label={`Ir para foto ${index + 1}`}
            />
          ))}
        </div>

        {/* Botões de navegação */}
        <div className="carousel-nav-buttons flex justify-between items-center mt-4 px-4">
          <button
            className="carousel-button prev bg-white p-2 rounded-full shadow-md mb-4"
            onClick={prevPhoto}
            aria-label="Foto anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${theme.primary}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="carousel-button next bg-white p-2 rounded-full shadow-md mb-4"
            onClick={nextPhoto}
            aria-label="Próxima foto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${theme.primary}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid para Desktop */}
      {renderDesktopGrid()}
    </section>
  );
}
