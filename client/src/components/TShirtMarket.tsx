function TShirtMarket({ coinAddress }) {
  const { data: coin } = useZoraCoin(coinAddress); // Custom hook to fetch coin data

  const handleBuy = async () => {
    // Buy coins using Zora's built-in Uniswap pool
    await buyCoin(coinAddress, "0.01"); // 0.01 ETH
    
    // Auto-redeem physical item after trade
    if (coin.metadata.physicalRedeemed === false) {
      await fulfillPhysicalOrder(coinAddress);
    }
  };

  return (
    <div>
      <h3>{coin.ticker} - {coin.price} ETH</h3>
      <button onClick={handleBuy}>Buy & Redeem T-Shirt</button>
      <p>Owners: {coin.holders}</p>
      <img src={coin.metadata.image} alt="T-Shirt Design" />
    </div>
  );
}