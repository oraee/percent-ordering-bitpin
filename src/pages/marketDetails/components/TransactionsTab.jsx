import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box } from "@mui/material";
import { fetchMarketDetails } from '../../../api/marketService';
import DataStateHandler from "../../../components/DataStateHandler.jsx";
import StyledListItem from "../../../components/StyledListItem.jsx";
import { formatDecimal } from "../../../utils/decimalUtils.js";

const TransactionsTab = ({ marketId }) => {
    const refetchInterval = 3000;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['market', marketId],
        queryFn: () => fetchMarketDetails(marketId),
        refetchInterval,
        retry: 1,
    });

    return (
        <Box sx={{ padding: 2 }}>
            <DataStateHandler
                isLoading={isLoading}
                isError={isError}
                data={data}
                emptyMessage="داده‌ای وجود ندارد"
            >
                {data?.map((item, index) => (
                    <StyledListItem
                        key={index}
                        primaryText={`زمان: ${new Date(item.time * 1000).toLocaleString('fa-IR')}`}
                        secondaryTexts={[
                            `قیمت: ${formatDecimal(item.price)} تومان`,
                            `حجم معامله شده: ${formatDecimal(item.match_amount)} واحد`,
                        ]}
                    />
                ))}
            </DataStateHandler>
        </Box>
    );
};

export default TransactionsTab;
