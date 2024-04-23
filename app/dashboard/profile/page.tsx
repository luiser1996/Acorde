import { Metadata } from 'next';
import { lora } from '@/app/ui/fonts';
import Image from 'next/image';
import { getCurrentUser } from '@/auth';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lora.className} text-2xl`}>Profile</h1>
      </div>
      <div className="flex flex-col items-center">
        {/* Imagen de perfil */}
        <div className="rounded-full overflow-hidden border-2 border-gray-200 w-52 h-52 flex items-center justify-center">
          <Image src="/customers/amy-burns.png" alt="Profile Picture" width={328} height={328} />
        </div>
        {/* Nombre de usuario */}
        <p className="mt-4 font-bold text-lg">{currentUser?.name}</p>
        {/* Seguidores 
        <div className="flex items-center mt-2">
          <span className="mr-4">{currentUser?.followers.length}</span>
          <span>Seguidores</span>
          <span className="ml-10">Siguiendo</span>
          <span className="ml-4 mr-4">{currentUser?.following.length}</span>
        </div>
        */}
        {/* Línea horizontal */}
        <div className="w-1/2 border-t border-gray-300 mt-4"></div>
      </div>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lora.className} text-lg`}>Logros</h1>
      </div>
    </div>
  );
}