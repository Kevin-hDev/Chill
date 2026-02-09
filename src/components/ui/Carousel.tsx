import { useState, useEffect, useRef, useCallback } from 'react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  aspectRatio?: string;
}

export default function Carousel({
  images,
  autoPlay = true,
  interval = 4000,
  aspectRatio = '16/9',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalImages = images.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isHovered || totalImages <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(goToNext, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, isHovered, interval, goToNext, totalImages]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  }, [goToNext, goToPrev]);

  if (totalImages === 0) {
    return null;
  }

  return (
    <div
      className="relative border border-chill-border rounded-chill-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides container */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full shrink-0"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {totalImages > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'bg-chill-accent'
                  : 'bg-chill-border'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
