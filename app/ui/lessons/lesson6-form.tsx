'use client';

import { User } from '@/app/lib/definitions';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { completeLesson, getAchievements } from '@/app/lib/actions';
import { useState } from 'react';
import { nunito } from '../fonts';
import Link from 'next/link';

// Formulario de la lección
export default function Lesson6Form({
  currentUser
}: {
  currentUser: User;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const checkLesson6 = () => {
        if (selectedOption === 'trueH') {
            setResultMessage('You made it!. Now you are prepared to start playing.');
            completeLesson(currentUser, 'a390fda4-b2ba-48b8-829d-0ff514a45e4b');
            getAchievements(currentUser);
        } else {
            if (selectedOption === 'trueF'){
                setResultMessage(null);
                setErrorMessage('At least you are being honest about being dishonest.');
            }
            else{
                setResultMessage(null);
                setErrorMessage('Please keep trying.');
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedOption === null) {
            setErrorMessage('Please select an option.');
        } else {
            checkLesson6();
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setResultMessage(null);
        setErrorMessage(null);
    };
 
    return <form onSubmit={handleSubmit}>
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold text-xl`}>Go to our {''}
                <Link legacyBehavior href="/dashboard/tools/tuner">
                    <a className="text-blue-500 hover:underline">tuner</a>
                </Link>{''} and tune your guitar.
            </h2>
            <div className="options">
                <div className="option mt-4 mb-4">
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="trueH"
                        className="mr-4"
                        checked={selectedOption === 'trueH'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option1">My guitar is now tuned (I&apos;m being honest).</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="trueF"
                        className="mr-4"
                        checked={selectedOption === 'trueF'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option2">My guitar is tuned (I&apos;m not being honest).</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="falseH"
                        className="mr-4"
                        checked={selectedOption === 'falseH'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option3">My guitar is not tuned.</label>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit">Check Answer</Button>
            </div>
        </div>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage.toString()}</p>
          </>
        )}
        </div>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
        {resultMessage && (
          <>
            <CheckBadgeIcon className="h-5 w-5 text-green-500" />
            <p className="text-sm text-green-500">{resultMessage.toString()}</p>
          </>
        )}
        </div>
    </form>
}