import { useState, useRef, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
}

interface DropdownSection {
  label: string;
  items: NavItem[];
}

interface Props {
  dropdowns: DropdownSection[];
  navItems: NavItem[];
}

export default function MobileMenu({ dropdowns, navItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-chill text-chill-text-secondary hover:text-chill-text transition-colors cursor-pointer"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          /* X icon */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          /* Hamburger icon */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        )}
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="fixed inset-x-0 top-0 z-50 bg-chill-bg/95 backdrop-blur-md border-b border-chill-border shadow-lg animate-slideDown">
          {/* Header row with close button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-chill-border">
            <span className="text-body-sm font-heading font-semibold text-chill-text">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-chill text-chill-text-secondary hover:text-chill-text transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-4 gap-1 max-h-[80vh] overflow-y-auto">
            {/* Dropdown accordions */}
            {dropdowns.map((dropdown, index) => (
              <div key={dropdown.label}>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center justify-between w-full py-3 text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors cursor-pointer"
                >
                  <span>{dropdown.label}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {openDropdown === index && (
                  <div className="flex flex-col pl-4 gap-1 border-l border-chill-border ml-2 mb-2">
                    {dropdown.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="py-2 text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Other nav links */}
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors border-b border-chill-border/50 last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
