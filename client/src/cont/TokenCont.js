import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import Balance from '../comp/Balance';
import { FlapDisplay, Presets } from 'react-split-flap-effect';


function TokenCont({ apiRes }) {
    // const { searchParams } = useSearch();
    const [selectedIndex, setIndex] = useState()

    return (
        <div className="container">
            Current displaying Token Balances for Address:
            <FlapDisplay
                className="darBordered"
                chars={Presets.ALPHANUM + ',.!'}
                length={42}
                timing={60}
                value={apiRes.wAddress} />
            <section className="hero is-medium">
                <div className="hero-body">
                    {!(selectedIndex) ? <>Select Token below to see balance</> :
                        <Balance
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
                className="buttons is-justify-content-center is-align-items-center">

                {apiRes.balances.map((token, index) => (

                    <button className="tag" key={index} id={index} onClick={e => setIndex(e.target.id)}>{token.symbol}</button>

                )
                )}
            </div>
        </div>

    )



}

export default TokenCont;