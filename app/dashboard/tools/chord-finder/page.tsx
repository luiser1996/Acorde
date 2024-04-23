import { Metadata } from 'next';
import { lora } from '@/app/ui/fonts';
 
export const metadata: Metadata = {
  title: 'Chord Finder',
};

export default function Page() {
    return (
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
        <h1 className={`${lora.className} text-2xl`}>Chord Finder</h1>
    </div>
    
    </div>
    );
}