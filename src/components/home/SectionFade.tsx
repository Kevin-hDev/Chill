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

  return (
    <section className="py-20">
      <div
        className={`flex flex-col ${
          isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        } gap-12 items-center`}
      >
        {/* Image carousel with fade effect */}
        <motion.div
          className="w-full md:w-2/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <Carousel images={images} aspectRatio="9/16" />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="w-full md:w-3/5"
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
