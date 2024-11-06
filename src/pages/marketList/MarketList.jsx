import React from 'react';
import { Tabs, Tab, Box, Typography, Pagination } from '@mui/material';
import { usePaginatedTabData } from '../../hooks/usePaginatedTabData';
import { useNavigate } from 'react-router-dom';
import { fetchMarkets } from "../../api/marketService.js";
import { useQuery } from "@tanstack/react-query";
import useTabSwitcher from '../../hooks/useTabSwitcher';
import LoadingSkeleton from "../../components/LoadingSkeleton.jsx";
import {formatDecimal} from "../../utils/decimalUtils.js";


export const MarketList = () => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['markets'], queryFn: fetchMarkets });
    const navigate = useNavigate();

    const tabOrder = ['IRT', 'USDT'];
    const { activeTab, handleTabChange, handlers } = useTabSwitcher('IRT', tabOrder);

    const {
        paginatedData,
        currentPage,
        totalPages,
        handlePageChange,
    } = usePaginatedTabData(data, activeTab);

    return (
        <Box sx={{ width: '100%', padding: 2}} {...handlers}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="تومان (IRT)" value="IRT" />
                <Tab label="تتر (USDT)" value="USDT" />
            </Tabs>

            {isLoading && <LoadingSkeleton/>}

            {isError && (
                <Typography color="error" align="center" mt={3}>
                    خطا در بارگذاری داده‌ها
                </Typography>
            )}

            {!isLoading && !isError && (
                <Box mt={3}>
                    {paginatedData.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                padding: 2,
                                borderBottom: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                "&:hover": { backgroundColor: '#4CF09D' }
                            }}
                            onClick={() => navigate(`/market/${item.id}`)}
                        >
                            <Typography variant="body1">{item.title_fa}</Typography>
                            <Typography variant="body1">
                                قیمت: {formatDecimal(item.price)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => handlePageChange(page)}
                    color="primary"
                    variant="outlined"
                />
            </Box>
        </Box>
    );
};
