export async function fulfillPhysicalOrder(
  coinAddress: string,
  designUrl: string,
  size: 'S'|'M'|'L'
) {
  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      external_id: coinAddress, // Link to on-chain coin
      items: [{
        sync_product: {
          name: `$${ticker} Limited Edition`,
          files: [{ url: designUrl }]
        },
        quantity: 1,
        size
      }]
    })
  });
  return response.json();
}