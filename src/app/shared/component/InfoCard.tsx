"use client";
import { Card, CardContent, Typography } from "@mui/material";

export default function InfoCard() {
    return (
        <Card className="max-w-xl mx-auto mt-6 p-4 shadow-xl rounded-2xl">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Як грати в "Гаряче слово"
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginBottom: "6px" }}
                >
                    Просто введи будь-яке слово та натисни <b>Enter</b> — і все
                    одразу стане зрозуміло. Удачі!
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginBottom: "6px" }}
                >
                    Мета — вгадати секретне слово, яке знаходиться на першому
                    місці в списку.
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginBottom: "6px" }}
                >
                    У тебе необмежена кількість спроб. Чим вище слово в списку —
                    тим ближче воно до правильного.
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginBottom: "6px" }}
                >
                    Це як у грі "гаряче-холодно": наприклад, якщо загадане слово
                    — "кіт", то "кішка" ближча, ніж "собака".
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginBottom: "6px" }}
                >
                    Алгоритм використовує контекст з великої кількості текстів,
                    щоб визначити схожість.
                </Typography>
            </CardContent>
        </Card>
    );
}
