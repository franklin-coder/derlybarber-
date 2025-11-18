
"use client";

import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useSafeLanguage } from '@/lib/safe-language-context';
import { languages, LanguageCode } from '@/lib/i18n';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useSafeLanguage();
  
  // If setLanguage is not available (server-side), render a static version
  if (!setLanguage) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded text-white/80">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {languages[currentLanguage]?.flag} {languages[currentLanguage]?.name}
        </span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-derly-beige hover:bg-white/10">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {languages[currentLanguage]?.flag} {languages[currentLanguage]?.name}
          </span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as LanguageCode)}
            className={`gap-2 cursor-pointer hover:bg-derly-beige-light ${currentLanguage === code ? 'bg-derly-beige text-derly-brown-dark' : 'text-gray-700'}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
