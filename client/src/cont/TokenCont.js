import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import Balance from '../comp/Balance';
import { FlapDisplay, Presets } from 'react-split-flap-effect';

import etherscanIcon from '../assets/etherscan-logo.png'


function TokenCont({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch();
    const [selectedIndex, setIndex] = useState()


    const isFirstPage = (searchParams.prevKeys && (searchParams.prevKeys.length === 0) && !searchParams.currentKey);
    const isLastPage = !apiRes?.pageKey

    const etherscanWallet = `https://etherscan.io/address/${apiRes.wAddress}`

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

    if (!apiRes) {
        return <p>No Token Data Available</p>;
    }

    return (
        <div className="container">
            Current displaying Token Balances for Address:
            <div className="container">
                <FlapDisplay
                    className="darBordered is-pulled-left"
                    chars={Presets.ALPHANUM + ',.!'}
                    length={42}
                    timing={60}
                    value={apiRes.wAddress} />
                <a href={etherscanWallet} target="_blank" className="pl-3 is-align-self-center">
                    <span className="icon is-small is-align-self-center"  ><img src={etherscanIcon} /></span>
                </a>
            </div>
            <section className="hero is-medium">
                <div className="hero-body">
                    {(apiRes.balances.length === 0) ?
                        <>No Token Balance Detected!</> :
                        !(selectedIndex) ? <>Select Token below to see balance</> :
                            <Balance
                                contractAddress={apiRes.balances[selectedIndex].contractAddress}
                                name={apiRes.balances[selectedIndex].name || "no_name"}
                                symbol={apiRes.balances[selectedIndex].symbol || "null"}
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

                    <button className="tag" key={index} id={index} onClick={e => setIndex(e.target.id)}>{(token.symbol?.length < 8) ? token.symbol : (token.name || "no_name")}</button>

                )
                )}
            </div>
        </div >

    )



}

export default TokenCont;