import Form from '@/app/ui/dashboard/editProfile-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
 
export const metadata: Metadata = {
  title: 'User Settings',
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

    const currentUrl: string = "/dashboard/settings";

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Settings', href: '/dashboard/settings' },
            {
                label: 'User Settings',
                href: `/dashboard/settings/user`,
                active: true,
            },
            ]}
        />
        <Form currentUser={currentUser} currentUrl={currentUrl} />
        </main>
    );
}