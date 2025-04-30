"use client";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    LinearProgress,
    Box,
} from "@mui/material";

function getColor(value: number) {
    if (value < 250) return "#4caf50"; // зелений
    if (value < 500) return "#ffeb3b"; // жовтий
    if (value < 750) return "#ff9800"; // помаранчевий
    return "#f44336"; // червоний
}

export default function ResultsTable({
    results,
}: {
    results: { word: string; score: number }[];
}) {
    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Слово</TableCell>
                            <TableCell>Близькість</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results &&
                            results
                                .sort((a, b) => a.score - b.score)
                                .map((item) => {
                                    return (
                                        <TableRow key={item.word}>
                                            <TableCell
                                                sx={{
                                                    width: "40%",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {item.word}
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        width: "100%",
                                                        height: 30,
                                                    }}
                                                >
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={
                                                            ((1000 -
                                                                item?.score) /
                                                                999) *
                                                            100
                                                        }
                                                        sx={{
                                                            height: 30,
                                                            borderRadius: 2,
                                                            backgroundColor:
                                                                "rgba(0, 0, 0, 0.06)", // прозорий фон
                                                            "& .MuiLinearProgress-bar":
                                                                {
                                                                    backgroundColor:
                                                                        getColor(
                                                                            item?.score
                                                                        ),
                                                                    opacity: 0.8, // легка прозорість
                                                                },
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            position:
                                                                "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            height: "100%",
                                                            width: "100%",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            color: "#333",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {`${Math.round(
                                                            ((1000 -
                                                                item?.score) /
                                                                999) *
                                                                100
                                                        )}% ( ${item?.score})`}
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
