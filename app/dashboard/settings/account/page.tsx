import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';
import { LockClosedIcon, ScaleIcon, TrashIcon } from '@heroicons/react/24/outline';
 
export const metadata: Metadata = {
  title: 'Account Settings',
};

export default async function Page() {
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Settings', href: '/dashboard/settings' },
            {
                label: 'Account Settings',
                href: `/dashboard/settings/account`,
                active: true,
            },
            ]}
        />
        <div className="mt-4">
            <Link 
            key="Change password" 
            href="/dashboard/settings/account/password" 
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3"
            >
            <LockClosedIcon className="w-6" />
            <p className="hidden md:block">Change password</p>
            </Link>
        </div>
        <div className="mt-4">
            <Link 
            key="Reset progress" 
            href="/dashboard/settings/account/progress" 
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3"
            >
            <ScaleIcon className="w-6" />
            <p className="hidden md:block">Reset Progress</p>
            </Link>
        </div>
        <div className="mt-4">
            <Link 
            key="Delete Account" 
            href="/dashboard/settings/account/delete" 
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3"
            >
            <TrashIcon className="w-6" />
            <p className="hidden md:block">Delete Account</p>
            </Link>
        </div>
        </main>
    );
}