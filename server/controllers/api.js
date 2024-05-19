const router = require('express').Router();
const { Alchemy, Network } = require('alchemy-sdk');

const Key = process.env.ALCHEMY_API_KEY;

//SDK Config Obj

const configs = {
    Eth: {
        apiKey: Key,
        network: Network.ETH_MAINNET
    },
    Polygon: {
        apiKey: Key,
        network: 'polygon-mainnet'
    },
    Arbitrum: {
        apiKey: Key,
        network: Network.ARB_MAINNET
    },
    Optimism: {
        apiKey: Key,
        network: Network.OPT_MAINNET
    },

    Base: {
        apiKey: Key,
        network: Network.BASE_MAINNET
    }
};

router.get('/balance/:net/:address', async (req, res) => {
    console.log('==============/Wallet/Balance==============')

    const chosenNet = req.params.net
    const chosenConfig = configs[chosenNet];
    console.log(chosenConfig)
    const address = req.params.address;
    const pageKey = req.query.pgKey || null

    const fetchBalance = async (net, chosenConfig, address, pageKey) => {
        const alchemy = new Alchemy(chosenConfig);
        try {

            const balances = await alchemy.core.getTokensForOwner(address, { pageKey: pageKey })

            // console.log("balances", balances)
            // console.log('nextPageKey', balances.pageKey)
            const nextPageKey = balances.pageKey
            let filtered = []
            // Remove tokens with zero balance, loop thru to get meta data and render it human-readable
            //(https://docs.alchemy.com/docs/how-to-get-all-tokens-owned-by-an-address)

            const nonZeroBalances = balances.tokens.filter((token) => {
                const isNonZero = BigInt(token.rawBalance) > 0n;

                if (!isNonZero) {
                    // console.log("Filtered out zero balance:", token.name)
                    filtered.push(token)
                }

                return isNonZero

            });

            let res = nonZeroBalances.map(token => {
                //converting balace to human-readable format based on dec place
                let balance = Number(token.rawBalance) / Math.pow(10, token.decimals);
                balance = balance.toFixed(3);
                return {
                    ...token, balance: balance //spread original token metadata then update balance field
                }
            });
            return {
                net: net,
                wAddress: address,
                balances: res,
                filtered: filtered,
                pageKey: nextPageKey
            }
        } catch (err) {
            console.error(`Failed to fetch Balance`, err);
            return { error: err.message }
        }
    };

    try {
        const results = await fetchBalance(chosenNet, chosenConfig, address, pageKey)
        // console.log(results);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

module.exports = router;