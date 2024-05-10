import { Metadata } from 'next';
import { nunito } from '@/app/ui/fonts';
import Image from 'next/image';
import { EditProfile } from '@/app/ui/dashboard/buttons';
import { auth, getUser } from '@/auth';
import { User } from '@/app/lib/definitions';
import { fetchUserAchievements } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Profile',
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

  const userAchievements = await fetchUserAchievements(currentUser);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${nunito.className} text-2xl`}>Profile</h1>
      </div>
      <div className="mr-4 flex justify-end">
        <EditProfile />
      </div>
      <div className="flex flex-col items-center">
        {/* Imagen de perfil */}
        <div className="rounded-full overflow-hidden border-2 border-gray-200 w-52 h-52 flex items-center justify-center">
        {currentUser.image_url ? (
          <Image src={currentUser.image_url} alt="Profile Picture" width={300} height={300} />
        ) : (
          <Image src="/default-profile-image.png" alt="Profile Picture" width={300} height={300} />
        )}
        </div>
        {/* Nombre de usuario */}
        <p className="mt-4 font-semibold text-lg">{currentUser.name}</p>
      
        {/* Línea horizontal */}
        <div className="w-1/2 border-t border-gray-300 mt-8"></div>
      </div>
      <div className="flex w-full mt-4 items-center justify-between">
        <h1 className={`${nunito.className} text-lg`}>Logros</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {userAchievements.map((achievement) => (
          <div key={achievement.id} className="bg-white p-2 rounded-lg flex items-center justify-center flex-col shadow-md">
            <Image
              src="/medalla.png"
              width={120}
              height={120}
              alt="Achievement image."
            />
            <div className="text-center">
              <h2 className="text-base font-semibold mt-2">{achievement.name}</h2>
              <p className="text-xs text-gray-600">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}