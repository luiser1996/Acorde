import Form from '@/app/ui/dashboard/editProfile-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit Profile',
};
 
export default async function Page() {
    const session = await auth();
    if (!session || !session.user) {
        return <div>Error: No user session found.</div>;
    }
    const email = session.user?.email ?? '';

    const currentUser = await getUser(email);

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