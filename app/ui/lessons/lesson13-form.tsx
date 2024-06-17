'use client';

import { User } from '@/app/lib/definitions';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { completeLesson, getAchievements } from '@/app/lib/actions';
import { useState } from 'react';
import { nunito } from '../fonts';

// Formulario de la lección
export default function Lesson13Form({
  currentUser
}: {
  currentUser: User;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const checkLesson13 = () => {
        if (selectedOption === 'raise') {
            setResultMessage("Awesome! Its main purpose is to raise the pitch of our song.");
            completeLesson(currentUser, '680387e3-00ba-4bd6-a2a2-922e1d6c3e39');
            getAchievements(currentUser);
        } else {
            setResultMessage(null);
            setErrorMessage('Incorrect! Please select the correct option.');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedOption === null) {
            setErrorMessage('Please select an option.');
        } else {
            checkLesson13();
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setResultMessage(null);
        setErrorMessage(null);
    };
 
    return <form onSubmit={handleSubmit}>
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold text-xl`}>What is the purpose of using a capo in guitar playing?</h2>
            <div className="options">
                <div className="option mt-4 mb-4">
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="fewer"
                        className="mr-4"
                        checked={selectedOption === 'fewer'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option1">To play chords with fewer fingers.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="lower"
                        className="mr-4"
                        checked={selectedOption === 'lower'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option2">To lower the pitch of what we&apos;re playing.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="raise"
                        className="mr-4"
                        checked={selectedOption === 'raise'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option3">To raise the pitch of what we&apos;re playing.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option4"
                        name="options"
                        value="dampen"
                        className="mr-4"
                        checked={selectedOption === 'dampen'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option4">To dampen the sound of the guitar strings.</label>
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