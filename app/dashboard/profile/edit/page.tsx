import Form from '@/app/ui/dashboard/editProfile-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit Profile',
};
 
export default async function Page() {
    const { user } = await auth();
    const currentUser = await getUser(user.email);

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