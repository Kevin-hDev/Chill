import TabsOS from '../ui/TabsOS';
import Accordion from '../ui/Accordion';
import CodeBlock from '../ui/CodeBlock';

interface StepData {
  title: string;
  content?: string;
  code?: string;
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
            {step.code && (
              <CodeBlock code={step.code} language="bash" />
            )}
          </div>
        </Accordion>
      ))}
    </div>
  );
}

export default function TailscaleContent({ win, linux, mac }: Props) {
  return (
    <TabsOS
      windows={<StepList steps={win} />}
      linux={<StepList steps={linux} />}
      macos={<StepList steps={mac} />}
    />
  );
}
