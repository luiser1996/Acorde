import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson18-form';
 
export const metadata: Metadata = {
  title: 'Lesson 18',
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
                href="/dashboard/learn/master-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 18: Slides</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Welcome to our advanced techniques section, first we will see slides. A slide is a technique used on the guitar to smoothly transition from one note to another by sliding your finger along the fretboard. This creates a smooth and fluid effect between notes, adding dynamics and expression to your playing.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Steps to perform a slide:</h2>
            <ul className="list-disc">
                <li>
                    <p><b>Hand Position:</b> Place your left hand (if you&apos;re right-handed) on the guitar neck. Ensure your fingers are curved and resting gently on the strings.</p>
                </li>
                <li>
                    <p><b>Select the Starting Note:</b> Choose the note from which you want to begin the slide. You can start on any fret and any string.</p>
                </li>
                <li>
                    <p><b>Press the String:</b> Use your index, middle, or ring finger to press down on the string at the fret where the starting note is located. Make sure to apply enough pressure for the note to sound clear and strong.</p>
                </li>
                <li>
                    <p><b>Slide the Finger:</b> Without lifting your finger off the string, smoothly slide it up or down along the fretboard until you reach the desired note. Maintain a constant and even pressure while sliding.</p>
                </li>
                <li>
                    <p><b>End on the Target Note:</b> Once you&apos;ve reached the target note, ensure to keep the pressure on the string so that the note sounds clear and defined.</p>
                </li>
                <li>
                    <p><b>Practice Precision:</b> Work on making the slide as smooth and fluid as possible. Practice controlling the speed and distance of the slide to achieve the desired effect.</p>
                </li>
            </ul>
            <p className="mt-2">In a tab, this is represented by the character &quot;/&quot; if it&apos;s an ascending slide or &quot;\&quot; if it&apos;s descending. Look at this part of the song &quot;Stairway to Heaven&quot; by Led Zeppelin. The slide goes from fret 0 to fret 8 on the fifth string.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-18/slide.png"
                    width={600}
                    height={600}
                    alt="Slide tab"
                />
            </div>
            <p className="mt-2">As you practice slides, start with slow and short slides, gradually increasing speed and distance. Keep your fingers close to the strings to minimize noise and experiment with different note combinations and frets. Listen to professional guitarists for inspiration and examples, and remember to practice regularly and be patient as you develop this technique! Slides can add a unique touch to your guitar playing and enhance your musical expression.
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
                        href="/dashboard/learn/lessons/lesson-17"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-19"
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