import TabsOS from '../ui/TabsOS';
import Accordion from '../ui/Accordion';
import CodeBlock from '../ui/CodeBlock';

interface StepData {
  title: string;
  content?: string;
  code?: string;
  tabs?: Array<{ label: string; code: string }>;
}

interface Props {
  win: StepData[];
  linux: StepData[];
  mac: StepData[];
}

function StepList({ steps }: { steps: StepData[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <Accordion key={i} title={`${i + 1}. ${step.title}`} defaultOpen={i === 0}>
          <div className="space-y-3">
            {step.content && <p>{step.content}</p>}
            {step.tabs && step.tabs.length > 0 && (
              <CodeBlock tabs={step.tabs} />
            )}
            {step.code && !step.tabs && (
              <CodeBlock code={step.code} language="bash" />
            )}
          </div>
        </Accordion>
      ))}
    </div>
  );
}

export default function ConfigOsContent({ win, linux, mac }: Props) {
  return (
    <TabsOS
      windows={<StepList steps={win} />}
      linux={<StepList steps={linux} />}
      macos={<StepList steps={mac} />}
    />
  );
}
