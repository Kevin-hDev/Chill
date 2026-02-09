import { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface Props {
  label: string;
  items: DropdownItem[];
}

export default function NavDropdown({ label, items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors flex items-center gap-1 cursor-pointer"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 py-2 bg-chill-elevated border border-chill-border rounded-chill shadow-lg min-w-[180px] z-50 backdrop-blur-sm">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-body-sm text-chill-text-secondary hover:text-chill-text hover:bg-chill-surface transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
