import { ZORA_COINS_ABI } from '../abi/zoraCoins';

function CreateCoinButton() {
  const createCoin = async () => {
    // ... wallet connection logic
    const { request } = await prepareWriteContract({
      address: '0x...',
      abi: ZORA_COINS_ABI,
      functionName: 'createCoin',
      args: [contentHash, ticker],
    });
    await writeContract(request);
  };
  
  return <button onClick={createCoin}>Mint as Coin</button>;
}