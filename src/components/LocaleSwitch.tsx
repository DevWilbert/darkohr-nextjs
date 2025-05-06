'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

interface LocaleSwitchProps {
  currentLocale: string;
}

// Definisikan mapping path berdasarkan locale
// Ini digunakan untuk menerjemahkan path antar bahasa
const pathMappings: Record<string, Record<string, string>> = {
  // Dari ID ke EN
  'id': {
    '/fitur': '/features',
    '/tentang': '/about',
    '/blog': '/blogs',
    '/support' : '/support',
    '/docs': '/docs'
    // tambahkan path lain yang perlu diterjemahkan
  },
  // Dari EN ke ID
  'en': {
    '/features': '/fitur',
    '/about': '/tentang',
    '/blogs': '/blog',
    '/support' : '/support',
    '/docs': '/docs'
    // tambahkan terjemahan path lain
  }
};

const defaultLocale = 'id';

const LocaleSwitch = ({ currentLocale: initialLocale }: LocaleSwitchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLocale, setActiveLocale] = useState(initialLocale);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setActiveLocale(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleLocaleChange = useCallback((newLocale: string) => {
    if (newLocale === activeLocale) return;
    
    // Set active locale
    setActiveLocale(newLocale);
    
    // Extract the current locale and path
    const pathParts = pathname.split('/').filter(Boolean);
    const currentLocale = ['id', 'en'].includes(pathParts[0]) ? pathParts[0] : defaultLocale;
    
    // Extract path without locale
    let pathWithoutLocale = '';
    
    if (['id', 'en'].includes(pathParts[0])) {
      // URL dengan locale explicit: /id/path atau /en/path
      pathWithoutLocale = '/' + pathParts.slice(1).join('/');
    } else {
      // URL tanpa locale (clean URL): /path
      pathWithoutLocale = pathname;
    }
    
    // Check if we need to translate the path
    let translatedPath = pathWithoutLocale;
    if (currentLocale !== newLocale && pathMappings[currentLocale] && pathMappings[currentLocale][pathWithoutLocale]) {
      translatedPath = pathMappings[currentLocale][pathWithoutLocale];
    }
    
    // Construct the new URL
    let newPath = '';
    if (newLocale === defaultLocale) {
      // For default locale, use clean URL
      newPath = translatedPath;
    } else {
      // For other locales, add locale prefix
      newPath = `/${newLocale}${translatedPath}`;
    }
    
    // Force a hard navigation
    window.location.href = newPath;
  }, [pathname, activeLocale]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const getLocaleName = (code: string) => {
    return code === 'id' ? 'Indonesia' : 'English';
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 
                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                 text-gray-700 dark:text-gray-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-indigo-500" />
        <span className="font-medium">{activeLocale.toUpperCase()}</span>
        
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-md shadow-lg overflow-hidden 
                   bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                   transform transition-all duration-200 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {['id', 'en'].map((locale) => (
              <button
                key={locale}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left transition-colors
                         ${activeLocale === locale ? 
                           'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 
                           'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => {
                  handleLocaleChange(locale);
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                <span className="flex items-center">
                  <span className="w-6 text-center mr-2 font-medium">{locale.toUpperCase()}</span>
                  <span>{getLocaleName(locale)}</span>
                </span>
                
                {activeLocale === locale && (
                  <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <select 
        className="sr-only"
        value={activeLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        aria-hidden="true"
      >
        <option value="id">Indonesia</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LocaleSwitch;