import React from 'react';
import { Box, Typography } from "@mui/material";
import LoadingSkeleton from "./LoadingSkeleton.jsx";

const DataStateHandler = ({ isLoading, isError, data, emptyMessage, children }) => {
    if (isLoading) return <LoadingSkeleton count={5} />;
    if (isError) {
        return (
            <Typography color="error" align="center" sx={{ mt: 3 }}>
                خطا در بارگذاری اطلاعات
            </Typography>
        );
    }
    if (!data || data.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '300px',
                    width: '100%',
                }}
            >
                <Typography align="center" variant="body2">
                    {emptyMessage || 'داده‌ای وجود ندارد'}
                </Typography>
            </Box>
        );
    }
    return children;
};

export default DataStateHandler;
