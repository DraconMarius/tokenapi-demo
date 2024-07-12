export const getTokenBalance = async (network, address, pageKey) => {
    const page = pageKey ? true : false
    const fetchURL = page ? `/api/balance/${network}/${address}?pgKey=${pageKey}` :
        `/api/balance/${network}/${address}`
    console.log(fetchURL)
    try {
        const response = await fetch(fetchURL);
        if (!response.ok) throw new Error('token fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch token balance for '${address}' on ${network}`, err)
        return { error: err }
    }
}

export const getTransactions = async (network, address, pageKey, order, zero) => {
    console.log(pageKey)
    const page = pageKey ? true : false
    const dir = order ? order : "desc"
    const zeroOpt = (zero === "true") ? true : false
    const fetchURL = page ? `/api/transactions/${network}/${address}?outpgKey=${pageKey.outboundKey}&inpgKey=${pageKey.inboundKey}&order=${dir}&zero=${zeroOpt}` :
        `/api/transactions/${network}/${address}?order=${dir}&zero=${zeroOpt}`
    console.log(fetchURL)
    try {
        const response = await fetch(fetchURL);
        if (!response.ok) throw new Error('transaction fetch error');

        const data = await response.json();

        return data;

    } catch (err) {
        console.error(`Failed to fetch transaction history for ${address} on ${network}`, err)
    }
}

export const getReceipt = async (network, hash) => {
    const fetchURL = `/api/receipt/${network}/${hash}`
    console.log(fetchURL)
    try {
        const response = await fetch(fetchURL);
        if (!response.ok) throw new Error('receipt fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch tx receipt for ${hash} on ${network}`)
    }
}