import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
// @ts-expect-error importação correta
import "swiper/css";
// @ts-expect-error importação correta
import "swiper/css/navigation";
// @ts-expect-error importação correta
import "swiper/css/pagination";
// @ts-expect-error importação correta
import "swiper/css/effect-coverflow";

type Props = {
  photos?: Array<{
    preview: string;
    title: string;
    description?: string;
  }>;
  showNavigation?: boolean; // controla setas
  slidesPerViewMobile?: number;
};

export default function PhotoCarousel({
  photos = [],
  showNavigation = true,
  slidesPerViewMobile = 1,
}: Props) {
  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const loopMode = photos.length > 1;

  if (!hasPhotos) {
    return (
      <div className="w-full max-w-sm mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl fade-in">
        <div className="flex items-center justify-center h-96">
          <DotLottieReact
            src="https://lottie.host/abff1569-1ee2-46ad-8f23-838a54e88744/U1zENOKCEN.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl fade-in">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 18,
          stretch: 0,
          depth: 80,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={showNavigation && photos.length > 1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={loopMode}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerViewMobile}
        breakpoints={{
          // em >= 768px você pode querer mostrar mais slides / habilitar navigation via prop showNavigation
          768: {
            slidesPerView: "auto",
            centeredSlides: true,
          },
        }}
        allowTouchMove={true}
        className="mySwiper"
        style={{ maxWidth: "100vw" }}
      >
        {photos.map((photo, i) => (
          <SwiperSlide key={i} style={{ width: "min(300px, 90vw)" }}>
            <div className="aspect-[3/4] rounded-xl overflow-hidden relative group">
              <img
                src={photo.preview}
                alt={photo.title ?? `Foto ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="carousel-caption absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                <h3 className="text-white text-sm font-medium text-center drop-shadow-md">
                  {photo.title}
                </h3>
                {photo.description && (
                  <p className="text-xs text-white text-center mt-1 line-clamp-2">
                    {photo.description}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
