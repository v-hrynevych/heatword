import { useMutation } from "@tanstack/react-query";

interface RandomWordResult {
    word: string;
    language: string;
}

async function fetchRandomWord(
    selectedLanguage: string
): Promise<RandomWordResult> {
    const response = await fetch("game/api/random-word", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: selectedLanguage }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch random word");
    }

    const result = await response.json();
    return { word: result.word, language: selectedLanguage };
}

export function useRandomWord() {
    const mutation = useMutation<RandomWordResult, Error, string>({
        mutationFn: fetchRandomWord,
    });

    return mutation;
}
