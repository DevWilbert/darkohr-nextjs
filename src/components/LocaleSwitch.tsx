'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface LocaleSwitchProps {
  currentLocale: string;
}

const LocaleSwitch = ({ currentLocale: initialLocale }: LocaleSwitchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLocale, setActiveLocale] = useState(initialLocale);
  
  // Update internal state when prop changes
  useEffect(() => {
    setActiveLocale(initialLocale);
  }, [initialLocale]);

  const handleLocaleChange = useCallback((newLocale: string) => {
    if (newLocale === activeLocale) return;
    
    // Extract the path without locale
    const pathWithoutLocale = pathname.replace(/^\/(id|en)/, '') || '/';
    
    // Set the new locale first
    setActiveLocale(newLocale);
    
    // Navigate to URL with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Force a hard navigation to ensure proper locale change
    window.location.href = newPath;
    
    // Alternative approach using Next.js router (if the above doesn't work)
    // router.push(newPath);
  }, [pathname, activeLocale]);

  return (
    <div className="flex items-center">
      <select
        className="px-2 py-1 bg-transparent border border-gray-300 rounded-md dark:border-gray-700 dark:text-gray-200"
        value={activeLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        aria-label="Change language"
      >
        <option value="id">ID</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

export default LocaleSwitch;