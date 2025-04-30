"use client";
import Attempts from "@/app/shared/component/Attempts";
import { TextField, Box } from "@mui/material";
import { useState } from "react";
import ResultsTable from "./resultsTable";
import { useWordSimilarity } from "../hooks/useWordSimilarity";
import { toast } from "sonner";

const WordGuess = ({ word }: { word: string }) => {
    const { mutate, data: score, isPending } = useWordSimilarity();

    const [timer, setTimer] = useState<NodeJS.Timeout | null>();
    const [attempts, setAttempts] = useState<number>(0);
    const [results, setResults] = useState([]);
    const [textFieldInput, setTextFieldInput] = useState("");

    const handleInput = (e) => {
        setTextFieldInput(e);
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            if (e) {
                setAttempts((prev) => prev + 1);
                setTextFieldInput(e);
            }
        }, 500);

        setTimer(newTimer);
    };

    const handleEnter = (el) => {
        if (el.key === "Enter") {
            const match = results.find(
                (item) =>
                    item.word.toLowerCase() === textFieldInput.toLowerCase()
            );
            if (match) {
                return toast.error("Це слово вже використано!");
            }
            mutate(
                { word1: word, word2: textFieldInput },
                {
                    onSuccess: (data) => {
                        setResults([
                            ...results,
                            { word: textFieldInput, score: data },
                        ]);
                    },
                }
            );
        }
    };
  
    return (
        <Box suppressHydrationWarning width={"50%"}>
            <Attempts attempts={attempts} />
            <TextField
                disabled={isPending}
                label="Введіть слово"
                value={textFieldInput}
                onKeyDown={handleEnter}
                onChange={(e) => {
                    handleInput(e.target.value);
                }}
                slotProps={{ htmlInput: { maxLength: 25 } }}
                fullWidth
            />
            <ResultsTable results={results} />
        </Box>
    );
};

export default WordGuess;
