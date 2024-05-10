import { Metadata } from 'next';
import { nunito } from '@/app/ui/fonts';
import { fetchLessons } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { isLessonCompleted } from '@/app/lib/actions';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Learn',
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
  
  const lessons = await fetchLessons();

  const lessons1 = lessons.slice(0, 5);
  const completedLessons1 = await Promise.all(lessons1.map(async (lesson) => {
    const result = await isLessonCompleted(currentUser, lesson.id);
    return result;
  }));
  const lessonsCompleted1 = completedLessons1.filter(lessonCompleted => lessonCompleted).length;

  const lessons2 = lessons.slice(5, 10);
  const completedLessons2 = await Promise.all(lessons2.map(async (lesson) => {
    const result = await isLessonCompleted(currentUser, lesson.id);
    return result;
  }));
  const lessonsCompleted2 = completedLessons2.filter(lessonCompleted => lessonCompleted).length;

  const lessons3 = lessons.slice(10, 15);
  const completedLessons3 = await Promise.all(lessons3.map(async (lesson) => {
    const result = await isLessonCompleted(currentUser, lesson.id);
    return result;
  }));
  const lessonsCompleted3 = completedLessons3.filter(lessonCompleted => lessonCompleted).length;

  const lessons4 = lessons.slice(15, 17);
  const completedLessons4 = await Promise.all(lessons4.map(async (lesson) => {
    const result = await isLessonCompleted(currentUser, lesson.id);
    return result;
  }));
  const lessonsCompleted4 = completedLessons4.filter(lessonCompleted => lessonCompleted).length;

  const lessons5 = lessons.slice(17, 20);
  const completedLessons5 = await Promise.all(lessons5.map(async (lesson) => {
    const result = await isLessonCompleted(currentUser, lesson.id);
    return result;
  }));
  const lessonsCompleted5 = completedLessons5.filter(lessonCompleted => lessonCompleted).length;

  const categories = [
    { title: 'Beginner Guitarist', description: 'Start your journey with the basics. Learn about guitar structure, posture, and basic techniques.', lessonsCompleted: `${lessonsCompleted1}`, totalLessons: 5 },
    { title: 'Promising Guitarist', description: 'Progress further. Master chords, and scales.', lessonsCompleted: `${lessonsCompleted2}`, totalLessons: 5 },
    { title: 'Emerging Guitarist', description: 'Dive deeper into your guitar journey. Explore basic melodies, chords, and techniques.', lessonsCompleted: `${lessonsCompleted3}`, totalLessons: 5 },
    { title: 'Star Guitarist', description: 'Shine bright with your guitar skills. Complete a wide range of lessons, including advanced melodies and chords.', lessonsCompleted: `${lessonsCompleted4}`, totalLessons: 2 },
    { title: 'Master Guitarist', description: 'Become a master of the guitar. Explore optional lessons covering advanced techniques like slides, hammer-ons, and pull-offs.', lessonsCompleted: `${lessonsCompleted5}`, totalLessons: 3 },
  ];

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${nunito.className} text-2xl`}>Learn</h1>
      </div>
      <div className="mt-4 space-y-4">
        {categories.map((category, index) => (
          <Link legacyBehavior href={`/dashboard/learn/${category.title.toLowerCase().replace(/\s/g, '-')}`} key={index}>
            <a className="block p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition-colors duration-300 ease-in-out">
              <h2 className="text-lg font-semibold">{category.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{category.description}</p>
              <div className="flex items-center mt-4">
                <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${(parseInt(category.lessonsCompleted) / category.totalLessons) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{`${category.lessonsCompleted}/${category.totalLessons} Lessons Completed`}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}