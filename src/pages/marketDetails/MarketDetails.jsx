import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from "@mui/material";
import useTabSwitcher from '../../hooks/useTabSwitcher';
import TransactionsTab from './components/TransactionsTab';
import BuyAndSellTab from "./components/BuyAndSellTab.jsx";

const MarketDetails = () => {
    const { marketId } = useParams();

    const tabOrder = ['transactions', 'buy', 'sell'];
    const { activeTab, handleTabChange, handlers } = useTabSwitcher('transactions', tabOrder);

    return (
        <Box sx={{ width: '100%', padding: 2 }} {...handlers}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="تراکنش‌ها" value="transactions" />
                <Tab label="خرید" value="buy" />
                <Tab label="فروش" value="sell" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
                {activeTab === 'transactions' && <TransactionsTab marketId={marketId} />}
                {activeTab === 'buy' && <BuyAndSellTab marketId={marketId} type='buy' />}
                {activeTab === 'sell' && <BuyAndSellTab marketId={marketId} type='sell' />}
            </Box>
        </Box>
    );
};

export default MarketDetails;
