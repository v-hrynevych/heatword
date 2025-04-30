"use client";
import WordGuess from "@/app/game/component/wordGuess";
import { Container, Typography, Box, Button } from "@mui/material";
import "./home.css";
import { useState } from "react";
import { useRandomWord } from "@/app/game/hooks/useRandomWord";
import InfoCard from "@/app/shared/component/InfoCard";

export const HomePage = () => {
    const { mutate, data, isLoading, error } = useRandomWord();
    const [gameStarted, setGameStarted] = useState(false);
    const handleStartGame = () => {
        setGameStarted(true);
        mutate("Українська");
        console.log("Game started!");
    };
      return (
        <div>
            <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 5,
                        alignItems: "center",
                    }}
                >
                    <Typography
                        suppressHydrationWarning
                        variant="h1"
                        component="h1"
                        className="heatword-text"
                    >
                        Heat Word
                    </Typography>

                    {gameStarted && data ? (
                        <WordGuess word={data.word} />
                    ) : (
                        <>
                            <InfoCard />
                            <Button
                                variant="contained"
                                color="inherit" // Чорний фон кнопки
                                onClick={handleStartGame}
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
                                Почати
                            </Button>
                        </>
                    )}
                </Box>
            </Container>
        </div>
    );
};
