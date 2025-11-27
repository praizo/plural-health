import Image from 'next/image';
import React from 'react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function SearchBar({ className, ...props }: SearchBarProps) {
    return (
        <div className={`relative w-full max-w-xl ${className || ''}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/images/search-icon.svg" alt="Search Icon" width={20} height={20} />
            </div>
            <input
                type="text"
                className="block w-full pl-12 pr-20 py-3 bg-white border-none rounded-[10px]   text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Find patient"
                {...props}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600" aria-label="Search by fingerprint">
                     <Image src="/images/fingerprint.svg" alt="Search Icon" width={20} height={20} />
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <button className="text-gray-400 hover:text-gray-600" aria-label="Filter search">
                     <Image src="/images/filter.svg" alt="Filter Icon" width={20} height={20} />
                </button>
            </div>
        </div>
    );
}
