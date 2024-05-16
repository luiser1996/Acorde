'use client';

import Link from 'next/link';
import {
    MusicalNoteIcon,
    UserCircleIcon,
    MinusCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { State, createTab } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { Chords, ChordsForm, User } from '@/app/lib/definitions';

function parseChord(chordString: string): ChordsForm {
    const [tone, semitone] = chordString.split(',');
    return { tone, semitone };
}

export default function CreateForm({
    chords,
    currentUser,
}: {
    chords: Chords[];
    currentUser: User;
}) {
    const createTabChords = async (prevState: State | undefined, formData: FormData): Promise<State | undefined> => {
        try {
            const result = await createTab(formData, currentUser, selectedChords);
            if (result == undefined) {
                return prevState;
            } else {
                alert(result);
            }
        } catch (error) {
            return prevState;
        }
    };
    const [errorMessageForm, dispatch] = useFormState(createTabChords, undefined);

    const [selectedChords, setSelectedChords] = useState<ChordsForm[]>([]);
    const [showChordList, setShowChordList] = useState(false);
    const [showLine, setShowLine] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const addChord = (chord: ChordsForm) => {
        if (!selectedChords.some(selectedChord => selectedChord.tone === chord.tone && selectedChord.semitone === chord.semitone)) {
            setSelectedChords([...selectedChords, chord]);
            setShowChordList(false);
            setErrorMessage('');
        }
        else{
            setErrorMessage('Chord is already selected.');
        }
    };

    const removeChord = (chord: ChordsForm) => {
        setSelectedChords(selectedChords.filter(selectedChord => !(selectedChord.tone === chord.tone && selectedChord.semitone === chord.semitone)));
        setShowLine(false);
    };
 
    return (
        <form action={dispatch}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Name */}
            <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Song
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter song name"
                            required
                        />
                        <MusicalNoteIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Artist */}
            <div className="mb-4">
                <label htmlFor="artist" className="mb-2 block text-sm font-medium">
                    Artist
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="artist"
                            name="artist"
                            type="text"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter artist name"
                            required
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Capo */}
            <div className="mb-4">
                <label htmlFor="capo" className="mb-2 block text-sm font-medium">
                    Capo
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="capo"
                            name="capo"
                            type="number"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter capo position"
                        />
                        <MinusCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Chords */}
            <div className="mb-4">
                <label htmlFor="chords" className="mb-2 block text-sm font-medium">
                    Chords
                </label>
                <div className="flex items-center mb-2">
                    {/* Lista de acordes seleccionados */}
                    <ul className="flex flex-wrap mt-2">
                        {selectedChords.map((chord, index) => (
                            <li key={index} className="relative bg-orange-500 text-white rounded-full px-3 py-1 mr-2 mb-2 cursor-pointer hover:bg-orange-400" onMouseEnter={() => setShowLine(true)} onMouseLeave={() => setShowLine(false)} onClick={() => removeChord(chord)}>
                                {chord.tone}{chord.semitone === 'M' ? '' : chord.semitone}
                                {showLine && <div className="absolute top-1/2 ml-2 mr-2 left-0 right-0 border-t border-white" />}
                            </li>
                        ))}
                    </ul>
                    {/* Botón + para mostrar la lista de acordes */}
                    <button
                        type="button"
                        className="inline-flex items-center justify-center h-10 w-10 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 mr-2"
                        onClick={() => setShowChordList(!showChordList)}
                    >
                        +
                    </button>
                    {/* Lista desplegable de acordes */}
                    {showChordList && (
                        <select
                            id="chords"
                            className="top-full p-2.5 w-56 text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:border-black dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
                            onChange={(e) => addChord(parseChord(e.target.value))}
                        >
                        <option value="">Select chord</option>
                        {chords.map(chord => (
                            // Mostrar el tono del acorde y omitir el semitono solo si es "M"
                            <option key={chord.id} value={`${chord.tone},${chord.semitone}`}>
                                {chord.tone}{chord.semitone === 'M' ? '' : chord.semitone}
                            </option>
                        ))}
                        </select>
                    )}
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
            </div>

            {/* Content */}
            <div className="mb-4">
            <label htmlFor="content" className="mb-2 block text-sm font-medium">
                Tab Content
            </label>
            <textarea
                id="content"
                name="content"
                rows={14}
                className="block p-2.5 w-full text-sm text-black bg-white rounded-md border border-gray-200 outline-2 placeholder:text-gray-500"
                placeholder="Write your tab content here..."
            ></textarea>
            </div>

        </div>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
        {errorMessageForm && (
        <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessageForm.toString()}</p>
        </>
        )}
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link
            href="/dashboard/tabs/my-tabs"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
            Cancel
            </Link>
            <Button type="submit">Create Tab</Button>
        </div>
        </form>
    );
}