import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Form from '@/app/ui/lessons/lesson6-form';
 
export const metadata: Metadata = {
  title: 'Lesson 6',
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

  return (
    <div className="w-full flex flex-col">
        <div className="flex w-full items-center justify-between">
            <Link
                href="/dashboard/learn/promising-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 6: Tuning</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>This is one of the most challenging and important aspects for those starting to study the guitar: tuning. It&apos;s essential that your guitar is tuned, as it would be impossible to learn to play if it&apos;s not.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Note for each Guitar String</h2>
            <p>Before delving into the various methods of tuning the guitar, it&apos;s necessary to know what note each string should produce: The top string (the thickest one, also known as the 6th string) should produce the note E, followed by A, D, G, B, and the bottom string (the thinnest one, also known as the 1st string) should also produce the note E, but an octave higher, of course. This tuning is standard, although a guitar can be tuned in various ways.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Basic Tuning Method</h2>
            <p>We start by loosening the sixth string until it produces no sound, then we&apos;ll gradually tighten it until it produces a clear sound without going too far; once it&apos;s in this position, we&apos;ll consider the sixth string to be tuned. Then we move on to tuning the fifth string: after loosening it as we did before, we&apos;ll gradually tighten it until it produces the same sound as the sixth string fretted at the 5th fret. With the fifth string tuned, we continue tuning the other strings following the table below:
            </p>
            <ul className="list-disc mt-2">
                <li>
                    <p>The 6th string fretted at the 5th fret produces the same sound as the 5th string open.
                    </p>
                </li>
                <li>
                    <p>The 5th string fretted at the 5th fret produces the same sound as the 4th string open.
                    </p>
                </li>
                <li>
                    <p>The 4th string fretted at the 5th fret produces the same sound as the 3rd string open.
                    </p>
                </li>
                <li>
                    <p>The 3rd string fretted at the 4th fret produces the same sound as the 2nd string open.
                    </p>
                </li>
                <li>
                    <p>The 2nd string fretted at the 5th fret produces the same sound as the 1st string open.
                    </p>
                </li>
            </ul>
            <p>This method may require a musical or trained ear, as without it, it could be slow or even annoying, or in any case, it could be useful for training our ear.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Tuning with a Reference Note</h2>
            <p>A common way to tune the guitar is to try to match the corresponding notes that each string of our guitar should produce with another tuned instrument, such as a piano or another guitar. Before starting to tune a string, we loosen it and then tighten it until the sound matches that of the sound file.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Electric Tuner</h2>
            <p>This is the simplest method to tune your guitar, as it doesn&apos;t require any auditory skill. Simply play the string you want to tune, and the tuner will indicate whether it&apos;s below or above the correct pitch. Although electric tuners are available for purchase, they tend to be expensive. There are many free online tuners available, you can try{' '}
                <Link legacyBehavior href="/dashboard/tools/tuner">
                    <a className="text-blue-500 hover:underline">ours</a>
                </Link>{''} in the tools section and keep your guitar tuned. The buttons with the string names below reproduce the correct sound of that string tuned. Keep it in mind and use them to check if your guitar is tuned correctly. 
            </p>
        
            {/* Question */}
            <div className="flex w-full mt-8 items-center justify-between flex-col">
                <QuestionMarkCircleIcon className="w-20 mb-4 md:mb-0" />
                <div className="flex flex-col items-center justify-between md:ml-4">
                    <h2 className={`${nunito.className} font-semibold text-xl`}>It&apos;s time for a quiz!</h2>
                    <p>Test your knowledge</p>
                </div>
                <Form currentUser={currentUser} />
                <div className="flex w-full mt-8 items-center justify-between">
                    <Link
                        href="/dashboard/learn/lessons/lesson-5"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-7"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <span className="hidden md:block">Next Lesson</span><ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}