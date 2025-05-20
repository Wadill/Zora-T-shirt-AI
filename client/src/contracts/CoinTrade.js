// /client/src/lib/CoinTrade.js
import { prepareWriteContract, writeContract, getAccount } from '@wagmi/core';
import { encodeAbiParameters, parseAbiParameters } from 'viem';
import ZORA_COIN_ABI from '../abi/ZoraCoin.json'; 
import { fulfillPhysicalOrder } from './printful';

// 1. Buy T-Shirt Coin with Auto-Redemption
export const buyTShirtCoin = async (
  coinAddress,
  ethAmount,
  options = {}
) => {
  const {
    maxSlippage = 0.5, // 0.5% default slippage
    recipient = getAccount().address,
    tradeReferrer = '0x0000000000000000000000000000000000000000',
    redeemPhysical = false // Auto-redeem T-shirt on purchase
  } = options;

  try {
    // Calculate minimum output with slippage
    const minAmountOut = ethAmount * (100 - maxSlippage) / 100;

    // Prepare transaction
    const { request } = await prepareWriteContract({
      address: coinAddress,
      abi: ZORA_COIN_ABI,
      functionName: 'buy',
      args: [
        recipient,
        ethAmount.toString(),
        minAmountOut.toString(),
        '0', // sqrtPriceLimitX96 (0 = no limit)
        tradeReferrer
      ],
      value: BigInt(ethAmount),
    });

    // Execute trade
    const tx = await writeContract(request);

    // Auto-redeem physical if enabled
    if (redeemPhysical) {
      await fulfillPhysicalOrder(coinAddress);
    }

    return {
      txHash: tx.hash,
      amountIn: ethAmount,
      minAmountOut
    };

  } catch (error) {
    console.error('Trade failed:', error);
    throw new Error(`Buy failed: ${error.shortMessage || error.message}`);
  }
};

// 2. Sell T-Shirt Coin
export const sellTShirtCoin = async (
  coinAddress,
  coinAmount,
  options = {}
) => {
  const {
    maxSlippage = 0.5,
    recipient = getAccount().address,
    tradeReferrer = '0x0000000000000000000000000000000000000000'
  } = options;

  try {
    const minAmountOut = coinAmount * (100 - maxSlippage) / 100;

    const { request } = await prepareWriteContract({
      address: coinAddress,
      abi: ZORA_COIN_ABI,
      functionName: 'sell',
      args: [
        recipient,
        coinAmount.toString(),
        minAmountOut.toString(),
        '0',
        tradeReferrer
      ]
    });

    const tx = await writeContract(request);
    return {
      txHash: tx.hash,
      amountIn: coinAmount,
      minAmountOut
    };

  } catch (error) {
    console.error('Sell failed:', error);
    throw new Error(`Sell failed: ${error.shortMessage || error.message}`);
  }
};

// 3. Get Trade Parameters (For UI Preview)
export const getTradeQuote = async (coinAddress, isBuy, amount) => {
  const response = await fetch(
    `https://api.zora.co/coins/${coinAddress}/quote?` + 
    new URLSearchParams({
      action: isBuy ? 'buy' : 'sell',
      amount: amount.toString()
    })
  );
  return response.json();
};

// 4. Check Physical Redemption Status
export const checkRedemptionStatus = async (coinAddress, userAddress) => {
  const { readContract } = await import('@wagmi/core');
  return readContract({
    address: coinAddress,
    abi: ZORA_COIN_ABI,
    functionName: 'tshirtHolders',
    args: [userAddress]
  });
};