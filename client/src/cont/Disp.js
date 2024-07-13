import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import TokenCont from './TokenCont'
import TxCont from './TxCont'

import loadingIcon from '../assets/loading.gif'

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
    }, [searchParams, searchParams.network, searchParams.type, searchParams.currentKey, searchParams.dir, searchParams.zeroOpt, searchParams.walletAdd, searchParams.pageKey]);

    // useEffect(() => {
    //     console.log("loading")
    //     document.getElementsById("modal").classList.toggle('is-active')
    // }, [loading])

    return (
        <div className="hero-background">
            {(loading) ?
                <div className="modal is-active">
                    <div className="modal-background">

                        <div className="modal-content">
                           <div className="image is-1by1">
                            <img src={loadingIcon} alt="loading gif" />
                        </div>
                        </div>
                    </div>
                </div> : ((type === "default") || !apiRes) ?
                    <section className="hero is-fullheight-with-navbar">

                        <div className="hero-body columns" >


                            <p className="title column">Token API Demo</p>


                        </div>

                        <div className="hero-foot">
                            <nav className="tabs is-boxed is-fullwidth">
                                <div className="container pt-0">
                                    <ul>
                                        <li>
                                            <a href="https://docs.alchemy.com" target="_blank" rel="noreferrer">Alchemy Docs</a>
                                        </li>
                                        <li>
                                            <a href="https://github.com/DraconMarius/tokenapi-demo" target="_blank" rel="noreferrer">Github</a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/mari-ma-70771585" target="_blank" rel="noreferrer">Contact</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                    </section > :
                    (apiRes.error || !apiRes.wAddress) ? <>{`ERROR fetching ${type} for ${searchParams.walletAdd} on ${searchParams.net}`}</> :
                        (type === "balance") ?
                            <TokenCont apiRes={apiRes} /> :
                            <TxCont apiRes={apiRes} />
            }
        </div >
    )

};

export default Disp;