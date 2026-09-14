import { Metadata } from 'next';
import ShowTab from '@/app/ui/tabs/show-tab';
import { isTabOwner, isTabPublic } from '@/app/lib/data';
import { auth, getUser } from '@/auth';
import { User } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Tab',
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
    params,
}: { 
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const published = await isTabPublic(id);

    const session = await auth();
    const user = session?.user;
    const email: string = user?.email || '';

    const currentUserInfo = await getUser(email);
    const blankUser : User = generateBlankUser();
    const currentUser: User = currentUserInfo || blankUser;
    const admin = currentUser.admin;
    const owner = await isTabOwner(id, currentUser.id);

    if (admin || published || owner){
        return (
            <main>
                <ShowTab id={id} currentUser={currentUser} />
            </main>
        );
    }
    else {
        redirect('/dashboard/tabs');
    }
}