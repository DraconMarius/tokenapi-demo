import React, { useState, useEffect } from 'react';

import { useSearch } from './searchContext';

import Tx from '../comp/Tx';

import { FlapDisplay, Presets } from 'react-split-flap-effect';

function TxCont({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch()

    const [dir, setDir] = useState(searchParams.dir);
    const [zeroOpt, setzeroOpt] = useState(searchParams.zeroOpt);

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

    const isFirstPage = (searchParams.prevKeys && (searchParams.prevKeys.length === 0) && !searchParams.currentKey);
    const isLastPage = Object.keys(apiRes?.pageKey || {}).length === 0;
    const isNoData = apiRes?.[`${searchParams.dir}Res`]?.length === 0

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

        console.log(`dir and zeroOpt, ${dir}, ${zeroOpt}`)

    }, [searchParams.dir, searchParams.zeroOpt]);


    return (
        <div className='container'>


            Current displaying Transactions for Address on {apiRes.net}:
            <FlapDisplay
                className='darBordered'
                chars={Presets.ALPHANUM + ',.!'}
                length={42}
                timing={60}
                value={apiRes.wAddress} />

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
                            <option value={false}> False</option>
                            <option value={true}> True</option>
                        </select>
                    </div>
                </div>
                <div className="level-item">
                    <div className="button"
                        onClick={() => handleUpdate()}
                        disabled={isNoData}
                    >
                        Update Filter
                    </div>
                </div>
            </div>
            <div className="level">
                <div className="level-item">
                    <button className="button" disabled={isFirstPage} onClick={() => handlePageChange(false)}> Prev</button>
                </div>
                <div className="level-item">
                    <button className="button" disabled={isLastPage} onClick={() => handlePageChange(true)}> Next</button>
                </div>
            </div>

            <section className="hero is-medium">


                <Tx apiRes={apiRes} />


            </section>

            <div className="level">
                <div className="level-item">
                    <button className="button" disabled={isFirstPage} onClick={() => handlePageChange(false)}> Prev</button>
                </div>
                <div className="level-item">
                    <button className="button" disabled={isLastPage} onClick={() => handlePageChange(true)}> Next</button>
                </div>
            </div>
        </div>

    )


}

export default TxCont;