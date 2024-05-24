import React, { useState, useEffect } from 'react';

// import { useSearch } from './searchContext';

import { FlapDisplay, Presets } from 'react-split-flap-effect'

import dropdown from '../assets/dropdown.png'

function Token({ contractAddress, name, symbol, balance }) {

    const blankState = {
        network: '',
        walletAdd: '',
        pageKey: '',
        prevKeys: [],
        currentKey: ''
    }

    const handleCardContent = () => {
        document.getElementById(`${name}`).classList.toggle('is-hidden')
    }


    return (
        <div className='card'>
            <header className="card-header">
                <div className="card-header-title">
                    <span className="tag is-primary is-light">{symbol}</span>
                    <span className="tag is-link is-light">{name}</span>
                </div>
                <button className="card-header-icon" aria-label="more options" onClick={() => handleCardContent()}>
                    <img className="icon" src={dropdown} />


                </button>
            </header>
            <div className='card-content is-hidden' id={name}>
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
                            value={`Balance:          ${balance}`} />
                    </div>
                </div>
            </div>

        </div>





    )





}

export default Token;