import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import Balance from '../comp/Balance';
import { FlapDisplay, Presets } from 'react-split-flap-effect';


function TokenCont({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch();
    const [selectedIndex, setIndex] = useState()


    const isFirstPage = (searchParams.prevKeys && (searchParams.prevKeys.length === 0) && !searchParams.currentKey);
    const isLastPage = !apiRes?.pageKey

    const handlePageChange = (isNext) => {
        console.log(isNext, "isNext?")
        // console.log(network, "network")
        if (isNext) {
            // Move to the next page
            const nextPageKey = apiRes.pageKey;
            console.log("test page Key", nextPageKey)
            //if going to 2nd page, no prev key, nor current key
            if (nextPageKey) {
                console.log('going to 2nd page')
                updateSearchParams({
                    ...searchParams,
                    "type": "balanceP",
                    "pageKey": `${nextPageKey}`,
                    "currentKey": nextPageKey,
                    isPrevPage: false,
                    isNew: false
                });
                //
            }
        } else {
            console.log("prev")
            // Move to the previous page

            updateSearchParams({
                ...searchParams,
                isPrevPage: true,
                isNew: false
            })


        }
    };

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
            <div className="level">
                <div className="level-item">
                    <button className="button" disabled={isFirstPage} onClick={() => handlePageChange(false)}> Prev</button>
                </div>
                <div className="level-item">
                    <button className="button" disabled={isLastPage} onClick={() => handlePageChange(true)}> Next</button>
                </div>
            </div>
            <div
                className="buttons is-justify-content-center is-align-items-center">

                {apiRes.balances.map((token, index) => (

                    <button className="tag" key={index} id={index} onClick={e => setIndex(e.target.id)}>{token.symbol}</button>

                )
                )}
            </div>
        </div >

    )



}

export default TokenCont;