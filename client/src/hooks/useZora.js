import { ZoraCreator } from '@zoralabs/protocol-sdk';

export function useZora() {
  const { address } = useAccount();
  
  const createTShirtCoin = async (designId, ticker) => {
    const zora = new ZoraCreator({ chain: base });
    const tx = await zora.createCoin({
      contentHash: designId, // Unique ID for your T-shirt design
      ticker: `$${ticker}`, // e.g., "$TSHIRT1"
      creator: address,
    });
    return tx;
  };

  return { createTShirtCoin };
}