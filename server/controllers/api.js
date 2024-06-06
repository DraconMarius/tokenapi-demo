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
            throw new Error(err.message)
        }
    };

    try {
        const results = await fetchBalance(chosenNet, chosenConfig, address, pageKey)
        // console.log(results);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    };
})


router.get('/transactions/:net/:address', async (req, res) => {

    console.log('==============/Transactions/Total==============')

    const chosenNet = req.params.net
    const chosenConfig = configs[chosenNet];
    console.log(chosenConfig)
    const address = req.params.address;
    const outpageKey = req.query.outpgKey || undefined
    const inpageKey = req.query.inpgKey || undefined
    const order = req.query.order || "desc"
    const zero = req.query.order || false

    const inboundParams = {
        order: order,
        toAddress: address,
        excludeZeroValue: zero,
        category: ["external", "erc20", "erc721", "erc1155", "specialnft"],
        maxCount: 100,
        pageKey: inpageKey,
        withMetadata: true
    }
    const outboundParams = {
        order: order,
        fromAddress: address,
        excludeZeroValue: zero,
        category: ["external", "erc20", "erc721", "erc1155", "specialnft"],
        maxCount: 100,
        pageKey: outpageKey,
        withMetadata: true
    }


    const fetchTransaction = async (chosenConfig, option) => {

        const params = (option === "outbound") ? outboundParams : inboundParams

        const alchemy = new Alchemy(chosenConfig)

        try {
            const transactions = await alchemy.core.getAssetTransfers(params)

            const nextPageKey = transactions.pageKey

            // console.log(transactions)


            return {
                res: transactions,
                pageKey: nextPageKey
            }

        } catch (err) {
            console.error(`Failed to fetch Transaction in function`, err);
            return { error: err.message }
        }
    }

    try {
        //order
        const mergeAndSortTransactions = (outTransactions, inTransactions) => {
            // Combine the two arrays
            const combined = [...inTransactions.res.transfers, ...outTransactions.res.transfers];

            // Sort combined array by timestamp, based on order in query
            // most recent first
            if (order === "desc") {
                combined.sort((a, b) => new Date(b.metadata.blockTimestamp) - new Date(a.metadata.blockTimestamp));
            } else {
                //oldest first
                combined.sort((a, b) => new Date(a.metadata.blockTimestamp) - new Date(b.metadata.blockTimestamp));
            }
            return combined;
        };

        const [outboundRes, inboundRes] = await Promise.all([
            fetchTransaction(chosenConfig, "outbound"),
            fetchTransaction(chosenConfig, "inbound")]
        )

        const keyObj = {
            outboundKey: outboundRes.res.pageKey ? outboundRes.res.pageKey : null,
            inboundKey: inboundRes.res.pageKey ? inboundRes.res.pageKey : null
        }

        const sortedRes = mergeAndSortTransactions(outboundRes, inboundRes)


        res.json({
            net: chosenNet,
            wAddress: address,
            [`${order}Res`]: sortedRes,
            pageKey: keyObj

        })

    } catch (err) {
        console.error("Failed to fetch Transactions @ Promise", err);
        res.status(500).json({ error: err.message })
    }


})

module.exports = router;