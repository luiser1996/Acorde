import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson17-form';
 
export const metadata: Metadata = {
  title: 'Lesson 17',
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
                href="/dashboard/learn/star-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 17: Advanced chords</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Now that you know the capo technique for playing chords, you have everything you need to play all the chords out there. In this lesson, we&apos;ll look at some of the most commonly used ones, but you can search for any chord you want in the chord search tool and learn it.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">Cm</h1>
                <Image
                    src="/chords/C/Cm.png"
                    width={200}
                    height={200}
                    alt="C minor chord"
                />
            </div>
            <p>This is the minor version of the C chord, as you can see, you need the capo technique to play it. All the chords we&apos;ll see here require this technique.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">Gm</h1>
                <Image
                    src="/chords/G/Gm.png"
                    width={200}
                    height={200}
                    alt="G minor chord"
                />
            </div>
            <p>This is Gm, played in the same fret as Cm but slightly different.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">Fm</h1>
                <Image
                    src="/chords/F/Fm.png"
                    width={200}
                    height={200}
                    alt="F minor chord"
                />
            </div>
            <p>This is Fm, as you can see, it&apos;s exactly like Gm and very similar to F. Only the fret on which it&apos;s played changes.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">Bb</h1>
                <Image
                    src="/chords/Bb/Bb.png"
                    width={200}
                    height={200}
                    alt="Bb chord"
                />
            </div>
            <p>This is Bb, as you can see, all these chords look very similar.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">Bbm</h1>
                <Image
                    src="/chords/Bb/Bbm.png"
                    width={200}
                    height={200}
                    alt="Bbm chord"
                />
            </div>
            <p>Finally, we have Bbm, the challenge of playing these chords is being able to slide quickly across the frets.
            </p>
            <p className="mt-2">Try playing all these chords, remember to play them slowly and produce a good sound. When you learn them, try playing them from memory; since they are so similar to each other, it may be harder for you to memorize them. To test that you have succeeded, fill out the quiz.
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
                        href="/dashboard/learn/lessons/lesson-16"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-18"
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