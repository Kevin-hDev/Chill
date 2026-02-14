import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

function getSnapshot(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerSnapshot(): 'dark' | 'light' {
  return 'dark';
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
