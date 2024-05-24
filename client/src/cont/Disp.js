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
            {(loading || !apiRes) ? <>Loading</> :
                <div className="container">
                    <div className="container"> Current displaying Address:
                        <FlapDisplay
                            className="darBordered"
                            chars={Presets.ALPHANUM + ',.!'}
                            length={42}
                            timing-={30}
                            value={apiRes.wAddress} />
                    </div>
                    {apiRes.balances.map((token, index) => (
                        <Token
                            key={index}
                            contractAddress={token.contractAddress}
                            name={token.name}
                            symbol={token.symbol || null}
                            balance={token.balance}




                        />
                    ))}
                </div>
            }
        </div >
    )

};

export default Disp;