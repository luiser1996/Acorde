import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson7-form';
 
export const metadata: Metadata = {
  title: 'Lesson 7',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 7: Tones and semitones</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Throughout the fretboard, frets are installed at intervals, dividing each string into notes. When a string is fretted over a space between two frets (often called frets), and plucked (or picked) with the right hand, the string vibrates between the fret and the bridge, producing a note.
            </p>
            <p>To learn and understand how the notes are positioned on the fretboard, we need to know how the musical scale is structured. We know that the musical scale consists of the tones Do, Re, Mi, Fa, Sol, La, and Si. Now, there is a tonal distance between each tone:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-7/tones.png"
                    width={700}
                    height={700}
                    alt="Tones and semitones"
                />
            </div>
            <p>The tonal distance (interval) between Mi and Fa, and between Si and Do is a semitone (or 1/2 tone). To understand how the musical scale is applied on the guitar, and to comprehend those tonal distances, let&apos;s analyze the notes we can find on the 5th string (A string).
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-7/d1.png"
                    width={800}
                    height={800}
                    alt="Diagram"
                />
            </div>
            <p>The above diagram represents the fretboard, the top line is the first string (high E), and the bottom line is the sixth string (low E). The numbers above tell you the number of spaces between the frets, taking the one closest to the nut as the first.
            </p>
            <p>As you can see, there is a skipped space between the note produced by the 5th string when played open (A) and the note B, the next note in the musical scale. This is because there is a distance of 1 tone between A and B, meaning that if we &quot;walk&quot; space by space along the fretboard on any string, we will be advancing in semitones. Now we see that right after the note B, on the third space, we find the note C. Take another look at the tonal distance graph, and you will realize that between these two notes (B and C), there is a distance of 1/2 tone, which is why there is no space between these two notes like between A and B.
            </p>
            <p>Until we reach the 12th space where we find the note A again. If we go through the notes of each string up to the 12th space of each one, the same thing will happen, we will find the same note we started with. Here is the diagram with all the notes:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-7/d2.png"
                    width={800}
                    height={800}
                    alt="Diagram"
                />
            </div>
            <p><b>Exercise:</b> Play the notes of each string, from the first note obtained by playing the string open (open) to the 12th fret. Starting with the 6th string (low E) and ending with the 1st string (high E) without looking at the diagram, and say aloud the name of the note you play. Remember, there is no intermediate space between &apos;B&apos; and &apos;C&apos;, nor between &apos;E&apos; and &apos;F&apos;.
            </p>
            <p>Don&apos;t bother using several fingers of your left and right hand to do it, use only your index fingers. One to fret the strings (use its tip to do so, well pressed) and the other to pluck the strings.
            </p>
            <h2 className={`${nunito.className} font-semibold mt-4 mb-4 text-xl`}>Sharps and Flats</h2>
            <p>You may wonder now, what are the blank spaces called? Well, the notes we see in the previous diagram (C-D-E-F-G-A-B) are called notes with proper names, among them are those intermediate spaces that are also notes. These notes are sharps and/or flats.
            </p>
            <p className="mt-2"><b>Sharp:</b> Note raised by a semitone (sharper). It is symbolized by the sign #.
            </p>
            <p className="mt-2 mb-2"><b>Flat:</b> Note lowered by a semitone (flatter). It is symbolized by the sign b.
            </p>
            <p>For example, the note found on the third fret on the second string is D. When we make it sharp, we advance one semitone, and when we make it flat, we retreat one semitone. Let&apos;s see how this looks in a diagram:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-7/d3.png"
                    width={400}
                    height={400}
                    alt="Diagram"
                />
            </div>
            <p>Now, what happens if we want to make the note C sharp found on the first fret on the second string - from its position, we advance one semitone -. Meaning that the note on the second fret on the second string has two names: C# and Db (both completely valid). That&apos;s why the notes that are neither sharps nor flats are called notes with proper names (they only have one name). Let&apos;s see the following diagram:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-7/d4.png"
                    width={400}
                    height={400}
                    alt="Diagram"
                />
            </div>
            <p>Now, I present a diagram that shows the notes on the fretboard including notes with proper names (in bold) and the others, but only up to the 9th fret:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-7/d5.png"
                    width={800}
                    height={800}
                    alt="Diagram"
                />
            </div>

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
                        href="/dashboard/learn/lessons/lesson-6"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-8"
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