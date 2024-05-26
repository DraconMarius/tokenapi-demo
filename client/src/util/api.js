export const getTokenBalance = async (network, address) => {
    try {
        const response = await fetch(`/api/balance/${network}/${address}`);
        if (!response.ok) throw new Error('token fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch token balance for '${address}' on ${network}`, err)
    }
}