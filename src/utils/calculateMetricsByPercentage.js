import Decimal from 'decimal.js';

export const calculateMetricsByPercentage = (data, percentage) => {
    const totalRemain = data.reduce((sum, item) => sum.plus(new Decimal(item.remain)), new Decimal(0));

    const targetRemain = totalRemain.times(new Decimal(percentage).dividedBy(100));

    let accumulatedRemain = new Decimal(0);
    let filteredData = [];

    for (const item of data) {
        const itemRemain = new Decimal(item.remain);
        const itemPrice = new Decimal(item.price);

        if (accumulatedRemain.plus(itemRemain).lessThanOrEqualTo(targetRemain)) {
            filteredData.push(item);
            accumulatedRemain = accumulatedRemain.plus(itemRemain);
        } else {
            const remainingToTarget = targetRemain.minus(accumulatedRemain);
            filteredData.push({
                ...item,
                remain: remainingToTarget.toString(),
                value: remainingToTarget.times(itemPrice).toString()
            });
            break;
        }
    }

    const totalFilteredRemain = filteredData.reduce((sum, item) => sum.plus(new Decimal(item.remain)), new Decimal(0));
    const totalFilteredValue = filteredData.reduce((sum, item) => sum.plus(new Decimal(item.value)), new Decimal(0));
    const weightedAveragePrice = filteredData.reduce(
        (sum, item) => sum.plus(new Decimal(item.price).times(new Decimal(item.remain))),
        new Decimal(0)
    ).dividedBy(totalFilteredRemain);

    return {
        totalFilteredRemain: totalFilteredRemain.toNumber(),
        totalFilteredValue: totalFilteredValue.toNumber(),
        weightedAveragePrice: weightedAveragePrice.toNumber()
    };
};
