import React, { useState, useEffect } from 'react';

import { useSearch } from '../cont/searchContext';
import { getReceipt, getTokenTx } from '../util/api'

import { FlapDisplay, Presets } from 'react-split-flap-effect';

import loadingIcon from '../assets/loading.gif'
import scanUrl from '../util/scan';
import Tx from './Tx'

function Focus({ net, hash, wallet, contractAddress, setOpen, icon }) {
    const [isLoading, setLoading] = useState();
    const [receipt, setReceipt] = useState(null);
    console.log(net, (hash || contractAddress));

    useEffect(() => {
        async function fetchReceipt() {
            setLoading(true);
            console.log(`contractAdd: ${contractAddress}, hash: ${hash}`)
            try {
                if (hash && (!contractAddress)) {

                    const data = await getReceipt(net, hash)
                    setReceipt(data)
                }
                if (contractAddress && (!hash)) {
                    const data = await getTokenTx(net, wallet, contractAddress)
                    setReceipt(data)
                }

            } catch (err) {

                console.log("err")
            }



            setLoading(false)



        };

        if (net && (hash || contractAddress)) {
            fetchReceipt();
        }
    }, [hash, contractAddress])

    useEffect(() => {
        console.log(receipt)
    }, [receipt])


    return (
        <>
            <div className="modal-background" />
            {(!isLoading && receipt?.receipt) ?
                <div className="modal-card">
                    <div className="container">
                        <button className="delete is-pulled-right" aria-label="close" onClick={() => { setOpen(false) }}></button>
                    </div>
                    <header className="modal-card-head">
                        <div className="container">

                            <span>Transaction receipt for:</span>
                            <FlapDisplay
                                className="darBordered modal-card-title"
                                chars={Presets.ALPHANUM + ",.!"}
                                length={48}
                                timing={30}
                                hinge={true}
                                value={`${receipt.receipt.transactionHash}`} />
                        </div>

                    </header>
                    <section className="modal-card-body">

                        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                            <tbody>
                                <tr>
                                    <th>Status</th>
                                    {(receipt.receipt.status === 1) ? <td><div className="tag is-success">Success</div></td> :
                                        <td><div className="tag is-danger">Failure</div></td>}
                                </tr>
                                <tr>
                                    <th className=""> Tx Index</th>
                                    {(receipt.receipt.transactionIndex) ? <td>{receipt.receipt.transactionIndex}</td> :
                                        <td><div className="tag is-danger">Pending</div></td>}
                                </tr>
                                <tr>
                                    <th className=""> Block # </th>
                                    <td>{receipt.receipt.blockNumber} <div className="tag is-info">{`${receipt.receipt.confirmations} Confirmations`}</div></td>
                                </tr>
                                {receipt.receipt.to ?
                                    <tr>
                                        <th className=""> TO: </th>
                                        <td>{receipt.receipt.to || `contract creation`}</td>
                                    </tr> : <tr>
                                        <th className="">Contract Address</th>
                                        <td>{receipt.receipt.contractAddress}</td>
                                    </tr>
                                }
                                <tr>
                                    <th className=""> FROM: </th>
                                    <td>{receipt.receipt.from}</td>
                                </tr>
                                <tr>
                                    <th className=""> Type: </th>
                                    <td>{receipt.receipt.type}</td>
                                </tr>
                                <tr>
                                    <th className=""> Byzantium: </th>
                                    <td>{receipt.receipt.byzantium ? <div className="tag is-success">True</div> :
                                        <div className="tag is-danger">False</div>}</td>
                                </tr>
                                <tr>
                                    <th className=""> Cumulative Gas</th>
                                    <td>{parseInt(receipt.receipt.cumulativeGasUsed.hex, 16)}</td>
                                </tr>
                                <tr>
                                    <th className=""> Gas Used</th>
                                    <td>{`${Intl.NumberFormat().format(parseInt(receipt.receipt.gasUsed.hex, 16))} Unit`}</td>
                                </tr>
                                <tr>
                                    <th className=""> Gas Price</th>
                                    <td>{`${(parseInt(receipt.receipt.effectiveGasPrice.hex, 16) / (Math.pow(10, 9)))} Gwei`}</td>
                                </tr>
                            </tbody>
                        </table>

                    </section>

                </div> : (!isLoading && receipt?.tAddress) ?
                    <div className="modal-card helpCard">
                        <div className="container">
                            <button className="delete is-pulled-right" aria-label="close" onClick={() => { setOpen(false) }}></button>
                        </div>
                        <header className="modal-card-head">

                            <div className="container modal-card-title">
                                <figure className="image is-1by1 is-64x64">
                                    <img src={receipt?.descRes[0]?.mData?.logo || `https://placehold.co/48X48?text=${receipt?.descRes[0].mData?.name || receipt?.descRes[0].mData?.symbol || null}`} />
                                </figure>
                                <span> Token Transaction for: </span>
                                <div className="container ">
                                    <FlapDisplay
                                        className="darBordered focusFlap"
                                        chars={Presets.ALPHANUM + ",.!$"}
                                        length={15}
                                        timing={30}
                                        hing={true}
                                        value={receipt?.descRes[0]?.mData?.name || receipt?.descRes[0]?.mData?.symbol || null} />
                                    <FlapDisplay
                                        className="darBordered focusFlap"
                                        chars={Presets.ALPHANUM + ",.!"}
                                        length={42}
                                        timing={30}
                                        hinge={true}
                                        value={`${receipt.tAddress}`} />
                                </div>
                            </div>
                        </header>
                        <section className="modal-card-body">
                            <Tx apiRes={receipt} icon={icon} />
                        </section>
                    </div> :
                    < div className="modal-content">
                        <div className="image is-1by1">
                            <img src={loadingIcon} alt="loading gif" />
                        </div>
                    </div >

            }
        </>
    );
};

export default Focus;