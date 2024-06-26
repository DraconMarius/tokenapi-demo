import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import TokenCont from './TokenCont'
import TxCont from './TxCont'

import { info } from '../util/info.js'

import {
    getTokenBalance,
    getTransactions
} from '../util/api';

function Disp() {
    const { searchParams } = useSearch();
    const [type, setType] = useState(searchParams.type || "default")
    const [apiRes, setApiRes] = useState();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        console.log("Disp useEffect triggered with:", searchParams);
        async function fetchData() {
            setLoading(true);
            let data;
            if ((searchParams.type === "balance") && (!searchParams.pageKey)) {
                data = await getTokenBalance(searchParams.network, searchParams.walletAdd);
                console.log("Fetched data:", data);
                setApiRes(data);
                setType("balance")
                setLoading(false);
            } else if (searchParams.type === "transaction") {
                data = await getTransactions(searchParams.network, searchParams.walletAdd, null, searchParams.dir, searchParams.zeroOpt);
                console.log("Fetched data:", data);
                setApiRes(data);
                setType("transaction")
                setLoading(false);
            } else if (searchParams.type === "balanceP") {
                data = await getTokenBalance(searchParams.network, searchParams.walletAdd, searchParams.pageKey);
                console.log("Fetched data:", data);
                setApiRes(data);
                setType("balance")
                setLoading(false);
            } else if (searchParams.type === "transactionP") {
                data = await getTransactions(searchParams.network, searchParams.walletAdd, searchParams.pageKey, searchParams.dir, searchParams.zeroOpt);
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
    }, [searchParams.network, searchParams.type, searchParams.currentKey, searchParams.dir, searchParams.zeroOpt, searchParams.walletAdd, searchParams.pageKey]);

    useEffect(() => {
        console.log(type);

    }, [type])

    return (
        <div className="container">
            {(loading || !apiRes || (type === "default")) ?
                <div className="block">
                    <div className="">
                        {Object.entries(info).map(([key, value]) => (

                            <div className="card" key={key}>
                                <header className="card-header">
                                    <p className="card-header-title">
                                        {value.title}
                                    </p>
                                </header>
                                <div className="card-content">
                                    {value.img.map((item, index) => (
                                        <div key={index}>
                                            <div className="content is-align-items-center is-justify-content-center">
                                                <p>{item.text}</p>
                                                <figure className="image">
                                                    <img src={item.src} alt="Help Image" />
                                                </figure>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        ))}
                    </div>
                </div> :
                (apiRes.error || !apiRes.wAddress) ? <>{`ERROR fetching ${type} for ${searchParams.walletAdd} on ${searchParams.net}`}</> :
                    (type === "balance") ?
                        <TokenCont apiRes={apiRes} /> :
                        <TxCont apiRes={apiRes} />
            }
        </div >
    )

};

export default Disp;