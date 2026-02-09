import { useState } from 'react';

interface Tab {
  label: string;
  code: string;
}

interface Props {
  tabs?: Tab[];
  code?: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ tabs, code, language, title }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const displayedCode = tabs ? tabs[activeTab]?.code ?? '' : code ?? '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="bg-chill-elevated border border-chill-border rounded-chill overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-chill-border">
        <div className="flex items-center gap-3">
          {/* macOS dots */}
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#eb5757' }} />
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#f5c542' }} />
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#4cb782' }} />
          </div>

          {/* Tabs or title/language label */}
          {tabs && tabs.length > 0 ? (
            <div className="flex items-center gap-1 ml-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1 text-micro font-mono rounded-chill-sm transition-colors cursor-pointer ${
                    activeTab === index
                      ? 'bg-chill-surface text-chill-text'
                      : 'text-chill-text-muted hover:text-chill-text-secondary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : (
            (title || language) && (
              <span className="text-micro font-mono text-chill-text-muted ml-2">
                {title ?? language}
              </span>
            )
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-micro font-mono text-chill-text-muted hover:text-chill-text-secondary transition-colors cursor-pointer rounded-chill-sm"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-chill-green">Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-code text-chill-text whitespace-pre m-0">
          <code>{displayedCode}</code>
        </pre>
      </div>
    </div>
  );
}
