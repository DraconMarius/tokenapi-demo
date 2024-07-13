import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import Tx from '../comp/Tx';

import { FlapDisplay, Presets } from 'react-split-flap-effect';

import ethereumIcon from '../assets/etherscan-logo.png'
import arbitrumIcon from '../assets/arbitrum-logo.png'
import optimismIcon from '../assets/optimism-logo.png'
import polygonIcon from '../assets/polygon-logo.png'

import scanUrl from '../util/scan'

function TxCont({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch()

    const [dir, setDir] = useState(searchParams.dir);
    const [zeroOpt, setzeroOpt] = useState(searchParams.zeroOpt);

    const [icon, setIcon] = useState()

    const handleUpdate = () => {
        updateSearchParams({
            ...searchParams,
            dir: dir,
            zeroOpt: zeroOpt,
            isNew: false,
            pageKey: '',
            prevKeys: [],
            currentKey: ''
        })
    }
    const etherscanWallet = `${scanUrl[searchParams.network]}address/${apiRes.wAddress}`

    const isFirstPage = (searchParams.prevKeys && (searchParams.prevKeys.length === 0) && !searchParams.currentKey);
    const isLastPage = Object.keys(apiRes?.pageKey || {}).length === 0;
    const isNoData = apiRes?.[`${searchParams.dir}Res`]?.length === 0;
    let mismatchSetting = ((searchParams.zeroOpt !== zeroOpt) || (searchParams.dir !== dir))



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
                    "type": "transactionP",
                    "pageKey": nextPageKey,
                    "currentKey": nextPageKey,
                    dir: dir,
                    zeroOpt: zeroOpt,
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
                dir: dir,
                zeroOpt: zeroOpt,
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

    // useEffect(() => {
    //     console.log(`dir: ${dir}, zeroOpt: ${zeroOpt}`);
    //     console.log(`paramDir: ${searchParams.dir}, paramOpt: ${searchParams.zeroOpt}`);
    //     console.log(`Mismatch Setting: ${mismatchSetting}`);

    //     const updateBtn = document.querySelector(".updateBtn");
    //     if (updateBtn) {
    //         if (mismatchSetting) {
    //             updateBtn.classList.remove("is-hidden");
    //         } else {
    //             updateBtn.classList.add("is-hidden");
    //         }
    //     }
    // }, [mismatchSetting, dir, zeroOpt, searchParams.dir, searchParams.zeroOpt]);


    return (
        <div className='container '>

            Current displaying Transactions for Address on {apiRes.net}:
            <div className="container">
                <FlapDisplay
                    className='darBordered is-pulled-left'
                    chars={Presets.ALPHANUM + ',.!'}
                    length={42}
                    timing={60}
                    value={apiRes.wAddress} />
                <a href={etherscanWallet} target="_blank" rel="noreferrer" className="pl-3 is-align-self-center">
                    <span className="icon is-small is-align-self-center"  ><img src={icon} /></span>
                </a>
            </div>
            <section className="hero is-fullheight-with-navbar">

                <div className="hero-header">

                    <div className="level">
                        <div className="level-item">

                            <p >Order? :</p>
                            <div className="select" id="order">
                                <select value={dir} onChange={e => setDir(e.target.value)}
                                    disabled={isNoData}>
                                    <option value="desc"> Descending</option>
                                    <option value="asc"> Ascending</option>
                                </select>
                            </div>
                        </div>
                        <div className="level-item">
                            <p >Exclude Zeros? :</p>
                            <div className="select" id="zero" >
                                <select value={zeroOpt} onChange={e => setzeroOpt(e.target.value)}
                                    disabled={isNoData}
                                >
                                    <option value={"false"}> False</option>
                                    <option value={"true"}> True</option>
                                </select>
                            </div>
                        </div>
                        <div className={`level-item updateBtn ${mismatchSetting ? '' : 'is-hidden'}`} >
                            <div className="button"
                                onClick={() => handleUpdate()}
                                disabled={!mismatchSetting}
                            >
                                Update Filter
                            </div>
                        </div>
                    </div>
                    <div className="level">
                        <div className="level-item">
                            <button className="button" disabled={(isFirstPage || mismatchSetting)} onClick={() => handlePageChange(false)}> Prev</button>
                        </div>
                        <div className="level-item">
                            <button className="button" disabled={(isLastPage || mismatchSetting)} onClick={() => handlePageChange(true)}> Next</button>
                        </div>
                    </div>
                </div>

                <div className="hero-body pt-1 pb-1 is-justify-content-center">

                    <Tx apiRes={apiRes} icon={icon} />

                </div>

                <div className="hero-footer">
                    <div className="level">
                        <div className="level-item">
                            <button className="button" disabled={isFirstPage} onClick={() => handlePageChange(false)}> Prev</button>
                        </div>
                        <div className="level-item">
                            <button className="button" disabled={isLastPage} onClick={() => handlePageChange(true)}> Next</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )


}

export default TxCont;