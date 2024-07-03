import React, { useState, useRef } from 'react';

import { useSearch } from '../cont/searchContext';

import { FlapDisplay, Presets } from 'react-split-flap-effect';

import Focus from './Focus'
import scanUrl from '../util/scan';

function Tx({ apiRes, icon }) {
    const { searchParams, updateSearchParams } = useSearch()
    const [isOpen, setOpen] = useState(false)
    const focusedHash = useRef()

    const copyString = (string) => {
        navigator.clipboard.writeText(string)
        console.log(`copied ${string} to keyboard`)
    }

    const dirRes = `${searchParams.dir}Res`
    console.log(dirRes)

    const handleFocus = (hash) => {
        focusedHash.current = hash
        console.log(focusedHash.current)
        if (focusedHash.current !== (undefined || null)) {
            setOpen(!isOpen)
            // document.getElementById('focus-view').classList.toggle('is-active')
        }
    }

    // useEffect(() => {
    //     if (focusedHash) {
    //         console.log(focusedHash)

    //     }
    // }, [focusedHash, handleFocus, setHash])

    if (!apiRes[dirRes]) {
        return <p>No Transaction Data Available</p>;
    }

    return (
        <>
            {!apiRes ? <>loading</> : (apiRes[dirRes].length === 0) ? <div className='card '><div className='card-content '>
                <div className="content ">

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

                                const blockNum = parseInt(tx.blockNum, 16)

                                const etherscanAdd = `${scanUrl[searchParams.network]}address/${otherAdd}`

                                const etherscanHash = `${scanUrl[searchParams.network]}tx/${tx.hash}`

                                const etherscanBlock = `${scanUrl[searchParams.network]}block/${blockNum}`

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
                                            className="has-tooltip-arrow "
                                            data-tooltip={new Date(tx.metadata.blockTimestamp).toLocaleString()}>
                                            {tx.metadata.age}</td>
                                        <td
                                            className="has-tooltip-arrow  is-clickable "
                                            data-tooltip={tx.hash}
                                            onClick={() => handleFocus(tx.hash)}>
                                            <span className="is-align-item-center">
                                                <span>{`${tx.hash.slice(0, 10)}...`}</span>
                                                <a href={etherscanHash} className="is-pulled-right" target="_blank">
                                                    <span className="icon is-small is-align-self-center" ><img src={icon} /></span>
                                                </a>
                                            </span>
                                        </td>
                                        <td
                                            className="is-clickable"
                                            onClick={() => copyString(tx.blockNum)}>
                                            <span className="is-align-item-center">
                                                <span>{blockNum}</span>
                                                <a href={etherscanBlock} className="is-pulled-right" target="_blank">
                                                    <span className="icon is-small is-align-self-center"  ><img src={icon} /></span>
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
                                            className="has-tooltip-arrow"
                                            data-tooltip={otherAdd}
                                            onClick={() => copyString(otherAdd)}>
                                            <span className="is-align-item-center">
                                                <span>{formatAdd(otherAdd)}</span>
                                                <a href={etherscanAdd} className="is-pulled-right" target="_blank">
                                                    <span className="icon is-small is-align-self-center"  ><img src={icon} /></span>
                                                </a>
                                            </span>
                                        </td>
                                        <td className="is-align-content-center">
                                            <span className="icon-text is-align-content-center">

                                                <span> {tx.value}{` ${(tx.asset?.length > 15) ? `UNIT(s)` : tx.asset}`} </span>
                                                {tx.mData ?
                                                    <span className="icon is-small is-align-self-center"><img src={tx.mData.logo || null} /></span> : <></>}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    {isOpen ? <div className="modal is-active" id="focus-view">
                        <Focus net={searchParams.network} hash={focusedHash.current} setOpen={setOpen} />
                    </div> : <></>}
                </div>
            }
        </>
    )
}

export default Tx;