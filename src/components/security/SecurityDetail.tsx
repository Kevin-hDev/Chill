import { motion } from 'motion/react';
import Accordion from '../ui/Accordion';

interface DetailSection {
  title: string;
  content: string;
}

interface SecurityDetailProps {
  sections: DetailSection[];
}

export default function SecurityDetail({ sections }: SecurityDetailProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Accordion title={section.title} variant="code">
            <p className="whitespace-pre-line leading-relaxed">{section.content}</p>
          </Accordion>
        </motion.div>
      ))}
    </div>
  );
}
