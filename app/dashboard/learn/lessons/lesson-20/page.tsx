import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson20-form';
 
export const metadata: Metadata = {
  title: 'Lesson 20',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 20: Pizzicato</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Pizzicato is a more advanced and challenging technique compared to others. Originally used in bowed string instruments like the violin or viola, it can also be applied to the guitar. It involves plucking the strings with the fingers in a specific manner to achieve a distinct sound.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Simple Pizzicato</h2>
            <p>First, let&apos;s look at how to perform pizzicato on natural strings, meaning without using the left hand. These pizzicatos are easier to execute and require minimal technique. Follow these steps:
            </p>
            <ul className="list-disc">
                <li>
                    <p>Position yourself at the 12th fret of your guitar. This works at this fret but also at others like the 7th.</p>
                </li>
                <li>
                    <p>Now, lay your left index finger across all strings, forming a barre chord. You need to rest the finger, not press the strings.</p>
                </li>
                <li>
                    <p>Pluck a string with your right hand; it should produce the note found at the 12th fret but in a more subtle and melodic way.</p>
                </li>
            </ul>
            <p className="mt-2">If the note sounds too faint, you might be lightly brushing the string; remember, it&apos;s just a gentle touch. If it sounds like you&apos;re not touching any fret, you&apos;re applying too little force. If you&apos;re not satisfied with the sound, try lifting the left index finger as soon as you pluck the string with your right hand; this will enhance the sound, making it louder and more pleasant.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Advanced Pizzicato</h2>
            <p>There&apos;s another type of pizzicato, more complex but with the same principles as the simple one, that allows you to play any note as pizzicato. With the simple pizzicato, we could only play notes at certain frets, like the 12th. Let&apos;s learn how to perform this advanced technique, remember to be patient, and if it&apos;s not very clear, look for more references online.
            </p>
            <ul className="list-disc">
                <li>
                    <p>Go back to the 12th fret but this time, don&apos;t use your left hand at all.</p>
                </li>
                <li>
                    <p>Position your right hand as shown in the image:</p>
                </li>
                <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                    <Image
                        src="/lessons/lesson-20/hand.png"
                        width={200}
                        height={200}
                        alt="Hand position image"
                    />
                </div>
                <li>
                    <p>Next, place your index finger on a string at the 12th fret. We recommend starting with string 1, as it will be easier to position your hand.</p>
                </li>
                <li>
                    <p>With your hand in the same posture as before, position your middle finger to pluck the string as you would normally with your right hand.</p>
                </li>
                <li>
                    <p>Pluck the string forcefully while keeping the index finger lightly pressed. You should hear the same sound as before.</p>
                </li>
            </ul>
            <p className="mt-2">You can apply the same tips as for simple pizzicato. You might wonder, if it&apos;s the same, what&apos;s the advanced one for? You&apos;ve played the string openly, but try the following:
            </p>
            <ul className="list-disc">
                <li>
                    <p>Place your left hand at the first fret of string 1.</p>
                </li>
                <li>
                    <p>Position your right hand in the same posture as in advanced pizzicato but at the 13th fret.</p>
                </li>
                <li>
                    <p>Pluck in the same way as before.</p>
                </li>
            </ul>
            <p className="mt-2">This way, you&apos;ll play the F note. If you&apos;ve noticed, the 12th fret acts like the nut of the guitar. You can play any note as long as you calculate the distance to position your right index finger correctly. For example, if you wanted to pluck the third fret of string 1 with this technique, you should position your right index finger at the 15th fret (12+3).
            </p>
            <p className="mt-2"><b>Exercise:</b> Try playing the C major scale as you did in the scale lesson but using the pizzicato technique. Then, answer the quiz honestly.
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
                        href="/dashboard/learn/lessons/lesson-19"
                        className="flex items-center justify-start mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}