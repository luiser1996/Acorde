import { Metadata } from 'next';
import { lora } from '@/app/ui/fonts';
import Image from 'next/image';
import { EditProfile } from '@/app/ui/dashboard/buttons';
import { auth, getUser } from '@/auth';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  const { user } = await auth();
  const currentUser = await getUser(user.email);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lora.className} text-2xl`}>Profile</h1>
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
        <p className="mt-4 font-bold text-lg">{currentUser.name}</p>
      
        {/* Línea horizontal */}
        <div className="w-1/2 border-t border-gray-300 mt-8"></div>
      </div>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lora.className} text-lg`}>Logros</h1>
      </div>
    </div>
  );
}