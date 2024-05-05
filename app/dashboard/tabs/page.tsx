import { Metadata } from 'next';
import { nunito } from '@/app/ui/fonts';
 
export const metadata: Metadata = {
  title: 'Tabs',
};

export default function Page() {
    return (
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
        <h1 className={`${nunito.className} text-2xl`}>Tabs</h1>
    </div>
    
    </div>
    );
}