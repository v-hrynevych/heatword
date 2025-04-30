// hooks/useWordSimilarity.ts
import { useMutation } from "@tanstack/react-query";

export function useWordSimilarity() {
    return useMutation({
        mutationFn: async ({
            word1,
            word2,
        }: {
            word1: string;
            word2: string;
        }) => {
            const res = await fetch("/game/api/word-similarity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ word1, word2 }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch similarity score");
            }

            const data = await res.json();
            return data.score as number;
        },
    });
}
