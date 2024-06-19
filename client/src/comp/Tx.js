import React, { useState, useEffect } from 'react';

import { useSearch } from '../cont/searchContext';

import { FlapDisplay, Presets } from 'react-split-flap-effect';

import etherscanIcon from '../assets/etherscan-logo.png'

function Tx({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch()
    // console.log("transaction log", apiRes)

    const copyString = (string) => {
        navigator.clipboard.writeText(string)
        console.log(`copied ${string} to keyboard`)
    }

    const dirRes = `${searchParams.dir}Res`
    console.log(dirRes)

    if (!apiRes[dirRes]) {
        return <p>No Transaction Data Available</p>;
    }


    return (
        <>
            {!apiRes ? <>loading</> : (apiRes[dirRes].length === 0) ? <div className='card '><div className='card-content '>
                <div className="content">

                    <div>
                        <FlapDisplay
                            className="darBordered is-justify-content-center"
                            chars={Presets.ALPHANUM + ',.!'}
                            length={42}
                            timing={30}
                            hinge={true}
                            value="No transaction Data Available!" />

                    </div>
                </div>
            </div>
            </div> :
                <div className="table-container ">
                    <table className="table is-justify-content-center is-align-content-center is-bordered is-striped is-fullwidth is-hoverable is-narrow">
                        <thead>
                            <tr>
                                <th title="Age"> Age </th>
                                <th> <abbr title="Transaction Hash">Hash #</abbr></th>
                                <th> <abbr title="Bock Number">Block</abbr></th>
                                <th title="Type"> Type</th>
                                <th><abbr title="Tx Direction">Tx Dir</abbr></th>
                                <th><abbr title="Address"> Add # </abbr></th>
                                <th><abbr title="Value and Assets">Val + Assets</abbr></th>
                            </tr>
                        </thead>

                        <tbody>

                            {apiRes[dirRes].map((tx, index) => {

                                const otherAdd = (apiRes.wAddress === tx.from) ? tx.to : tx.from

                                const blockNum = parseInt(tx.blockNum, 12)

                                const etherscanAdd = `https://etherscan.io/address/${otherAdd}`

                                const etherscanHash = `https://etherscan.io/tx/${tx.hash}`

                                const etherscanBlock = `https://etherscan.io/block/${blockNum}`

                                const formatAdd = (add) => {
                                    try {

                                        const first = add.slice(0, 10);
                                        const last = add.slice(-8);

                                        return `${first}...${last}`
                                    } catch (err) {
                                        return `*undefined*`
                                    }

                                }

                                return (
                                    <tr key={index} >
                                        {/* <th>{new Date(tx.metadata.blockTimestamp).toString()}</th> */}
                                        <td
                                            className="has-tooltip-arrow has-tooltip-warning"
                                            data-tooltip={new Date(tx.metadata.blockTimestamp).toLocaleString()}>
                                            {tx.metadata.age}</td>
                                        <td
                                            className="has-tooltip-arrow has-tooltip-primary "
                                            data-tooltip={tx.hash}
                                            onClick={() => copyString(tx.hash)}>
                                            <span className="is-align-item-center">
                                                <span>{`${tx.hash.slice(0, 10)}...`}</span>
                                                <a href={etherscanHash} className="is-pulled-right" target="_blank">
                                                    <span className="icon is-small is-align-self-center" ><img src={etherscanIcon} /></span>
                                                </a>
                                            </span>
                                        </td>
                                        <td
                                            onClick={() => copyString(tx.blockNum)}>
                                            <span className="is-align-item-center">
                                                <span>{blockNum}</span>
                                                <a href={etherscanBlock} className="is-pulled-right" target="_blank">
                                                    <span className="icon is-small is-align-self-center"  ><img src={etherscanIcon} /></span>
                                                </a>
                                            </span>
                                        </td>
                                        <td>{tx.category}</td>
                                        {/* conditionally render inbound/outbound tag, then display the address */}
                                        <td className="has-text-centered">
                                            {(apiRes.wAddress === tx.from) ?
                                                <div className="tag is-warning">TO</div> :
                                                <div className="tag is-info">FROM</div>}

                                        </td>
                                        <td
                                            className="has-tooltip-arrow has-tooltip-primary"
                                            data-tooltip={otherAdd}
                                            onClick={() => copyString(otherAdd)}>
                                            <span className="is-align-item-center">
                                                <span>{formatAdd(otherAdd)}</span>
                                                <a href={etherscanAdd} className="is-pulled-right" target="_blank">
                                                    <span className="icon is-small is-align-self-center"  ><img src={etherscanIcon} /></span>
                                                </a>
                                            </span>
                                        </td>
                                        <td className="is-align-content-center">
                                            <span className="icon-text is-align-content-center">

                                                <span> {tx.value}{` ${(tx.asset?.length > 15) ? `UNIT(s)` : tx.asset}`} </span>
                                                {tx.mData ?
                                                    <span className="icon is-small is-align-self-center"><img src={tx.mData.logo || "https://placehold.co/50?text=null"} /></span> : <></>}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default Tx;