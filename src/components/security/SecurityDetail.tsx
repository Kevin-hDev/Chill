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
        <Accordion key={i} title={section.title} variant="code">
          <p className="whitespace-pre-line leading-relaxed">{section.content}</p>
        </Accordion>
      ))}
    </div>
  );
}
