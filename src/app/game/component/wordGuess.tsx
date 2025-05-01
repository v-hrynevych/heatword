"use client";
import Attempts from "@/app/shared/component/Attempts";
import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import ResultsTable from "./resultsTable";
import { useWordSimilarity } from "../hooks/useWordSimilarity";
import { toast } from "sonner";
import ResultList from "@/app/shared/component/ResultList";

type Result = {
    word: string;
    score: number;
};

const WordGuess = ({
    word,
    setGameStarted,
}: {
    word: string;
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { mutate, data, isPending } = useWordSimilarity();

    const [timer, setTimer] = useState<NodeJS.Timeout | null>();
    const [attempts, setAttempts] = useState<number>(0);
    const [results, setResults] = useState<Result[]>([]);
    const [textFieldInput, setTextFieldInput] = useState("");
    const [isWin, setIsWin] = useState(false);
    const handleInput = (e: string) => {
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
    
console.log(word);

    const handleEnter = (el: React.KeyboardEvent<HTMLInputElement>) => {
        if (el.key === "Enter") {
            const match = results.find(
                (item) =>
                    item.word.toLowerCase() === textFieldInput.toLowerCase()
            );
            if (match) {
                return toast.error("Це слово вже використано!");
            }
            mutate(
                {
                    word1: word.toLocaleLowerCase(),
                    word2: textFieldInput.toLocaleLowerCase(),
                },
                {
                    onSuccess: (data) => {
                        setResults([
                            ...results,
                            { word: textFieldInput, score: data },
                        ]);

                        if (data === 1) {
                            setIsWin(true);
                        }
                    },
                }
            );
        }
    };

    return (
        <Box width={"50%"}>
            {isWin ? (
                <Box>
                    <ResultList
                        results={results}
                        word={word}
                        attempts={attempts}
                    />
                    <Box display={"flex"} justifyContent={"center"}>
                        <Button
                            variant="contained"
                            color="inherit" // Чорний фон кнопки
                            onClick={() => {
                                setGameStarted(false);
                            }}
                            sx={{
                                padding: "12px 24px",
                                fontSize: "1.2rem",
                                color: "white", // Білий текст
                                backgroundColor: "black", // Чорний фон
                                "&:hover": {
                                    backgroundColor: "#333", // Трохи світліший чорний при ховері
                                },
                            }}
                        >
                            {"Нова гра!"}
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
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
            )}
        </Box>
    );
};

export default WordGuess;
