import { motion } from 'motion/react';
import Carousel from '../ui/Carousel';

interface SectionPerspectiveProps {
  side: 'left' | 'right';
  images: { src: string; srcLight?: string; alt: string }[];
  title: string;
  description: string;
  accentColor?: string;
}

export default function SectionPerspective({
  side,
  images,
  title,
  description,
  accentColor,
}: SectionPerspectiveProps) {
  // Split title into words for staggered animation
  const titleWords = title.split(' ');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as [number, number, number, number],
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.4,
      },
    }),
  };

  const perspectiveClass = side === 'left' ? 'perspective-right' : 'perspective-left';

  const ImageColumn = (
    <div className="perspective-wrapper overflow-visible flex justify-center">
      <div
        className={`rounded-chill-xl overflow-hidden border border-chill-border shadow-2xl max-h-[600px] w-auto ${perspectiveClass}`}
        style={{ aspectRatio: '1344/2992' }}
      >
        <Carousel images={images} aspectRatio="1344/2992" />
      </div>
    </div>
  );

  const titleShift = side === 'left' ? 'md:-ml-24' : 'md:-mr-24';
  const descShift = side === 'left' ? 'md:-ml-14' : 'md:-mr-14';

  const TextColumn = (
    <div className="flex flex-col justify-center">
      <h2 className={`text-h2 font-heading font-bold text-chill-text mb-4 md:mb-6 ${titleShift}`}>
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
            style={accentColor ? { color: accentColor } : undefined}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <p className={`text-body text-chill-text-secondary mt-4 ${descShift}`}>
        {description}
      </p>
    </div>
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="py-12 md:py-20 overflow-visible"
    >
      <div
        className={`grid grid-cols-1 gap-8 md:gap-0 items-center overflow-visible ${
          side === 'left'
            ? 'md:grid-cols-[50%_50%]'
            : 'md:grid-cols-[50%_50%]'
        }`}
      >
        {side === 'left' ? (
          <>
            {ImageColumn}
            {TextColumn}
          </>
        ) : (
          <>
            {TextColumn}
            {ImageColumn}
          </>
        )}
      </div>
    </motion.section>
  );
}
