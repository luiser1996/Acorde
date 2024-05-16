import Pagination from '@/app/ui/tabs/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tabs/table';
import { Admin, MyTabs } from '@/app/ui/tabs/buttons';
import { nunito } from '@/app/ui/fonts';
import { TabsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTabsPages, getUser } from '@/app/lib/data';
import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth } from '@/auth';
 
export const metadata: Metadata = {
  title: 'Tabs Explore',
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
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTabsPages(query);

  const session = await auth();
  const user = session?.user;
  const email: string = user?.email || '';

  const currentUserInfo = await getUser(email);
  const blankUser : User = generateBlankUser();
  const currentUser: User = currentUserInfo || blankUser;

  const admin = currentUser.admin;

  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${nunito.className} text-2xl`}>Tabs Explore</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <MyTabs />
          {admin && (
            <>
              <Admin />
            </>
          )}
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