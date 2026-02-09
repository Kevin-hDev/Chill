import Accordion from '../ui/Accordion';
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
    <div className="rounded-chill border border-chill-border bg-chill-elevated overflow-hidden">
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
        <Accordion title={name} variant="code">
          <CodeBlock tabs={tabs} />
        </Accordion>
      </div>
    </div>
  );
}
