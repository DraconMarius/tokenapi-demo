const router = require('express').Router();
const { Alchemy, Network } = require('alchemy-sdk');

const { calcAge } = require("../util/age")

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

            nonZeroBalances.sort((a, b) => {
                if (a.logo && !b.logo) {
                    return -1;
                } else if (!a.logo && b.logo) {
                    return 1;
                } else {
                    return 0;
                }
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
});


router.get('/transactions/:net/:address', async (req, res) => {

    console.log('==============/Transactions/Total==============')

    const chosenNet = req.params.net
    const chosenConfig = configs[chosenNet];
    console.log(chosenConfig)
    const address = req.params.address;
    const outpageKey = req.query.outpgKey || null
    const inpageKey = req.query.inpgKey || null
    const order = req.query.order || "desc"
    const zero = (req.query.zero === "false") ? false : true //making sure to pass boolean instead of string, sorry that it is a lil bit scrappy

    console.log(`inKey: ${inpageKey}, outKey: ${outpageKey}, zero:${zero}, order: ${order}`)
    console.log(typeof (zero))


    const createParams = (pageKey, otherOpts) => {
        if (pageKey) {
            return { ...otherOpts, pageKey: pageKey }
        } else return otherOpts;
    };

    const inboundParams = createParams(inpageKey, {
        order: order,
        toAddress: address,
        excludeZeroValue: zero,
        category: ["external", "erc20", "erc721", "erc1155", "specialnft"],
        maxCount: 50,
        withMetadata: true
    });

    const outboundParams = createParams(outpageKey, {
        order: order,
        fromAddress: address,
        excludeZeroValue: zero,
        category: ["external", "erc20", "erc721", "erc1155", "specialnft"],
        maxCount: 50,
        withMetadata: true
    });


    const fetchTransaction = async (chosenConfig, option) => {

        const params = (option === "outbound") ? outboundParams : inboundParams

        console.log(params)

        const alchemy = new Alchemy(chosenConfig)

        const fetchTokenMetadata = async (tokenAddress, alchemy) => {
            try {
                const metadata = await alchemy.core.getTokenMetadata(tokenAddress);
                return metadata;
            } catch (error) {
                console.error("Error fetching token metadata for address:", tokenAddress, error);
                return null;
            }
        };

        const addmData = async (txs, alchemy) => {
            const promises = txs.map(async (tx) => {
                if ((tx.category === "erc20") && (tx.value !== "0")) {
                    const mData = await fetchTokenMetadata(tx.rawContract.address, alchemy)
                    return { ...tx, mData: mData };
                }
                return tx;
            })
            return Promise.all(promises)
        }

        try {
            const transactions = await alchemy.core.getAssetTransfers(params)
            const txWithMetadata = await addmData(transactions.transfers, alchemy);

            const nextPageKey = transactions.pageKey

            // console.log(transactions)


            return {
                res: { ...transactions, transfers: txWithMetadata },
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
            // updated to handle potentially empty array when one direction TX results ends
            const outTransfers = outTransactions.res ? outTransactions.res.transfers : [];
            const inTransfers = inTransactions.res ? inTransactions.res.transfers : [];

            // age calculation
            const combined = [
                ...outTransfers.map(t => ({
                    ...t,
                    metadata: {
                        ...t.metadata,
                        age: calcAge(t.metadata.blockTimestamp)
                    }
                })),
                ...inTransfers.map(t => ({
                    ...t,
                    metadata: {
                        ...t.metadata,
                        age: calcAge(t.metadata.blockTimestamp)
                    }
                }))
            ];

            // Sort by timestamp, based on the order in the query
            if (order === "desc") {
                combined.sort((a, b) => new Date(b.metadata.blockTimestamp) - new Date(a.metadata.blockTimestamp));
            } else {
                combined.sort((a, b) => new Date(a.metadata.blockTimestamp) - new Date(b.metadata.blockTimestamp));
            }
            return combined;
        };

        // const [outboundRes, inboundRes] = await Promise.all([
        //     fetchTransaction(chosenConfig, "outbound"),
        //     fetchTransaction(chosenConfig, "inbound")]
        // )

        const promises = [];
        if (!outpageKey || !inpageKey) { // Check if initial query or pagination
            // Initial query 
            promises.push(fetchTransaction(chosenConfig, "outbound"));

            promises.push(fetchTransaction(chosenConfig, "inbound"));

        } else {
            // Only query directions with a valid pageKey otherwise push empty array
            if (outpageKey) {
                promises.push(fetchTransaction(chosenConfig, "outbound"));
            } else {
                promises.push([])
            };

            if (inpageKey) {
                promises.push(fetchTransaction(chosenConfig, "inbound"));
            } else {
                promises.push([])
            };
        }

        const results = await Promise.all(promises)

        const sortedRes = mergeAndSortTransactions(results[0], results[1])

        const keyObj = {
            outboundKey: results[0] ? results[0]?.res?.pageKey : null,
            inboundKey: results[1] ? results[1]?.res?.pageKey : null
        }



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

router.get('/receipt/:net/:hash', async (req, res) => {
    console.log('==============/Receipts==============')

    const chosenNet = req.params.net
    const chosenConfig = configs[chosenNet];
    console.log(chosenConfig)
    const hash = req.params.hash;

    const fetchReceipt = async (net, chosenConfig, hash) => {
        const alchemy = new Alchemy(chosenConfig);
        try {
            const receipt = await alchemy.core.getTransactionReceipt(hash)
            return {
                net: net,
                receipt: receipt
            }
        } catch (err) {
            console.error(`Failed to fetch Receipt`, err);
            throw new Error(err.message)
        };
    };

    try {
        const results = await fetchReceipt(chosenNet, chosenConfig, hash);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    };
});

router.get('/tokentx/:net/:wallet/:token', async (req, res) => {

    console.log('==============/Token/Transaction==============')

    const chosenNet = req.params.net
    const chosenConfig = configs[chosenNet];
    console.log(chosenConfig)
    const wAddress = req.params.wallet;
    const tAddress = req.params.token;
    const outpageKey = req.query.outpgKey || null
    const inpageKey = req.query.inpgKey || null
    const order = req.query.order || "desc"
    const zero = (req.query.zero === "false") ? false : true //making sure to pass boolean instead of string, sorry that it is a lil bit scrappy

    console.log(`inKey: ${inpageKey}, outKey: ${outpageKey}, zero:${zero}, order: ${order}`)
    // console.log(typeof (zero))


    const createParams = (pageKey, otherOpts) => {
        if (pageKey) {
            return { ...otherOpts, pageKey: pageKey }
        } else return otherOpts;
    };

    const inboundParams = createParams(inpageKey, {
        order: order,
        toAddress: wAddress,
        contractAddresses: [tAddress],
        excludeZeroValue: true,
        category: ["erc20", "erc721", "erc1155"],
        maxCount: 50,
        withMetadata: true
    });

    const outboundParams = createParams(outpageKey, {
        order: order,
        contractAddresses: [tAddress],
        fromAddress: wAddress,
        excludeZeroValue: true,
        category: ["erc20", "erc721", "erc1155"],
        maxCount: 50,
        withMetadata: true
    });


    const fetchTransaction = async (chosenConfig, option) => {

        const params = (option === "outbound") ? outboundParams : inboundParams

        console.log(params)

        const alchemy = new Alchemy(chosenConfig)

        const fetchTokenMetadata = async (tokenAddress, alchemy) => {
            try {
                const metadata = await alchemy.core.getTokenMetadata(tokenAddress);
                return metadata;
            } catch (error) {
                console.error("Error fetching token metadata for address:", tokenAddress, error.message);
                return null;
            }
        };

        const addmData = async (txs, alchemy) => {
            const promises = txs.map(async (tx) => {
                if ((tx.category === "erc20") && (tx.value !== "0")) {
                    const mData = await fetchTokenMetadata(tx.rawContract.address, alchemy)
                    return { ...tx, mData: mData };
                }
                return tx;
            })
            return Promise.all(promises)
        }

        try {
            const transactions = await alchemy.core.getAssetTransfers(params)
            const txWithMetadata = await addmData(transactions.transfers, alchemy);

            const nextPageKey = transactions.pageKey

            // console.log(transactions)


            return {
                res: { ...transactions, transfers: txWithMetadata },
                pageKey: nextPageKey
            }

        } catch (err) {
            console.error(`Failed to fetch Token Transaction in function ${option}`, err.message);
            return { error: err.message }
        }
    }

    try {
        //order
        const mergeAndSortTransactions = (outTransactions, inTransactions) => {
            // updated to handle potentially empty array when one direction TX results ends
            const outTransfers = outTransactions.res ? outTransactions.res.transfers : [];
            const inTransfers = inTransactions.res ? inTransactions.res.transfers : [];

            // age calculation
            const combined = [
                ...outTransfers.map(t => ({
                    ...t,
                    metadata: {
                        ...t.metadata,
                        age: calcAge(t.metadata.blockTimestamp)
                    }
                })),
                ...inTransfers.map(t => ({
                    ...t,
                    metadata: {
                        ...t.metadata,
                        age: calcAge(t.metadata.blockTimestamp)
                    }
                }))
            ];

            // Sort by timestamp, based on the order in the query
            if (order === "desc") {
                combined.sort((a, b) => new Date(b.metadata.blockTimestamp) - new Date(a.metadata.blockTimestamp));
            } else {
                combined.sort((a, b) => new Date(a.metadata.blockTimestamp) - new Date(b.metadata.blockTimestamp));
            }
            return combined;
        };

        // const [outboundRes, inboundRes] = await Promise.all([
        //     fetchTransaction(chosenConfig, "outbound"),
        //     fetchTransaction(chosenConfig, "inbound")]
        // )

        const promises = [];
        if (!outpageKey || !inpageKey) { // Check if initial query or pagination
            // Initial query 
            promises.push(fetchTransaction(chosenConfig, "outbound"));

            promises.push(fetchTransaction(chosenConfig, "inbound"));

        } else {
            // Only query directions with a valid pageKey otherwise push empty array
            if (outpageKey) {
                promises.push(fetchTransaction(chosenConfig, "outbound"));
            } else {
                promises.push([])
            };

            if (inpageKey) {
                promises.push(fetchTransaction(chosenConfig, "inbound"));
            } else {
                promises.push([])
            };
        }

        const results = await Promise.all(promises)

        const sortedRes = mergeAndSortTransactions(results[0], results[1])

        const keyObj = {
            outboundKey: results[0] ? results[0]?.res?.pageKey : null,
            inboundKey: results[1] ? results[1]?.res?.pageKey : null
        }



        res.json({
            net: chosenNet,
            wAddress: wAddress,
            tAddress: tAddress,
            [`${order}Res`]: sortedRes,
            pageKey: keyObj
        })

    } catch (err) {
        console.error("Failed to fetch Token Transactions @ Promise", err.message);
        res.status(500).json({ error: err.message })
    }


});

module.exports = router;