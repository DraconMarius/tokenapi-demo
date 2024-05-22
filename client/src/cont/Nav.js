import React, { useState, useEffect } from 'react';

import logo from '../assets/alchemylogo.png';
import Connect from '../comp/Connect';

import { useSearch } from './searchContext';


function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    return (

        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
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
                        <input class="input" type="text" placeholder="Normal input" />
                        <div className="select">
                            <select>
                                <option>
                                    Ethereum
                                </option>

                                <option>
                                    Polygon
                                </option>

                                <option>
                                    Arbitrum
                                </option>

                                <option>
                                    Optimism
                                </option>

                                <option>
                                    Base
                                </option>
                            </select>
                        </div>

                    </div>

                    <div className="buttons navbar-item">
                        <a className="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                    </div>
                </div>
            </div>

        </nav>
    );





}

export default Nav;