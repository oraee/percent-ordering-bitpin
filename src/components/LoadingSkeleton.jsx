import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingSkeleton = ({ count = 10 }) => {

    return (
        <Box mt={3}>
            {Array.from({ length: count }).map((_, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, borderBottom: '1px solid #ddd' }}>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="30%" height={40} />
                </Box>
            ))}
        </Box>
    );
};

export default LoadingSkeleton;
