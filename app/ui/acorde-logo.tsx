import { nunito } from '@/app/ui/fonts';
import Image from 'next/image';

// Función reutilizable para mostrar el logo de la aplicación
export default function AcordeLogo() {
  return (
    <div
      className={`${nunito.className} flex flex-row items-center leading-none text-black`}
    >
      <Image
        src="/logo.png"
        width={70}
        height={70}
        className="hidden md:block"
        alt="Acorde logo"
      />
      <Image
        src="/logo.png"
        width={56}
        height={56}
        className="block md:hidden"
        alt="Acorde logo mobile"
      />
      <p className="text-[40px] font-semibold">Acorde</p>
    </div>
  );
}