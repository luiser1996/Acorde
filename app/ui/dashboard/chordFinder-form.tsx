'use client';

import { Chords } from '@/app/lib/definitions';
import { useState } from 'react';
import Image from 'next/image';

export default function SelectChordForm({
  chords
}: {
  chords: Chords[];
}) {
    const uniqueTones = Array.from(new Set(chords.map(chord => chord.tone)));
    const uniqueSemitones = Array.from(new Set(chords.map(chord => chord.semitone)));

    const [selectedTone, setSelectedTone] = useState('');
    const [selectedSemitone, setSelectedSemitone] = useState('');
    const [selectedChord, setSelectedChord] = useState<Chords | null>(null);

    // Función para manejar el cambio en el tono y el semitono
    const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTone(e.target.value);
        updateSelectedChord(e.target.value, selectedSemitone);
    };

    const handleSemitoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSemitone(e.target.value);
        updateSelectedChord(selectedTone, e.target.value);
    };

    // Actualizar el acorde seleccionado
    const updateSelectedChord = (tone: string, semitone: string) => {
        const chord = chords.find(chord => chord.tone === tone && chord.semitone === semitone);
        setSelectedChord(chord || null);
    };

    return (
        <form>
            <div className="w-full mt-4">
            <div className="flex justify-between">
                {/* Selector de tono */}
                <div className="w-1/2 mr-6">
                    <div className="mb-4">
                    <label htmlFor="tone" className="mb-2 block text-sm font-medium">
                    Tone
                    </label>
                    <div className="relative">
                        <select
                            id="tone"
                            name="tone"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            value={selectedTone}
                            onChange={handleToneChange}
                        >
                            <option value="" disabled>
                            Select tone
                            </option>
                            {/* Mapear los tonos únicos disponibles */}
                            {uniqueTones.map((tone) => (
                            <option key={tone} value={tone}>
                                {tone}
                            </option>
                            ))}
                        </select>
                    </div>
                    </div>
                </div>
            

                {/* Selector de semitono */}
                <div className="w-1/2 ml-6">
                <div className="mb-4">
                    <label htmlFor="semitone" className="mb-2 block text-sm font-medium">
                    Semitone
                    </label>
                    <div className="relative">
                    <select
                        id="semitone"
                        name="semitone"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        value={selectedSemitone}
                        onChange={handleSemitoneChange}
                    >
                    <option value="" disabled>
                        Select semitone
                    </option>
                    {/* Mapear los semitonos únicos disponibles */}
                    {uniqueSemitones.map((semitone) => (
                        <option key={semitone} value={semitone}>
                        {semitone}
                        </option>
                    ))}
                    </select>
                    </div>
                </div>
                </div>
            </div>
    
            {/* Imagen de acorde */}
            {selectedChord && (
              <div className="flex flex-col items-center justify-center">
                {selectedChord.semitone !== 'M' ? (
                    <h1 className="text-2xl text-center mt-4 font-bold">
                    {selectedChord.tone}
                    {selectedChord.semitone}
                    </h1>
                ) : (
                    <h1 className="text-2xl text-center mt-4 font-bold">{selectedChord.tone}</h1>
                )}
                <Image
                  src={selectedChord.image_url.replaceAll("#", "%23")}
                  width={300}
                  height={300}
                  className="hidden md:block"
                  alt={`Acorde: ${selectedChord.tone}${selectedChord.semitone}`}
                />
              </div>
            )}
        </div>
    </form>
    );
}