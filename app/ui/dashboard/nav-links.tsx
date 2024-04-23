'use client';

import {
  UserIcon,
  AcademicCapIcon,
  WrenchIcon,
  MusicalNoteIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Learn', href: '/dashboard/learn', icon: AcademicCapIcon },
  {
    name: 'Tabs',
    href: '/dashboard/invoices',
    icon: MusicalNoteIcon,
  },
  { 
    name: 'Tools', 
    submenu: [
      { name: 'Tuner', href: '/dashboard/tools/tuner' },
      { name: 'Chord Finder', href: '/dashboard/tools/chord-finder' },
    ],
    icon: WrenchIcon 
  },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: AdjustmentsHorizontalIcon },
];

export default function NavLinks() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const pathname = usePathname();

  const handleToggleSubMenu = () => {
    setShowSubMenu((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if (link.submenu) {
          return (
            <div key={link.name} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div
                className={clsx(
                  'flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'bg-sky-100 text-orange-500': showSubMenu,
                  },
                )}
                onClick={handleToggleSubMenu}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </div>
              {showSubMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md" onMouseLeave={handleMouseLeave}>
                  {link.submenu.map((sublink) => (
                    <Link key={sublink.name} href={sublink.href}>
                      <div className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">{sublink.name}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        } else {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-orange-500': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }
      })}
    </>
  );
}