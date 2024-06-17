'use client';

import { User } from '@/app/lib/definitions';
import { nunito } from '../fonts';

// Formulario de la lección
export default function Lesson9({
  currentUser
}: {
  currentUser: User;
}){
    return(
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold text-xl`}>Create the tab for the exercise or one of your own. When you&apos;re done, this lesson will be marked as completed.</h2>
        </div>
    );
}