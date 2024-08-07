import React, { useState, useEffect } from 'react';

import logo from '../assets/alchemylogo.png';
import Connect from '../comp/Connect';
import Help from '../comp/Help';

import { useSearch } from './searchContext';


function Nav() {
    const { searchParams, updateSearchParams } = useSearch()
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [address, setAddress] = useState(searchParams.walletAdd);
    const [net, setNet] = useState(searchParams.network);

    const blankState = {
        network: 'Eth',
        walletAdd: '',
        zero: '',
        pageKey: '',
        prevKeys: [],
        currentKey: '',
        type: '',
        dir: "desc",
        zeroOpt: "false"
    }

    const handleSearch = async (network, address) => {

        const search = {
            ...blankState,
            network: network,
            walletAdd: address,
            isNew: true,
            type: "balance"
        }
        await updateSearchParams(search);

    }

    const handleTxSearch = async (network, address) => {

        console.log(`transactions onging ${network}, ${address}`)
        const search = {
            network: network,
            walletAdd: address,
            isNew: true,
            type: "transaction"
        }
        await updateSearchParams(search);
    }

    const handleMobile = () => {
        console.log("test")
        document.getElementById('navbar').classList.toggle('is-active');
    }

    const handleNetChange = async (network) => {
        if (searchParams.walletAdd) {
            const search = {
                ...searchParams,
                network: network,
                isNew: true
            }

            updateSearchParams(search);

        }
    }

    useEffect(() => {

        handleNetChange(net)

    }, [net])

    useEffect(() => {
        setNet(searchParams.network)
        setAddress(searchParams.walletAdd)
    }, [searchParams.walletAdd, searchParams.network])

    return (

        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://www.alchemy.com">
                    <img src={logo} alt="alchemylogo" />
                </a>

                <button role="button" onClick={() => handleMobile()} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div id="navbar" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item" >
                        <a href={"/"}>
                            Home
                        </a>
                    </div>
                    {searchParams.walletAdd ?
                        <>
                            <div className="navbar-item is-flex" >
                                <div
                                    className="is-link is-clickable"
                                    onClick={() => handleSearch(net, address)}
                                >
                                    Balances
                                </div>
                            </div>
                            <div className="navbar-item">
                                <div
                                    className="is-link is-clickable"
                                    onClick={() => handleTxSearch(searchParams.network, searchParams.walletAdd)}
                                >
                                    Transactions
                                </div>
                            </div>
                        </> : <></>
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item pb-0 pt-0 is-align-items-center">
                        <input
                            name="walletAdd"
                            className="input is-link"
                            type="text"
                            onChange={e => setAddress(e.target.value)}
                            placeholder={searchParams.walletAdd || `Address`}
                        />
                        <div className="select" >
                            <select value={net} onChange={e => setNet(e.target.value)}>
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

                        <div
                            className="button is-primary"
                            onClick={() => handleSearch(net, address)}
                        >
                            Search
                        </div>

                        <div className=" navbar-item is-flex-direction-column p-0">

                            <div className="has-tooltip-arrow has-tooltip-left has-tooltip-warning"
                                data-tooltip="Connect Wallet">
                                <Connect />
                            </div>

                            <Help type={searchParams.type} />
                        </div>

                    </div>
                </div>
            </div>

        </nav >
    );





}

export default Nav;