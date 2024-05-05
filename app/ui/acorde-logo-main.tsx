import { nunito } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcordeLogo() {
  return (
    <div
      className={`${nunito.className} flex flex-row items-center leading-none text-black`}
    >
      <Image
        src="/logo.png"
        width={120}
        height={120}
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
      <p className="hidden md:block text-[70px] font-semibold">Acorde</p>
      <p className="block md:hidden text-[50px] font-semibold">Acorde</p>
    </div>
  );
}