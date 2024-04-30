import Form from '@/app/ui/dashboard/editProfile-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
 
export const metadata: Metadata = {
  title: 'Edit Profile',
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
            { label: 'Profile', href: '/dashboard/profile' },
            {
                label: 'Edit Profile',
                href: `/dashboard/profile/edit`,
                active: true,
            },
            ]}
        />
        <Form currentUser={currentUser} />
        </main>
    );
}