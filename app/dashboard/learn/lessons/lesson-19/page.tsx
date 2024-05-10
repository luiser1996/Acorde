import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson19-form';
 
export const metadata: Metadata = {
  title: 'Lesson 19',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 19: Hammer-on and pull-off</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Hammer-ons and pull-offs are fundamental techniques on the guitar that allow you to create additional notes smoothly and expressively without needing to re-strum the strings. These techniques are essential for adding dynamics and fluidity to your playing style. Here&apos;s a brief guide to learning these techniques:
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Hammer-On</h2>
            <ul className="list-disc">
                <li>
                    <p><b>Hand Position:</b> Start by placing your left hand (if you&apos;re right-handed) on the guitar neck. Ensure your fingers are curved and resting lightly on the strings.</p>
                </li>
                <li>
                    <p><b>Select the Starting Note:</b> Choose the note where you want to begin the hammer-on. You can start on any fret and any string.</p>
                </li>
                <li>
                    <p><b>Press the String:</b> Use one of your free fingers (usually the index, middle, or ring finger) to press down the string at the fret where the starting note is located. Apply enough pressure for the note to sound clear and strong.</p>
                </li>
                <li>
                    <p><b>Hammer the Note:</b> Without lifting the finger you just pressed, forcefully &quot;hammer&quot; another finger onto a higher fret on the same string. This will create a new note without needing to re-strum the string.</p>
                </li>
            </ul>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-19/hammer.png"
                    width={500}
                    height={500}
                    alt="Hammer-on tab"
                />
            </div>
            <p>Hammer-ons are represented in tabs with a &quot;h&quot; between the two notes to join.</p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Pull-Off</h2>
            <ul className="list-disc">
                <li>
                    <p><b>Hand Position:</b> Keep your hand in the same position as for the hammer-on.</p>
                </li>
                <li>
                    <p><b>Select the Starting Note:</b> Choose the note where you want to start the pull-off. This time, start on a higher fret on the same string where you performed the hammer-on.</p>
                </li>
                <li>
                    <p><b>Press the String:</b> Use one of your fingers to press down the string at the fret where the starting note of the pull-off is located.</p>
                </li>
                <li>
                    <p><b>Pull Off the Finger:</b> Without lifting your hand, quickly &quot;pull off&quot; the finger that&apos;s pressing the string. This will create a new note, producing a smooth transition effect between the two notes.</p>
                </li>
            </ul>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-19/pull.png"
                    width={250}
                    height={250}
                    alt="Pull-off tab"
                />
            </div>
            <p>Pull-offs are represented in tabs with a &quot;p&quot; between the two notes to join.</p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Practice and Tips:</h2>
            <p>Hammer-ons and pull-offs are essential techniques on the guitar that allow you to create additional notes smoothly and expressively, without needing to re-strum the strings. To practice, start slowly, ensuring each note sounds clear and uniform. Focus on maintaining fluidity and experiment with different note combinations and rhythm patterns to develop your own style. Listen to professional guitarists for inspiration and learn new applications of these techniques. Practice regularly to improve your skill and control in executing hammer-ons and pull-offs. With dedication and consistent practice, you&apos;ll master these techniques and add a unique and expressive touch to your guitar repertoire. Keep practicing and enjoy the learning process!
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
                        href="/dashboard/learn/lessons/lesson-18"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-20"
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