import { motion } from 'motion/react';
import Carousel from '../ui/Carousel';

interface SectionPerspectiveProps {
  side: 'left' | 'right';
  images: { src: string; alt: string }[];
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

  // Perspective transform based on side (desktop only via CSS media query)
  const perspectiveTransform =
    side === 'left'
      ? 'perspective(1000px) rotateY(-8deg)'
      : 'perspective(1000px) rotateY(8deg)';

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

  // Shape-outside polygon for text wrapping (desktop only)
  const shapeOutsideStyle =
    side === 'left'
      ? {
          float: 'left' as const,
          shapeOutside: 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)',
          width: '20%',
          height: '100%',
        }
      : {
          float: 'right' as const,
          shapeOutside: 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)',
          width: '20%',
          height: '100%',
        };

  const ImageColumn = (
    <div className="relative">
      {/* perspective-container class: transform applied only on md+ screens */}
      <div
        className="rounded-chill-xl overflow-hidden border border-chill-border shadow-lg perspective-container"
        data-transform={perspectiveTransform}
      >
        <Carousel images={images} aspectRatio="9/16" />
      </div>
      {/* Inline style for md+ perspective via media query */}
      <style>{`
        @media (min-width: 768px) {
          .perspective-container[data-transform="${perspectiveTransform}"] {
            transform: ${perspectiveTransform};
          }
        }
      `}</style>
    </div>
  );

  const TextColumn = (
    <div className="flex flex-col justify-center">
      <h2 className="text-h2 font-heading font-bold text-chill-text mb-4 md:mb-6">
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
      <div className="relative">
        {/* Invisible shape element for text wrapping (hidden on mobile) */}
        <div
          style={shapeOutsideStyle}
          aria-hidden="true"
          className="pointer-events-none hidden md:block"
        />
        <p className="text-body text-chill-text-secondary mt-4">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="py-12 md:py-20"
    >
      <div
        className={`grid grid-cols-1 gap-8 md:gap-12 items-center ${
          side === 'left'
            ? 'md:grid-cols-[40%_60%]'
            : 'md:grid-cols-[60%_40%]'
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
