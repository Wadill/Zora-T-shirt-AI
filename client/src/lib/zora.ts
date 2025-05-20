import { ZoraCreator } from '@zoralabs/protocol-sdk';
import { base } from 'viem/chains';

export async function mintTShirtCoin(
  designId: string, 
  designImageIPFS: string,
  ticker: string
) {
  const zora = new ZoraCreator({ chain: base });
  
  // 1. Mint as ERC-20 coin
  const tx = await zora.createCoin({
    contentHash: keccak256(designId),
    ticker: `$${ticker.toUpperCase()}`,
    metadataURI: `ipfs://${designImageIPFS}/metadata.json`,
    creator: userAddress,
    referralFee: 0.01 // 1% fee for your app
  });

  // 2. Return coin address
  return tx.coinAddress;
}