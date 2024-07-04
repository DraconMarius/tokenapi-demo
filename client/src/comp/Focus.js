import React, { useState, useEffect } from 'react';

import { useSearch } from '../cont/searchContext';
import { getReceipt } from '../util/api'

import { FlapDisplay, Presets } from 'react-split-flap-effect';

import ethereumIcon from '../assets/etherscan-logo.png';
import arbitrumIcon from '../assets/arbitrum-logo.png';
import optimismIcon from '../assets/optimism-logo.png';
import polygonIcon from '../assets/polygon-logo.png';
import loading from '../assets/loading.gif';

import scanUrl from '../util/scan';

function Focus({ net, hash, setOpen }) {
    const [isLoading, setLoading] = useState();
    const [receipt, setReceipt] = useState(null)
    console.log(net, hash)

    useEffect(() => {
        async function fetchReceipt() {
            setLoading(true);
            const data = await getReceipt(net, hash)
            setReceipt(data)
            setLoading(false)

        };

        if (net && hash) {
            fetchReceipt();
        }
    }, [hash])

    useEffect(() => {
        console.log(receipt)
    }, [receipt])


    return (
        <>
            <div className="modal-background" />
            {(!isLoading && receipt) ? <div className="modal-card">
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
                    <button className="delete" aria-label="close" onClick={() => { setOpen(false) }}></button>
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
                                    <td><div className="tag is-danger">Pending</div></td>
                                }
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

            </div> :
                <div className="modal-content">
                    <div className="image is-1by1">
                        <img src={loading} alt="loading gif" />
                    </div>
                </div>

            }
        </>
    );
};

export default Focus;