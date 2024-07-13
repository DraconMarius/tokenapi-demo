import React, { useState, useRef } from 'react';

import { useSearch } from '../cont/searchContext';

import { FlapDisplay, Presets } from 'react-split-flap-effect';

import scanUrl from '../util/scan';
import focusIcon from '../assets/eye.png';
import Focus from './Focus';

function Balance({ contractAddress, name, symbol, balance, logo, network, icon }) {
    const { searchParams } = useSearch();
    const [isOpen, setOpen] = useState(false);
    const focusedToken = useRef();

    const etherscanAddress = `${scanUrl[network]}address/${contractAddress}`

    const handleTokenFocus = (contractAddress) => {
        focusedToken.current = contractAddress
        if (focusedToken.current !== (undefined || null)) {
            setOpen(!isOpen)
        }
    }

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

                    <div>
                        <div className="is-pulled-right is-clickable">
                            <span className="icon is-small is-align-self-center" onClick={() => handleTokenFocus(contractAddress)} ><img src={focusIcon} /></span>
                        </div>

                        <a href={etherscanAddress} target="_blank" rel="noreferrer" className="is-align-self-center is-pulled-right pl-1 pr-2">
                            <span className="icon is-small is-align-self-center"  ><img src={icon} /></span>
                        </a>
                    </div>
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
            {isOpen ? <div className="modal is-active" id="focus-view">
                <Focus net={searchParams.network} wallet={searchParams.walletAdd} contractAddress={focusedToken.current} setOpen={setOpen} icon={icon} />
            </div> : <></>}
        </div>







    )





}

export default Balance;