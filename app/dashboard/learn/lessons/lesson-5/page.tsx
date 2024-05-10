import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson5-form';
 
export const metadata: Metadata = {
  title: 'Lesson 5',
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
                href="/dashboard/learn/beginner-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 5: Left hand</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>The left hand technique is harder than the right one. When starting to play the tip of your fingers will definitely hurt at first. But with time and practice your fingers will get stronger and it won&apos;t hurt anymore. If you are using a metal string guitar type you will need more time for this to happen.
            </p>
            <h2 className={`${nunito.className} font-semibold mt-4 mb-4 text-xl`}>Left hand position</h2>
            <p>You position your thumb behind the neck, allowing the other fingers to freely press the strings. The pressure from the thumb adds to the fingers&apos; strength. You release this pressure after playing a note or chord, allowing your hand to move freely along the neck. Be mindful not to let your thumb hang off the guitar&apos;s neck. The palm of your hand should not touch the guitar neck, as this allows the other fingers to work freely, providing them with ample strength to press the strings. For the most part you have to make an &quot;O&quot; with your hand.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-5/izq1.png"
                    width={155}
                    height={155}
                    alt="Left hand position technique"
                />
            </div>
            <p>It&apos;s crucial to maintain the correct (natural) position while playing, relaxed and without any tension, avoiding stress and aiming to establish good habits from the start. No crossing your legs behind the chair legs or slouching, okay? Good.
            </p>
            <p>Ensure that the fingers pressing the strings don&apos;t mute the sound of adjacent strings and that they press the strings by applying pressure at approximately two-thirds of the distance between one fret and the next.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-5/izq2.png"
                    width={155}
                    height={155}
                    alt="Left hand position technique"
                />
            </div>
            <p>It&apos;s very important that your fingers are, as close to the bottom fret of the note you are playing, as you can. If not, the sound will be very poor and you&apos;ll need to play the strings harder with your right hand. This is very inconvenient, because the sound will be terrible. When you are not playing any note, your fingers have to be as relaxed as you can, to avoid any type of unnecessary tension.</p>
        
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
                        href="/dashboard/learn/lessons/lesson-4"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-6"
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