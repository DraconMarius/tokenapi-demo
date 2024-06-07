import React, { useState, useEffect } from 'react';

import { useSearch } from '../cont/searchContext';

function Tx({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch()
    // console.log("transaction log", apiRes)

    const dirRes = `${searchParams.dir}Res`
    console.log(dirRes)

    return (
        <div className="table-containe ">
            <table className="table is-justify-content-center is-bordered is-striped is-fullwidth is-hoverable is-narrow">
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

                        const otherAdd = (searchParams.walletAdd === tx.from) ? tx.to : tx.from

                        const formatAdd = (add) => {
                            const first = add.slice(0, 10);
                            const last = add.slice(-8);

                            return `${first}...${last}`
                        }

                        return (
                            <tr key={index} >
                                {/* <th>{new Date(tx.metadata.blockTimestamp).toString()}</th> */}
                                <td className="has-tooltip-arrow has-tooltip-warning" data-tooltip={new Date(tx.metadata.blockTimestamp).toLocaleString()}>{tx.metadata.age}</td>
                                <td className="has-tooltip-arrow has-tooltip-primary" data-tooltip={tx.hash}>{`${tx.hash.slice(0, 10)}...`}</td>
                                <td>{tx.blockNum}</td>
                                <td>{tx.category}</td>
                                {/* conditionally render inbound/outbound tag, then display the wallet */}
                                <td className="has-text-centered">{(searchParams.walletAdd === tx.from) ? <div className="tag is-warning">TO</div> : <div className="tag is-info">FROM</div>}</td>
                                <td className="has-tooltip-arrow has-tooltip-primary" data-tooltip={otherAdd}>{formatAdd(otherAdd)}</td>
                                <td>{tx.value} {tx.asset}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Tx;