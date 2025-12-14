
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const serviceIds = [
    'netflix-logo',
    'prime-video-logo',
    'hotstar-logo',
    'zee5-logo',
    'youtube-premium-logo',
    'sony-logo',
    'aha-logo',
    'canva-logo'
];

export const SearchComponent = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    const services = serviceIds.map(id => PlaceHolderImages.find(p => p.id === id)?.description).filter(Boolean) as string[];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const filteredServices = services.filter(service =>
                service.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredServices);
        } else {
            setSearchResults([]);
        }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsSearchOpen(false);
            setSearchResults([]);
            setSearchQuery('');
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const handleResultClick = () => {
        setIsSearchOpen(false);
        setSearchResults([]);
        setSearchQuery('');
    };

    return (
        <div ref={searchRef} className="relative flex items-center">
            <div className={cn(
                'search-container',
                isSearchOpen ? 'w-48 sm:w-64' : 'w-10'
            )}>
                <input
                    type="text"
                    placeholder="Search services..."
                    className={cn(
                        'w-full h-9 pl-4 pr-10 rounded-full bg-transparent border border-green-500/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300',
                        isSearchOpen ? 'opacity-100' : 'opacity-0'
                    )}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchOpen(true)}
                />
                <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center"
                >
                    <Search className="text-green-400 h-5 w-5" />
                </button>
            </div>
            
            {isSearchOpen && searchResults.length > 0 && (
                <ul className="absolute top-11 left-0 w-48 sm:w-64 bg-gray-900 border border-green-500/50 rounded-lg shadow-lg z-10">
                    {searchResults.map((result, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white text-sm">
                           <Link href={`/about?service=${encodeURIComponent(result)}`} onClick={handleResultClick}>
                                {result}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
