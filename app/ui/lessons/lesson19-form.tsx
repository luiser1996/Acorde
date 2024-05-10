'use client';

import { User } from '@/app/lib/definitions';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { completeLesson, getAchievements } from '@/app/lib/actions';
import { useState } from 'react';
import { nunito } from '../fonts';

export default function Lesson19Form({
  currentUser
}: {
  currentUser: User;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const checkLesson19 = () => {
        if (selectedOption === 'smoothly') {
            setResultMessage("Cool! You are almost finished with this course.");
            completeLesson(currentUser, 'bb07fc3a-bf8d-4297-a5d8-9852c5508b10');
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
            checkLesson19();
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setResultMessage(null);
        setErrorMessage(null);
    };
 
    return <form onSubmit={handleSubmit}>
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold text-xl`}>What are hammer-ons and pull-offs?</h2>
            <div className="options">
                <div className="option mt-4 mb-4">
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="force"
                        className="mr-4"
                        checked={selectedOption === 'force'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option1">Techniques for strumming the guitar strings with force.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="impossible"
                        className="mr-4"
                        checked={selectedOption === 'impossible'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option2">Techniques for playing impossible notes.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="tone"
                        className="mr-4"
                        checked={selectedOption === 'tone'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option3">Techniques for adjusting the guitar&apos;s tone.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option4"
                        name="options"
                        value="smoothly"
                        className="mr-4"
                        checked={selectedOption === 'smoothly'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option4">Techniques for creating additional notes smoothly on the guitar.</label>
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