import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson8-form';
 
export const metadata: Metadata = {
  title: 'Lesson 8',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 8: Read chords and notes</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Now that you understand how tones, semitones, and the left and right hand technique work, it&apos;s time to play something.
            </p>
            <p>A chord is a set of two or more notes played at the same time. To talk about chords, we need to discuss notes first. In lesson 7, we extensively discussed notes. If you don&apos;t remember, we recommend you go back to that lesson. When we play two or more notes at once, we&apos;ll be playing a chord. Reading chords is as easy as reading each note that makes up the chord.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/chords/C/C.png"
                    width={200}
                    height={200}
                    alt="C maj chord"
                />
            </div>
            <p>This is the simplest chord there is, C major. In the image, we can see the six strings and the frets. When not specified otherwise, the top fret refers to the nut. The blue dots refer to the fingers we will place, the number indicates which finger we will use. The index finger is 1, the middle finger is 2, the ring finger is 3, and if the pinky finger is needed, it&apos;s 4. In this case, the index finger goes to fret 1 of the second string, the middle finger goes to fret 2 of the fourth string, and the ring finger goes to fret 3 of the fifth string. Now, you need to pay attention to the top part representing the nut. The cross on the 6th string means it&apos;s not played in this chord, if nothing is indicated, it means it&apos;s played, and the circles on the 1st and 3rd strings mean they are played open, without placing a finger on any fret.
            </p>
            <p className="mt-2">When we have the left hand positioned as indicated in the chord, we simply play the strings that are indicated. Congratulations! You&apos;ve played your first chord. Reading sheet music is more complex than reading tabs, and for now, we won&apos;t teach you how to do it, as it requires more advanced knowledge of music and solfege. As the name of the application suggests, we will focus mainly on chords, as they are the simplest and most effective way to play any song. Sometimes we&apos;ll need to pluck, and chords won&apos;t serve to represent this. To solve this, we&apos;ll use a diagram similar to the one we used in lesson 7 on tones and semitones.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-8/note.png"
                    width={400}
                    height={400}
                    alt="Diagram"
                />
            </div>
            <p>This is a basic tablature where we see a 3 on the second string. This represents that we should play fret 3 of the second string, with this, we would be playing the note D. If more numbers appeared in this tablature, they would form a melody.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-8/chord.png"
                    width={400}
                    height={400}
                    alt="Diagram"
                />
            </div>
            <p>In this tablature, there are 4 numbers at the same height, indicating that they are played at the same time, forming a chord, in this case, the same C major chord. This is another way to represent chords.
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
                        href="/dashboard/learn/lessons/lesson-7"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-9"
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