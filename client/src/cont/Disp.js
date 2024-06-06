import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import TokenCont from './TokenCont'
import TxCont from './TxCont'


import {
    getTokenBalance,
    getTransactions
} from '../util/api';

function Disp() {
    const { searchParams } = useSearch();
    const [type, setType] = useState(searchParams.type || "default")
    const [apiRes, setApiRes] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setIndex] = useState()


    useEffect(() => {
        console.log("Disp useEffect triggered with:", searchParams);
        async function fetchData() {
            setLoading(true);
            let data;
            if (searchParams.type === "balance") {
                data = await getTokenBalance(searchParams.network, searchParams.walletAdd);
                console.log("Fetched data:", data);
                setApiRes(data);
                setType("balance")
                setLoading(false);
            } else if (searchParams.type === "transaction") {
                data = await getTransactions(searchParams.network, searchParams.walletAdd);
                console.log("Fetched data:", data);
                setApiRes(data);
                setType("transaction")
                setLoading(false);
            } else if (searchParams.type === (null || undefined)) {
                setApiRes();
                setType("default")
                setLoading(false)
            }

        }

        if (searchParams.walletAdd && searchParams.network) {
            fetchData();
        }
    }, [searchParams.type, searchParams.dir, searchParams, type]);

    useEffect(() => {
        console.log(apiRes);

    }, [apiRes])

    return (
        <div className="container">
            {(loading || !apiRes) ? <>Loading...</> : (type === "default") ? <>Default Search Screen</> :
                (apiRes.error) ? <>{`ERROR fetching ${type} for ${searchParams.walletAdd} on ${searchParams.net}`}</> :
                    (type === "balance") ?
                        <TokenCont apiRes={apiRes} /> :
                        <TxCont apiRes={apiRes} />
            }
        </div >
    )

};

export default Disp;