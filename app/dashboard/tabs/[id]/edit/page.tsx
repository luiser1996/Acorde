import Form from '@/app/ui/tabs/edit-form';
import { Metadata } from 'next';
import { fetchChords, fetchTabById, fetchTabChords, isTabFinished, isTabOwner } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
 
export const metadata: Metadata = {
  title: 'Edit Tab',
};

function generateBlankUser(): User {
    return {
      id: 'randomId123',
      name: 'Blank User',
      email: 'blank@example.com',
      password: 'randomPassword',
    };
}
 
export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const chords = await fetchChords();
    const tab = await fetchTabById(id);
    const chosenChords = await fetchTabChords(id);
    const finished = await isTabFinished(id);

    const session = await auth();
    const user = session?.user;
    const email: string = user?.email || '';

    const currentUserInfo = await getUser(email);
    const blankUser : User = generateBlankUser();
    const currentUser: User = currentUserInfo || blankUser;
    const admin = currentUser.admin;

    const owner = await isTabOwner(id, currentUser.id);
    
    if(admin){
        return (
            <main>
                <Form tab={tab} chords={chords} chosenChords={chosenChords} />
            </main>
        );
    }
    else{
        if(!finished && owner){
            return (
                <main>
                    <Form tab={tab} chords={chords} chosenChords={chosenChords} />
                </main>
            );
        }
        else{
            redirect('/dashboard/tabs');
        }
    }
}