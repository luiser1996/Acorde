import Pagination from '@/app/ui/tabs/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tabs/admin-table';
import { TabsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAdminTabsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { redirect } from 'next/navigation';
 
export const metadata: Metadata = {
  title: 'Admin tabs',
};

function generateBlankUser(): User {
    return {
      id: 'randomId123',
      name: 'Blank User',
      email: 'blank@example.com',
      password: 'randomPassword',
    };
}
 
export default async function Page({
    searchParams,
}: {
    searchParams?: {
      query?: string;
      page?: string;
    };
}) {
    const session = await auth();
    const user = session?.user;
    const email: string = user?.email || '';

    const currentUserInfo = await getUser(email);
    const blankUser : User = generateBlankUser();
    const currentUser: User = currentUserInfo || blankUser;
    const admin = currentUser.admin;

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchAdminTabsPages(query);

    if (admin){
        return (
            <div className="w-full">
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Tabs Explore', href: '/dashboard/tabs' },
                    {
                        label: 'Admin Tabs',
                        href: '/dashboard/tabs/admin',
                        active: true,
                    },
                    ]}
                />
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search tabs..." />
                </div>
                <Suspense key={query + currentPage} fallback={<TabsTableSkeleton />}>
                    <Table query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        );
    }
    else{
        redirect('/dashboard/tabs');
    }
}