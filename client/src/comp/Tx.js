import React, { useState, useEffect } from 'react';

import { useSearch } from '../cont/searchContext';

function Tx({ apiRes }) {
    const { searchParams, updateSearchParams } = useSearch()
    // console.log("transaction log", apiRes)

    const dirRes = `${searchParams.dir}Res`
    console.log(dirRes)

    return (
        <div className="table-container">
            <table className="table is-bordered is-striped is-fullwidth is-hoverable is-narrow">
                <thead>
                    <tr>
                        <th title="Timestamp">Timestamp</th>
                        <th> <abbr title="Transaction Hash">Hash #</abbr></th>
                        <th> <abbr title="Bock Number">Block</abbr></th>
                        <th title="Age"> Age </th>
                        <th title="Type"> Type</th>
                        <th><abbr title="Tx Direction">Dir</abbr></th>
                        <th><abbr title="Value">Val</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    {apiRes[dirRes].map((tx, index) => (
                        <tr key={index}>
                            <th>{new Date(tx.metadata.blockTimestamp).toString()}</th>
                            <td>{tx.hash}</td>
                            <td>{tx.blockNum}</td>
                            <td>Age</td>
                            <td>{tx.category}</td>
                            <td>{(searchParams.walletAdd === tx.from) ? <div className="tag">out</div> : <div className="tag">in</div>}</td>
                            <td>{tx.value}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Tx;