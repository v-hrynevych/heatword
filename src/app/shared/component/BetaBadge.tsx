import { Box, Typography } from "@mui/material";

const BetaBadge = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                bgcolor: "rgba(142,142,147,0.5)",
                color: "#fff",
                px: 1.5,
                py: 0.8,
                borderRadius: 25,
                fontSize: 12,
                fontWeight: 500,
                backdropFilter: "blur(8px)",
                boxShadow: 4,
                zIndex: 1000,
            }}
        >
            <Typography variant="body2">Beta v1.0</Typography>
        </Box>
    );
};

export default BetaBadge;
