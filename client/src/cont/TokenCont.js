import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import Balance from '../comp/Balance';
import { FlapDisplay, Presets } from 'react-split-flap-effect';

import ethereumIcon from '../assets/etherscan-logo.png'
import arbitrumIcon from '../assets/arbitrum-logo.png'
import optimismIcon from '../assets/optimism-logo.png'
import polygonIcon from '../assets/polygon-logo.png'

import scanUrl from '../util/scan'


function TokenCont({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch();
    // const [selectedIndex, setIndex] = useState();
    const [icon, setIcon] = useState();


    const isFirstPage = (searchParams.prevKeys && (searchParams.prevKeys.length === 0) && !searchParams.currentKey);
    const isLastPage = !apiRes?.pageKey

    const etherscanWallet = `${scanUrl[searchParams.network]}address/${apiRes.wAddress}`

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

    useEffect(() => {

        if (searchParams.network === "Polygon") {
            setIcon(polygonIcon)
        } else if (searchParams.network === "Arbitrum") {
            setIcon(arbitrumIcon)
        } else if (searchParams.network === "Optimism") {
            setIcon(optimismIcon)
        } else {
            setIcon(ethereumIcon)
        }

    }, [searchParams.network]);

    if (!apiRes) {
        return <p>No Token Data Available</p>;
    }



    return (
        <div className='container'>
            Current displaying Token Balances for Address:
            <div className="container">
                <FlapDisplay
                    className="darBordered is-pulled-left"
                    chars={Presets.ALPHANUM + ',.!'}
                    length={42}
                    timing={60}
                    value={apiRes.wAddress} />
                <a href={etherscanWallet} target="_blank" className="pl-3 is-align-self-center">
                    <span className="icon is-small is-align-self-center"  ><img src={icon} /></span>
                </a>
            </div>
            <section className="hero is-fullheight-with-navbar">
                <div className="level hero-head">
                    <div className="level-item">
                        <button className="button" disabled={isFirstPage} onClick={() => handlePageChange(false)}> Prev</button>
                    </div>
                    <div className="level-item">
                        <button className="button" disabled={isLastPage} onClick={() => handlePageChange(true)}> Next</button>
                    </div>
                </div>
                <div className="hero-body pb-1 pt-0 is-justify-content-center">

                    {(apiRes.balances.length === 0) ?
                        <>No Token Balance Detected!</> :
                        <div className="list ">
                            {apiRes.balances.map((token, index) => (

                                <Balance
                                    key={index}
                                    contractAddress={token.contractAddress}
                                    name={token.name || "no_name"}
                                    symbol={token.symbol || "null"}
                                    balance={token.balance}
                                    logo={token.logo || `https://placehold.co/48X48?text=${token.symbol}`}
                                    network={searchParams.network}
                                    icon={icon}
                                />
                            )
                            )}
                        </div>
                    }
                </div>
                <div className="level">
                    <div className="level-item">
                        <button className="button" disabled={isFirstPage} onClick={() => handlePageChange(false)}> Prev</button>
                    </div>
                    <div className="level-item">
                        <button className="button" disabled={isLastPage} onClick={() => handlePageChange(true)}> Next</button>
                    </div>
                </div>
            </section>
        </div >

    )



}

export default TokenCont;