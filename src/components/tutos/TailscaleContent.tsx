import { motion } from 'motion/react';
import TabsOS from '../ui/TabsOS';
import CodeBlock from '../ui/CodeBlock';
import StepImage from '../ui/StepImage';

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: string;
}

interface LinkData {
  url: string;
  label: string;
}

interface StepData {
  title: string;
  content?: string;
  code?: string;
  image?: ImageData;
  image2?: ImageData;
  content2?: string;
  link?: LinkData;
  storeBadges?: boolean;
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
        <div key={i} className="border border-chill-border rounded-chill bg-chill-elevated overflow-hidden">
          <h3 className="font-heading text-body-sm text-chill-text px-4 py-3">
            {i + 1}. {step.title}
          </h3>
          <div className="px-4 pb-4 border-t border-chill-border bg-chill-surface pt-3 text-body-sm text-chill-text-secondary">
            <div className="space-y-3">
              {step.content && <p>{step.content}</p>}

              {step.link && (
                <a
                  href={step.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-chill bg-chill-accent/10 border border-chill-accent/30 text-chill-accent text-body-sm font-medium hover:bg-chill-accent/20 transition-colors"
                >
                  {step.link.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}

              {step.image && (
                <StepImage src={step.image.src} alt={step.image.alt} caption={step.image.caption} maxWidth={step.image.maxWidth} />
              )}

              {step.content2 && <p>{step.content2}</p>}

              {step.image2 && (
                <StepImage src={step.image2.src} alt={step.image2.alt} caption={step.image2.caption} maxWidth={step.image2.maxWidth} />
              )}

              {step.code && (
                <CodeBlock code={step.code} language="bash" />
              )}

              {step.storeBadges && (
                <div className="flex gap-4 items-center flex-wrap mt-2">
                  <a href="https://play.google.com/store/apps/details?id=com.tailscale.ipn" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                    <img src="/images/badges/google-play-badge.png" alt="Get it on Google Play" className="h-[52px] w-auto" />
                  </a>
                  <a href="https://apps.apple.com/app/tailscale/id1470499037" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                    <img src="/images/badges/app-store-badge.svg" alt="Download on the App Store" className="h-[40px] w-auto" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TailscaleContent({ win, linux, mac }: Props) {
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
