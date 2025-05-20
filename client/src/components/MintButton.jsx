import { useZora } from '../hooks/useZora';

function MintButton({ designId }) {
  const { createTShirtCoin } = useZora();
  
  const handleMint = async () => {
    const tx = await createTShirtCoin(designId, "DESIGN1");
    console.log("Minted!", tx.hash);
  };

  return <button onClick={handleMint}>Mint T-Shirt Coin</button>;
}