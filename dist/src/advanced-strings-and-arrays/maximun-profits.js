/*
Maximum Profits

Suppose we could access yesterday’s prices for a certain stock as a chronological list.
Write a function that takes the list and returns the highest profit possible from one purchase
and one sale of the stock yesterday.

For example, a stock price list of [10, 7, 5, 8, 11, 9] shows that the stock
started at 10 and ended at 9, going through the numbers chronologically.

There is at least a 1-minute difference between the stock prices.

Taking that array as input, our function should return 6,
the maximum possible profit from buying when the price was 5 and selling when the price was 11.

If no profit can be made, return 0.

No “shorting” — you must buy before you sell. You may not buy and sell in the same time step.

Input: Array of Numbers
Output: Number

Hints
  We’ll have to convert this array of stock prices into possible profits.
  Think about the fact that this is a chronologically ordered list.
*/
export function getMaxProfit1(prices) {
    const possibleProfits = [0];
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            possibleProfits.push(prices[j] - prices[i]);
        }
    }
    return Math.max(...possibleProfits);
}
// Time O(n^2)
// Space O(n^2)
getMaxProfit1([10, 7, 5, 8, 11, 9]); //?
getMaxProfit1([1, 2, 3, 4, 5]); //?
getMaxProfit1([5, 4, 3, 2, 1]); //?
getMaxProfit1([5, 20, 4, 10, 1]); //?
//---
export function getMaxProfit2(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const currentPrice of prices) {
        minPrice = Math.min(minPrice, currentPrice);
        maxProfit = Math.max(maxProfit, currentPrice - minPrice);
    }
    return maxProfit;
}
// Time O(n)
// Space O(1)
getMaxProfit2([10, 7, 5, 8, 11, 9]); //?
getMaxProfit2([1, 2, 3, 4, 5]); //?
getMaxProfit2([5, 4, 3, 2, 1]); //?
getMaxProfit2([5, 20, 4, 10, 1]); //?
//---
export function getMaxProfit3(prices) {
    return prices.reduce(({ minBuy, maxProfit }, currentPrice) => {
        return {
            minBuy: Math.min(minBuy, currentPrice),
            maxProfit: Math.max(maxProfit, currentPrice - minBuy)
        };
    }, {
        minBuy: Infinity,
        maxProfit: 0
    }).maxProfit;
}
// Time O(n)
// Space O(1)
getMaxProfit3([10, 7, 5, 8, 11, 9]); //?
getMaxProfit3([1, 2, 3, 4, 5]); //?
getMaxProfit3([5, 4, 3, 2, 1]); //?
getMaxProfit3([5, 20, 4, 10, 1]); //?
//--- perf
getMaxProfit1([5, 20, 4, 10, 1]); //?. $
getMaxProfit2([5, 20, 4, 10, 1]); //?. $
getMaxProfit3([5, 20, 4, 10, 1]); //?. $
//# sourceMappingURL=maximun-profits.js.map