'use client';

import { User } from '@/app/lib/definitions';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { completeLesson, getAchievements } from '@/app/lib/actions';
import { useState, useEffect } from 'react';
import { nunito } from '../fonts';
import Image from 'next/image';

const chords = ['C', 'D', 'E', 'G', 'A'];

export default function Lesson12Form({
    currentUser
}: {
    currentUser: User;
}) {
    const [progress, setProgress] = useState<number>(0);
    const [randomChords, setRandomChords] = useState<string[]>([]);
    const [currentChord, setCurrentChord] = useState<string>('');
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const completeLesson12 = () => {
        setResultMessage("Congratulations! You've completed the lesson!");
        completeLesson(currentUser, 'e67ff7c4-7c36-455e-95e1-7a34174c7d32');
        getAchievements(currentUser);
    };

    useEffect(() => {
        generateRandomChords();
    }, []);

    useEffect(() => {
        setCurrentChord(randomChords[progress]);
    }, [progress, randomChords]);

    function generateRandomChords() {
        const shuffledChords = [...chords].sort(() => Math.random() - 0.5);
        setRandomChords(shuffledChords);
        setCurrentChord(shuffledChords[0]);
        setProgress(0);
    }

    function handleAnswer(selectedChord: string) {
        if (selectedChord === currentChord) {
            setProgress(progress + 1);
            if (progress === 4) {
                completeLesson12(); 
            }
        } else {
            setErrorMessage('Incorrect! Please try again.');
            generateRandomChords();
        }
    }

    return (
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold flex justify-center text-xl`}>Guess five chords in a row:</h2>
            <div className="mt-4 flex justify-center">
                {currentChord && (
                    <Image
                        src={`/chords/${currentChord}/${currentChord}.png`}
                        width={200}
                        height={200}
                        alt={`${currentChord} maj chord`}
                    />
                )}
            </div>
            <div className="mt-6 flex justify-center">
                {chords.map((chord) => (
                    <Button className="mr-2" key={chord} onClick={() => {
                        setResultMessage(null);
                        setErrorMessage(null);
                        handleAnswer(chord);
                    }}>{chord}</Button>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${(progress / 5) * 100}%` }}></div>
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
                        <p className="text-sm text-red-500">{errorMessage}</p>
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
                        <p className="text-sm text-green-500">{resultMessage}</p>
                    </>
                )}
            </div>
        </div>
    );
}