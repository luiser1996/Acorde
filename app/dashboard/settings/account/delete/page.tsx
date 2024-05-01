import Form from '@/app/ui/dashboard/deleteAccount-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
 
export const metadata: Metadata = {
  title: 'Delete Account',
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

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Settings', href: '/dashboard/settings' },
            { label: 'Account Settings', href: '/dashboard/settings/account' },
            {
                label: 'Delete Account',
                href: `/dashboard/settings/account/delete`,
                active: true,
            },
            ]}
        />
        <Form currentUser={currentUser} />
        </main>
    );
}