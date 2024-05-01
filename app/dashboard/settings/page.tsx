import { Metadata } from 'next';
import { lora } from '@/app/ui/fonts';
import { UsersIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Settings',
};

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
          <h1 className={`${lora.className} text-2xl`}>Settings</h1>
      </div>
      <div className="mt-4">
        <Link 
          key="User settings" 
          href="/dashboard/settings/user" 
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <UsersIcon className="w-6" />
          <p className="hidden md:block">User settings</p>
        </Link>
      </div>
      <div className="mt-4">
        <Link 
          key="Account settings" 
          href="/dashboard/settings/account" 
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <AtSymbolIcon className="w-6" />
          <p className="hidden md:block">Account settings</p>
        </Link>
      </div>
    </div>
  );
}