import { motion } from 'motion/react';
import Carousel from '../ui/Carousel';
import { useTheme } from '../../hooks/useTheme';

interface SectionFadeProps {
  images: { src: string; srcLight?: string; alt: string }[];
  title: string;
  description: string;
  side?: 'left' | 'right';
  aspectRatio?: string;
  fadeBottomLeft?: boolean;
  diagonalText?: boolean;
}

export default function SectionFade({
  images,
  title,
  description,
  side = 'left',
  aspectRatio = '1344/2992',
  fadeBottomLeft = false,
  diagonalText = false,
}: SectionFadeProps) {
  const theme = useTheme();
  const isImageLeft = side === 'left';

  const perspectiveClass = isImageLeft ? 'perspective-right' : 'perspective-left';

  const isSingleImage = images.length === 1;

  return (
    <section className="py-20 overflow-hidden md:overflow-visible">
      <div
        className={`grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 md:gap-0 items-center overflow-hidden md:overflow-visible ${
          !isImageLeft ? 'direction-rtl' : ''
        }`}
      >
        {/* Image with perspective */}
        <motion.div
          className={`overflow-hidden md:overflow-visible perspective-wrapper flex justify-center md:my-24 ${!isImageLeft ? 'md:order-2' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`rounded-chill-xl overflow-hidden border border-chill-border shadow-2xl w-auto md:scale-[1.8] ${perspectiveClass}`}
            style={{
              aspectRatio,
              ...(fadeBottomLeft && {
                maskImage: 'linear-gradient(to bottom left, black 45%, rgba(0,0,0,0.5) 70%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom left, black 40%, rgba(0,0,0,0.5) 70%, transparent 95%)'
              }),
            }}
          >
            {isSingleImage ? (
              <img
                src={theme === 'light' && images[0].srcLight ? images[0].srcLight : images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <Carousel images={images} aspectRatio={aspectRatio} />
            )}
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className={`relative z-10 ${!isImageLeft ? 'md:order-1' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-h2 font-heading font-bold text-chill-text">
            {title}
          </h2>
          <p className="text-body text-chill-text-secondary mt-4">
            {diagonalText && (
              <span
                className="float-right hidden md:block"
                style={{
                  shapeOutside: 'polygon(0 0, 100% 0, 100% 100%)',
                  width: '10rem',
                  height: '7rem',
                }}
                aria-hidden="true"
              />
            )}
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
