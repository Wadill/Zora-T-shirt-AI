import { useZora, usePrintful } from '../lib';

function MintTShirtCoin({ design }) {
  const [ticker, setTicker] = useState('');

  const handleMint = async () => {
    // 1. Upload design to IPFS (using Pinata/Web3.Storage)
    const ipfsHash = await uploadToIPFS(design.image);
    
    // 2. Mint as coin
    const coinAddress = await mintTShirtCoin(
      design.id,
      ipfsHash,
      ticker
    );
    
    // 3. Queue physical production
    await fulfillPhysicalOrder(
      coinAddress,
      `ipfs://${ipfsHash}`,
      'M' // Default size
    );
    
    alert(`Hybrid T-Shirt launched! Coin: $${ticker}`);
  };

  return (
    <div>
      <input 
        value={ticker} 
        onChange={(e) => setTicker(e.target.value)} 
        placeholder="Ticker" 
      />
      <button onClick={handleMint}>
        Mint & Manufacture
      </button>
    </div>
  );
}