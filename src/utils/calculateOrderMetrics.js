import Decimal from 'decimal.js';

export const calculateOrderMetrics = (data) => {
    const totalRemain = data.reduce((sum, item) => sum.plus(new Decimal(item.remain)), new Decimal(0));

    const totalValue = data.reduce((sum, item) => sum.plus(new Decimal(item.value)), new Decimal(0));

    const weightedAveragePrice = data.reduce(
        (sum, item) => sum.plus(new Decimal(item.price).times(new Decimal(item.remain))),
        new Decimal(0)
    ).dividedBy(totalRemain);

    return {
        totalRemain: totalRemain.toNumber(),
        totalValue: totalValue.toNumber(),
        weightedAveragePrice: weightedAveragePrice.toNumber(),
    };
};
