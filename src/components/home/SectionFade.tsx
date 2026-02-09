import { motion } from 'motion/react';
import Carousel from '../ui/Carousel';

interface SectionFadeProps {
  images: { src: string; alt: string }[];
  title: string;
  description: string;
  side?: 'left' | 'right';
}

export default function SectionFade({
  images,
  title,
  description,
  side = 'left',
}: SectionFadeProps) {
  const isImageLeft = side === 'left';

  const perspectiveClass = isImageLeft ? 'perspective-right' : 'perspective-left';

  return (
    <section className="py-20 overflow-visible">
      <div
        className={`grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 md:gap-0 items-center overflow-visible ${
          !isImageLeft ? 'direction-rtl' : ''
        }`}
      >
        {/* Image carousel with perspective */}
        <motion.div
          className={`overflow-visible perspective-wrapper flex justify-center ${!isImageLeft ? 'md:order-2' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`rounded-chill-xl overflow-hidden border border-chill-border shadow-2xl max-h-[600px] w-auto ${perspectiveClass}`}
            style={{ aspectRatio: '1344/2992' }}
          >
            <Carousel images={images} aspectRatio="1344/2992" />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className={`${!isImageLeft ? 'md:order-1' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-h2 font-heading font-bold text-chill-text">
            {title}
          </h2>
          <p className="text-body text-chill-text-secondary mt-4">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
