import React, { useState, useEffect } from 'react';

// import { useSearch } from './searchContext';

import { FlapDisplay, Presets } from 'react-split-flap-effect'

import scanUrl from '../util/scan'

function Balance({ contractAddress, name, symbol, balance, logo, network, icon }) {

    const etherscanAddress = `${scanUrl[network]}address/${contractAddress}`

    return (
        <div className='card'>
            <header className="card-header">
                <div className="card-header-title">
                    <div className="media-left">

                        <img className="image is-48x48" src={logo} />
                    </div>
                    <div className="container is-align-items-center">
                        <span className="tag is-primary is-light ">{symbol}</span>
                        <span className="tag is-link is-light">{name}</span>
                        <a href={etherscanAddress} target="_blank" className="is-align-self-center is-pulled-right">
                            <span className="icon is-small is-align-self-center"  ><img src={icon} /></span>
                        </a>
                    </div>
                </div>
                {/* <button className="card-header-icon" aria-label="more options" >
                    <img className="icon" src={dropdown} />


                </button> */}
            </header>
            <div className='card-content' id={name}>
                <div className="content">

                    <div>
                        <FlapDisplay
                            className="darBordered"
                            chars={Presets.ALPHANUM + ',.!'}
                            length={42}
                            timing={30}
                            hinge={true}
                            value={contractAddress} />

                    </div>
                    <div>
                        <FlapDisplay
                            className="darBordered"
                            chars={Presets.ALPHANUM + ',.:!'}
                            length={42}
                            timing={45}
                            hinge={true}
                            value={`Balance:           ${balance}`} />
                    </div>
                </div>
            </div>

        </div>





    )





}

export default Balance;