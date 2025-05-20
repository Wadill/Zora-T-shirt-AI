import { prepareWriteContract, writeContract } from '@wagmi/core';
import ZORA_COIN_ABI from '../abi/ZoraCoin.json'; // Get from docs

export const buyCoin = async (coinAddress, ethAmount) => {
  const { request } = await prepareWriteContract({
    address: coinAddress,
    abi: ZORA_COIN_ABI,
    functionName: 'buy',
    args: [
      recipient,    // Your address
      ethAmount,    // ETH to spend (in wei)
      0,            // Min coins to receive (slippage)
      0,            // Price limit
      "0x..."       // Referral address (optional)
    ],
    value: ethAmount,
  });
  return writeContract(request);
};