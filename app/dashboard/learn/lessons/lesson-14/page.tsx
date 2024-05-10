import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson14-form';
 
export const metadata: Metadata = {
  title: 'Lesson 14',
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
                href="/dashboard/learn/emerging-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 14: Arpeggios</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>In this lesson, we&apos;ll delve into another technique to enrich your sound: arpeggios.
            </p>
            <h2 className={`${nunito.className} font-semibold mt-4 mb-4 text-xl`}>What is an Arpeggio?</h2>
            <p>An arpeggio is when you play the notes of a chord individually, one after the other, instead of strumming them all simultaneously. These notes can be played either ascending or descending. Think of it as playing a scale made up exclusively of the chord&apos;s notes. Let&apos;s go over the technique you can use to play them.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">C</h1>
                <Image
                    src="/chords/C/C.png"
                    width={200}
                    height={200}
                    alt="C maj chord"
                />
            </div>
            <p>Let&apos;s start with our familiar chord, C major. Rest your right thumb on the fifth string, and your index, middle, and ring fingers on the following strings. With your left hand positioned, play the strings from the lowest to the highest in sequence, akin to a scale. Begin with the fifth string, then the fourth, and so forth. This forms a basic arpeggio. Once you&apos;ve mastered this, let&apos;s move on to something a bit more challenging.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-14/arpegio1.png"
                    width={400}
                    height={400}
                    alt="Arpeggio image"
                />
            </div>
            <p>If you follow this tab, you will play an ascendant arpeggio. When you reach the highest note you go back and play the notes backwards until you reach the lowest note, just as we saw in the scales lesson.
            </p>
            <p className="mt-2"><b>Exercise:</b> Apply this technique to the C chord.</p>
            <h2 className={`${nunito.className} font-semibold mt-4 mb-4 text-xl`}>Arpeggio of a Chord Progression</h2>
            <p>With arpeggios, we can play through a chord progression, similar to strumming chords in a song, but instead, we play them individually, chord by chord. Let&apos;s play through the following chord progression: C, Am, Dm, and G7. Some of these chords may be new to you; we recommend looking them up in the chord search tool. Now let&apos;s see how to play them:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-14/arpegio2.png"
                    width={700}
                    height={700}
                    alt="Arpeggio image"
                />
            </div>
            <p>Practice until you&apos;re comfortable, initially strumming the chords until you&apos;re fluent. Once you&apos;ve mastered the left hand, try using the right hand to pluck each string individually without forming any chords. When you&apos;re comfortable, try combining both hands. Now, let&apos;s add some complexity to the melody.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-14/arpegio3.png"
                    width={700}
                    height={700}
                    alt="Arpeggio image"
                />
            </div>
            <p><b>Exercise:</b> Apply the same process to this arpeggio. Once you&apos;ve mastered it, answer the quiz below honestly.
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
                        href="/dashboard/learn/lessons/lesson-13"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-15"
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