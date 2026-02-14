import { motion } from 'motion/react';
import CodeBlock from '../ui/CodeBlock';

interface AgentCardProps {
  name: string;
  description: string;
  prereqs?: string;
  installCode: string;
  runCode: string;
  upgradeCode: string;
  tabLabels: { install: string; run: string; upgrade: string };
}

export default function AgentCard({
  name,
  description,
  prereqs,
  installCode,
  runCode,
  upgradeCode,
  tabLabels,
}: AgentCardProps) {
  const tabs = [
    { label: tabLabels.install, code: installCode },
    { label: tabLabels.run, code: runCode },
    { label: tabLabels.upgrade, code: upgradeCode },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="rounded-chill border border-chill-border bg-chill-elevated overflow-hidden"
    >
      <div className="px-5 pt-5 pb-4">
        <h3 className="text-body font-heading font-bold text-chill-text mb-1">
          {name}
        </h3>
        <p className="text-body-sm text-chill-text-secondary">{description}</p>
        {prereqs && (
          <p className="mt-2 text-micro font-mono text-chill-text-muted">
            {prereqs}
          </p>
        )}
      </div>
      <div className="px-5 pb-5">
        <div className="border border-chill-border rounded-chill bg-chill-surface overflow-hidden">
          <div className="px-4 py-3 font-mono text-code text-chill-text">{name}</div>
          <div className="px-4 pb-4 border-t border-chill-border bg-chill-surface pt-3 font-mono text-code text-chill-text-secondary">
            <CodeBlock tabs={tabs} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
