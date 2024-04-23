import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lora } from '@/app/ui/fonts';

export default function AcordeLogo() {
  return (
    <div
      className={`${lora.className} flex flex-row items-center leading-none text-black`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[48px] font-semibold">Acorde</p>
    </div>
  );
}
