import axios from 'axios';

export const fetchMarkets = async () => {
    const response = await axios.get('https://api.bitpin.org/v1/mkt/markets/' );
    return response.data;
};

export const fetchMarketDetails = async (marketId) => {
    const response = await axios.get(`https://api.bitpin.org/v1/mth/matches/${marketId}/`);
    return response.data.slice(0, 10);
};
export const fetchMarketActivity = async (marketId, type) => {
    const response = await axios.get(`https://api.bitpin.org/v2/mth/actives/${marketId}/?type=${type}`);
    const data = response.data;

    const limitedOrders = data.orders ? data.orders.slice(0, 10) : [];

    return {
        ...data,
        orders: limitedOrders
    };
};


