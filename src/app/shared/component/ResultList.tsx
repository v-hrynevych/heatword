// components/ResultList.tsx
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    LinearProgress,
    Box,
} from "@mui/material";

type Result = {
    word: string;
    score: number;
};

type ResultListProps = {
    results: Result[];
    attempts: number;
    word: string;
};

const getColor = (score: number): string => {
    if (score <= 100) return "#4caf50"; // green
    if (score <= 400) return "#ffeb3b"; // yellow
    if (score <= 700) return "#ff9800"; // orange
    return "#f44336"; // red
};

const ResultList: React.FC<ResultListProps> = ({ results, word, attempts }) => {
    return (
        <Box my={4}>
            <Typography variant="h6" gutterBottom>
                Results
            </Typography>
            <TableCell>
                Attempts: <b>{attempts}</b>
            </TableCell>
            <TableCell>Word: {word}</TableCell>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Word</TableCell>
                            <TableCell>Similarity</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((item, index) => (
                            <TableRow key={`${item.word}-${index}`}>
                                <TableCell
                                    sx={{
                                        maxWidth: 150,
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {item.word}
                                </TableCell>
                                <TableCell>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <Box flexGrow={1}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={
                                                    (1 - item.score / 1000) *
                                                    100
                                                }
                                                sx={{
                                                    height: 20,
                                                    borderRadius: 2,
                                                    backgroundColor: "#eee",
                                                    "& .MuiLinearProgress-bar":
                                                        {
                                                            backgroundColor:
                                                                getColor(
                                                                    item.score
                                                                ),
                                                        },
                                                }}
                                            />
                                        </Box>
                                        <Box minWidth={35}>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item.score}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ResultList;
