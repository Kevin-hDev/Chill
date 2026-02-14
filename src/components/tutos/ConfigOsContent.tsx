import { motion } from 'motion/react';
import TabsOS from '../ui/TabsOS';
import Accordion from '../ui/Accordion';
import CodeBlock from '../ui/CodeBlock';
import StepImage from '../ui/StepImage';
import MethodTabs from '../ui/MethodTabs';

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: string;
}

interface GraphicalStep {
  text: string;
  image?: ImageData;
}

interface MethodsData {
  graphicalLabel: string;
  terminalLabel: string;
  graphical: {
    steps?: GraphicalStep[];
    warningImage?: ImageData;
    note?: string;
  };
  terminal: {
    content?: string;
    code?: string;
    note?: string;
  };
}

interface StepData {
  title: string;
  content?: string;
  code?: string;
  tabs?: Array<{ label: string; code: string }>;
  warning?: string;
  methods?: MethodsData;
  note?: string;
  content2?: string;
  code2?: string;
  note2?: string;
  fallback?: string;
  fallbackCode?: string;
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

            {/* Warning banner */}
            {step.warning && (
              <div className="rounded-chill border border-amber-500/40 bg-amber-500/10 px-4 py-3 flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 shrink-0 mt-0.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="text-body-sm text-amber-200/90 leading-relaxed">{step.warning}</p>
              </div>
            )}

            {/* Method tabs (graphical / terminal) */}
            {step.methods && (
              <MethodTabs
                graphicalLabel={step.methods.graphicalLabel}
                terminalLabel={step.methods.terminalLabel}
                graphicalContent={
                  <div className="space-y-4">
                    {step.methods.graphical.steps?.map((gs, j) => (
                      <div key={j}>
                        <p className="text-body-sm text-chill-text-secondary mb-2">
                          <span className="text-chill-accent font-semibold">{j + 1}.</span> {gs.text}
                        </p>
                        {gs.image && (
                          <StepImage src={gs.image.src} alt={gs.image.alt} caption={gs.image.caption} maxWidth={gs.image.maxWidth} />
                        )}
                      </div>
                    ))}
                    {step.methods.graphical.warningImage && (
                      <StepImage
                        src={step.methods.graphical.warningImage.src}
                        alt={step.methods.graphical.warningImage.alt}
                        caption={step.methods.graphical.warningImage.caption}
                      />
                    )}
                    {step.methods.graphical.note && (
                      <p className="text-body-sm text-chill-accent font-medium italic">
                        {step.methods.graphical.note}
                      </p>
                    )}
                  </div>
                }
                terminalContent={
                  <div className="space-y-3">
                    {step.methods.terminal.content && (
                      <p className="text-body-sm text-chill-text-secondary">{step.methods.terminal.content}</p>
                    )}
                    {step.methods.terminal.code && (
                      <CodeBlock code={step.methods.terminal.code} language="powershell" title="PowerShell" />
                    )}
                    {step.methods.terminal.note && (
                      <p className="text-body-sm text-chill-accent font-medium italic">
                        {step.methods.terminal.note}
                      </p>
                    )}
                  </div>
                }
              />
            )}

            {/* Standard code block (tabs or single) */}
            {step.tabs && step.tabs.length > 0 && (
              <CodeBlock tabs={step.tabs} />
            )}
            {step.code && !step.tabs && !step.methods && (
              <CodeBlock code={step.code} language="powershell" title="PowerShell" />
            )}
            {step.note && (
              <p className="text-body-sm text-chill-text-muted italic">{step.note}</p>
            )}

            {/* Extra verification block */}
            {step.content2 && <p className="mt-2">{step.content2}</p>}
            {step.code2 && (
              <CodeBlock code={step.code2} language="powershell" title="PowerShell" />
            )}
            {step.note2 && (
              <p className="text-body-sm text-chill-text-muted italic">{step.note2}</p>
            )}

            {/* Fallback block */}
            {step.fallback && (
              <p className="text-body-sm text-chill-text-secondary mt-2">{step.fallback}</p>
            )}
            {step.fallbackCode && (
              <CodeBlock code={step.fallbackCode} language="powershell" title="PowerShell" />
            )}
          </div>
        </Accordion>
      ))}
    </div>
  );
}

export default function ConfigOsContent({ win, linux, mac }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
    <TabsOS
      windows={<StepList steps={win} />}
      linux={<StepList steps={linux} />}
      macos={<StepList steps={mac} />}
    />
    </motion.div>
  );
}
