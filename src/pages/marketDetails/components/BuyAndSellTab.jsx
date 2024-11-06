import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, TextField, Typography, Divider } from "@mui/material";
import { fetchMarketActivity } from '../../../api/marketService';
import { calculateOrderMetrics } from "../../../utils/calculateOrderMetrics.js";
import { calculateMetricsByPercentage } from "../../../utils/calculateMetricsByPercentage.js";
import DataStateHandler from "../../../components/DataStateHandler.jsx";
import StyledListItem from "../../../components/StyledListItem.jsx";

const BuyAndSellTab = ({ marketId, type }) => {
    const refetchInterval = 3000;
    const [percentage, setPercentage] = useState(0);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['market', marketId, type],
        queryFn: () => fetchMarketActivity(marketId, type),
        refetchInterval,
    });

    const metrics = useMemo(() => data?.orders ? calculateOrderMetrics(data.orders) : { totalRemain: 0, totalValue: 0, weightedAveragePrice: 0 }, [data]);
    const metricsByPercentage = useMemo(() => data?.orders && percentage > 0 ? calculateMetricsByPercentage(data.orders, percentage) : null, [data, percentage]);

    const handlePercentageChange = (event) => {
        const value = Math.min(100, Math.max(0, Number(event.target.value)));
        setPercentage(value);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <DataStateHandler
                isLoading={isLoading}
                isError={isError}
                data={data?.orders}
                emptyMessage="داده‌ای وجود ندارد"
            >
                {data?.orders.map((item, index) => (
                    <StyledListItem
                        key={index}
                        primaryText={`باقیمانده: ${item.remain.toLocaleString('fa-IR')}`}
                        secondaryTexts={[
                            `قیمت: ${item.price.toLocaleString('fa-IR')} تومان`,
                            `ارزش: ${item.value.toLocaleString('fa-IR')} تومان`,
                        ]}
                    />
                ))}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>خلاصه کل</Typography>
                <Typography variant="body2">کل باقیمانده: {metrics.totalRemain.toLocaleString('fa-IR')}</Typography>
                <Typography variant="body2">کل ارزش: {metrics.totalValue.toLocaleString('fa-IR')} تومان</Typography>
                <Typography variant="body2">میانگین وزنی قیمت: {metrics.weightedAveragePrice.toLocaleString('fa-IR')} تومان</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>محاسبه بر اساس درصد</Typography>
                <TextField
                    label="درصد مورد نظر را وارد کنید"
                    type="number"
                    value={percentage}
                    onChange={handlePercentageChange}
                    sx={{ mb: 2 }}
                    fullWidth
                />
                {metricsByPercentage && (
                    <Box sx={{ padding: 2, borderRadius: 1 }}>
                        <Typography variant="body2">کل باقیمانده: {metricsByPercentage.totalFilteredRemain.toLocaleString('fa-IR')}</Typography>
                        <Typography variant="body2">کل ارزش: {metricsByPercentage.totalFilteredValue.toLocaleString('fa-IR')} تومان</Typography>
                        <Typography variant="body2">میانگین وزنی قیمت: {metricsByPercentage.weightedAveragePrice.toLocaleString('fa-IR')} تومان</Typography>
                    </Box>
                )}
            </Box>
            </DataStateHandler>

        </Box>
    );
};

export default BuyAndSellTab;
