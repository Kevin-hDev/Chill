import { languages, type Lang } from '../../i18n/ui';
import { getLocalePath } from '../../i18n/utils';

interface Props {
  currentLang: Lang;
  currentPath: string;
}

export default function LanguageToggle({ currentLang, currentPath }: Props) {
  const otherLang: Lang = currentLang === 'en' ? 'fr' : 'en';
  const cleanPath = currentLang === 'fr'
    ? currentPath.replace(/^\/fr/, '') || '/'
    : currentPath;
  const href = getLocalePath(otherLang, cleanPath);

  const ariaLabel = currentLang === 'en' ? 'Switch to French' : 'Passer en anglais';

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="text-micro font-mono text-chill-text-secondary hover:text-chill-text transition-colors px-2 py-1 border border-chill-border rounded-chill-sm"
    >
      {languages[otherLang]}
    </a>
  );
}
