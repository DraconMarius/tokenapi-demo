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
            ...searchParams, dir: dir, zeroOpt: zeroOpt
        })
    }

    useEffect(() => {
        console.log(dir, zeroOpt)

    }, [dir, zeroOpt])

    if (!apiRes) {
        return <p>No transactions available</p>;
    }

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
                    <div className="select">
                        <select onChange={e => setDir(e.target.value)}>
                            <option value="desc"> Descending</option>
                            <option value="asc"> Ascending</option>
                        </select>
                    </div>
                </div>
                <div className="level-item">
                    <p >Exclude Zeros? :</p>
                    <div className="select">
                        <select onChange={e => setzeroOpt(e.target.value)}>
                            <option value={false}> False</option>
                            <option value={true}> True</option>
                        </select>
                    </div>
                </div>
                <div className="level-item">
                    <div className="button" onClick={() => handleUpdate()}>
                        Update Filter
                    </div>
                </div>
            </div>

            <section className="hero is-medium">

          
                    <Tx apiRes={apiRes} />
             

            </section>

            <div className="level">
                <div className="level-item">
                    <button className="button"> Prev</button>
                </div>
                <div className="level-item">
                    <button className="button"> Next</button>
                </div>
            </div>
        </div>

    )


}

export default TxCont;