import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type OSTab = 'windows' | 'macos' | 'linux';

interface TabsOSProps {
  windows?: ReactNode;
  macos?: ReactNode;
  linux?: ReactNode;
  defaultTab?: OSTab;
}

const WindowsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" />
    <rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" />
    <rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);

const MacOSIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.2 1.6C10.4 0.6 9.2 0 8.2 0c-0.1 0.9 0.3 1.9 1 2.6 0.7 0.7 1.7 1.2 2.6 1.1 0.1-0.9-0.2-1.8-0.6-2.1zM11.7 4.1c-1.4-0.1-2.6 0.8-3.2 0.8-0.7 0-1.7-0.7-2.8-0.7C4.2 4.2 2.8 5 2 6.3 0.5 9 1.6 12.9 3.1 14.8c0.7 0.9 1.6 2 2.7 2 1.1 0 1.5-0.7 2.8-0.7 1.3 0 1.6 0.7 2.8 0.7 1.2 0 1.9-0.9 2.6-1.9 0.8-1.1 1.2-2.2 1.2-2.3-0.1 0-2.3-0.9-2.3-3.4 0-2.1 1.7-3.2 1.8-3.2C13.7 4.6 12.4 4.1 11.7 4.1z" />
  </svg>
);

const LinuxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0.5C6.2 0.5 5.2 2.4 5.2 4.4c0 1 0.2 2 0.5 2.8-1.1 0.8-2.2 2-2.7 3.4-0.3 0.8-0.3 1.6 0 2.2 0.3 0.6 0.9 1 1.6 1.2 0.6 0.2 1.3 0.2 1.9 0 0.4-0.1 0.7-0.2 1-0.4h1c0.3 0.2 0.6 0.3 1 0.4 0.6 0.2 1.3 0.2 1.9 0 0.7-0.2 1.3-0.6 1.6-1.2 0.3-0.6 0.3-1.4 0-2.2-0.5-1.4-1.6-2.6-2.7-3.4 0.3-0.8 0.5-1.8 0.5-2.8C10.8 2.4 9.8 0.5 8 0.5zM6.8 3.6c0.3 0 0.5 0.3 0.5 0.6 0 0.3-0.2 0.6-0.5 0.6s-0.5-0.3-0.5-0.6c0-0.3 0.2-0.6 0.5-0.6zm2.4 0c0.3 0 0.5 0.3 0.5 0.6 0 0.3-0.2 0.6-0.5 0.6s-0.5-0.3-0.5-0.6c0-0.3 0.2-0.6 0.5-0.6zM7 5.8h2c-0.1 0.4-0.5 0.7-1 0.7S7.1 6.2 7 5.8z" />
  </svg>
);

const tabs: { key: OSTab; label: string; icon: () => ReactNode }[] = [
  { key: 'windows', label: 'Windows', icon: WindowsIcon },
  { key: 'macos', label: 'macOS', icon: MacOSIcon },
  { key: 'linux', label: 'Linux', icon: LinuxIcon },
];

export default function TabsOS({
  windows,
  macos,
  linux,
  defaultTab = 'windows',
}: TabsOSProps) {
  const [activeTab, setActiveTab] = useState<OSTab>(defaultTab);

  const contentMap: Record<OSTab, ReactNode | undefined> = {
    windows,
    macos,
    linux,
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-chill-border relative">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative flex items-center gap-2 px-4 py-3 font-body text-body-sm transition-colors cursor-pointer ${
                isActive
                  ? 'text-chill-accent'
                  : 'text-chill-text-secondary hover:text-chill-text'
              }`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon />
              <span>{label}</span>
              {isActive && (
                <motion.div
                  layoutId="tabsos-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-chill-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {contentMap[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
