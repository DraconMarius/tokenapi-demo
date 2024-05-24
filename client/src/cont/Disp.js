import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import Token from '../comp/Token'
import { FlapDisplay, Presets } from 'react-split-flap-effect'


import {
    getTokenBalance
} from '../util/api';

function Disp() {
    const { searchParams } = useSearch();
    const [apiRes, setApiRes] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setIndex] = useState()


    useEffect(() => {
        console.log("searchParams:", searchParams)


        const fetchServer = async (searchParams) => {

            try {
                const data = await getTokenBalance(searchParams.network, searchParams.walletAdd)
                // console.log(data)
                return data;
            } catch (err) {
                console.error("Error fetching data: ", err)
            };

        };

        const fetchData = async () => {
            setLoading(true);
            const data = await fetchServer(searchParams)
            setApiRes(data)
        }
        if (searchParams.network && searchParams.walletAdd) {
            fetchData()
        }
        setLoading(false)
    }, [searchParams])

    useEffect(() => {
        console.log(apiRes);

    }, [apiRes])

    return (
        <div className="container">
            {(loading || !apiRes) ? <>Default</> :
                <div className="container">
                    Current displaying Address:
                    <FlapDisplay
                        className="darBordered"
                        chars={Presets.ALPHANUM + ',.!'}
                        length={42}
                        timing={60}
                        value={apiRes.wAddress} />
                    <section className="hero is-medium">
                        <div class="hero-body">
                            {!(selectedIndex) ? <>Select Token below to see balance</> :
                                <Token
                                    contractAddress={apiRes.balances[selectedIndex].contractAddress}
                                    name={apiRes.balances[selectedIndex].name}
                                    symbol={apiRes.balances[selectedIndex].symbol || null}
                                    balance={apiRes.balances[selectedIndex].balance}
                                    logo={apiRes.balances[selectedIndex].logo || "https://placehold.co/48X48"}
                                />

                            }
                        </div>
                    </section>
                    <div
                        className="buttons">

                        {apiRes.balances.map((token, index) => (

                            <button className="tag" id={index} onClick={e => setIndex(e.target.id)}>{token.symbol}</button>

                        )
                        )}
                    </div>
                </div>
            }
        </div >
    )

};

export default Disp;