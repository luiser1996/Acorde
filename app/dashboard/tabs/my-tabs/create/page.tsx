import Form from '@/app/ui/tabs/create-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { Metadata } from 'next';
import { fetchChords } from '@/app/lib/data';
import { auth, getUser } from '@/auth';
import { User } from '@/app/lib/definitions';
 
export const metadata: Metadata = {
  title: 'Create Tab',
};

function generateBlankUser(): User {
    return {
      id: 'randomId123',
      name: 'Blank User',
      email: 'blank@example.com',
      password: 'randomPassword',
    };
}
 
export default async function Page() {
    const session = await auth();
    const user = session?.user;
    const email: string = user?.email || '';

    const currentUserInfo = await getUser(email);
    const blankUser : User = generateBlankUser();
    const currentUser: User = currentUserInfo || blankUser;

    const chords = await fetchChords();
 
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Tabs Explore', href: '/dashboard/tabs' },
            { label: 'My Tabs', href: '/dashboard/tabs/my-tabs' },
            {
                label: 'Create Tab',
                href: '/dashboard/tabs/my-tabs/create',
                active: true,
            },
            ]}
        />
        <Form chords={chords} currentUser={currentUser} />
        </main>
    );
}