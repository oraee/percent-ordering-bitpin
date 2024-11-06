import Decimal from 'decimal.js';

export const formatDecimal = (value) => {
    return new Decimal(value).toFixed(2);
};
