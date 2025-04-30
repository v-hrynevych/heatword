"use client";
import { CardContent, Chip } from "@mui/material";

interface AttemptsProps {
    attempts: number;
}

export default function Attempts({ attempts }: AttemptsProps) {
    let color: "success" | "warning" | "error" | "default" = "success";

    if (attempts > 150) {
        color = "error"; // червоний
    } else if (attempts > 100) {
        color = "warning"; // жовтий
    } else if (attempts > 50) {
        color = "warning"; // залишається зелений (або можеш змінити логіку)
    }
    return (
        <CardContent sx={{ position: "absolute", top: 20, right: 50 }}>
            <Chip
                label={`${attempts} спроб${attempts !== 1 ? "и" : "а"}`}
                color={color}
                sx={{ fontSize: "1.2rem", p: 2 }}
            />
        </CardContent>
    );
}
