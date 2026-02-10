import StepImage from '../ui/StepImage';

interface BiosStep {
  text: string;
  image?: { src: string; alt: string; caption?: string };
}

interface Props {
  warning: string;
  steps: BiosStep[];
}

export default function BiosAsusContent({ warning, steps }: Props) {
  return (
    <div className="space-y-5">
      {/* Warning: brand-specific */}
      <div className="rounded-chill border border-amber-500/40 bg-amber-500/10 px-4 py-3 flex items-start gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 shrink-0 mt-0.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <p className="text-body-sm text-amber-200/90 leading-relaxed">{warning}</p>
      </div>

      {/* Steps with images */}
      {steps.map((step, i) => (
        <div key={i}>
          <p className="text-body-sm text-chill-text-secondary leading-relaxed">
            <span className="text-chill-accent font-semibold">{i + 1}.</span> {step.text}
          </p>
          {step.image && (
            <StepImage src={step.image.src} alt={step.image.alt} caption={step.image.caption} />
          )}
        </div>
      ))}
    </div>
  );
}
