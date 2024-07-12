import React, { useState, useEffect } from 'react';

// import { useSearch } from './searchContext';

import { FlapDisplay, Presets } from 'react-split-flap-effect'

import scanUrl from '../util/scan'

function Balance({ contractAddress, name, symbol, balance, logo, network, icon }) {

    const etherscanAddress = `${scanUrl[network]}address/${contractAddress}`

    return (
        <div className='list-item box'>
            <div className="list-item-image">
                <figure className="image is-48x48">
                    <img src={logo} />
                </figure>
            </div>
            <div className="list-item-content">
                <div className="container is-align-items-center">
                    <span className="tag is-primary is-light mr-3">{symbol}</span>
                    <span className="tag is-link is-light">{name}</span>

                    <a href={etherscanAddress} target="_blank" className="is-align-self-center is-pulled-right">
                        <span className="icon is-small is-align-self-center"  ><img src={icon} /></span>
                    </a>
                </div>
                <div className="list-item-title">{contractAddress}</div>
                <div className="list-item-description">
                    <div>
                     
                            {`Token Balance: `}

                        <FlapDisplay
                            className="darBordered is-pulled-right pt-1"
                            chars={Presets.ALPHANUM + '.+'}
                            length={25}
                            timing={1}
                            hinge={true}
                            value={`${balance}`} />
                    </div>

                </div>
            </div>

        </div>







    )





}

export default Balance;