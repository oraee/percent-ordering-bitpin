import React from 'react';
import { Paper, Typography, useTheme } from "@mui/material";

const StyledListItem = ({ primaryText, secondaryTexts }) => {
    const theme = useTheme();

    return (
        <Paper
            sx={{
                padding: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                mb: 1,
                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                },
            }}
        >
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                {primaryText}
            </Typography>
            {secondaryTexts.map((text, idx) => (
                <Typography key={idx} variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {text}
                </Typography>
            ))}
        </Paper>
    );
};

export default StyledListItem;
