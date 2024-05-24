import React, { useState, useEffect } from 'react';

import logo from '../assets/alchemylogo.png';
import Connect from '../comp/Connect';

import { useSearch } from './searchContext';


function Nav() {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [net, setNet] = useState('Eth');
    const { searchParams, updateSearchParams } = useSearch()

    const blankState = {
        network: '',
        walletAdd: '',
        pageKey: '',
        prevKeys: [],
        currentKey: ''
    }

    const handleSearch = (network, address) => {
        const search = {
            ...blankState,
            network: network,
            walletAdd: address,
            isNew: true
        }
        updateSearchParams(search);

    }

    const handleMobile = () => {
        console.log("test")
        document.getElementById('navbar').classList.toggle('is-active');
    }

    useEffect(() => {
        console.log(net);
        console.log(address)
    }, [net, address])


    return (

        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://www.alchemy.com">
                    <img src={logo} alt="alchemylogo" />
                </a>

                <a role="button" onClick={handleMobile} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbar" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <a className="navbar-item">
                            Home
                        </a>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <input
                            name="walletAdd"
                            className="input is-link"
                            type="text"
                            onChange={e => setAddress(e.target.value)}
                            placeholder={`Address` || searchParams.walletAdd}
                        />
                        <div className="select" >
                            <select onChange={e => setNet(e.target.value)}>
                                <option value="Eth">
                                    Ethereum
                                </option>

                                <option value="Polygon">
                                    Polygon
                                </option>

                                <option value="Arbitrum">
                                    Arbitrum
                                </option>

                                <option value="Optimism">
                                    Optimism
                                </option>

                                <option value="Base">
                                    Base
                                </option>
                            </select>
                        </div>

                    </div>

                    <div className="buttons navbar-item">
                        <button
                            className="button is-primary"
                            onClick={() => handleSearch(net, address)}
                        >
                            <strong>Search</strong>
                        </button>
                    </div>
                </div>
            </div>

        </nav >
    );





}

export default Nav;