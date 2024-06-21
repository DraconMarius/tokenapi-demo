import React, { useState, useEffect } from 'react';

import qMark from '../assets/question-mark-circle-icon.png';
import connect from '../assets/connect.gif';
import network from '../assets/network.gif';
import balance from '../assets/balance.gif';
import clipboard from '../assets/clipboard.gif';
import scan from '../assets/scan.gif';
import txfilter from '../assets/txfilter.gif';

function Help({ type }) {
    const [isOpen, setOpen] = useState(false);

    const info = {
        default: {
            title: "Need help to get started?",
            img: [{
                src: connect,
                text: 'if a wallet is detected, connect supported wallet with the `+` icon'
            },
            {
                src: network,
                text: 'the following network\'s mainnet wallet addresses are supported:'
            }
            ]
        },
        balance: {
            title: "Balance View:",
            img: [{
                src: balance,
                text: 'Here you are able to view all tokens currently owned by the address searched by clicking the token name located at the bottom of this screen'
            },
            {
                src: scan,
                text: 'You can click on the small logo to take you directly to the various blockchain explorer for each network'
            }
            ]
        },
        transaction: {
            title: "Transaction View",
            img: [{
                src: txfilter,
                text: 'Within the transaction table, you can change how the Alchemy SDK return the transaction datas, just press update filter when you are reaady!'
            },
            {
                src: clipboard,
                text: 'When you click on a specific cell for `Hash #`, `Block #`, `Address #`, it will automatically copy it to your clipboard'
            }
            ]
        }
    }


    return (

        <>
            <button className="icon"
                onClick={() => setOpen(true)}>
                <img src={qMark} />
            </button>


            {isOpen ?
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">

                        <header className="modal-card-head">
                            <p className="modal-card-title">{info[type].title}</p>
                            <button className="delete" aria-label="close" onClick={() => setOpen(false)}></button>
                        </header>
                        <section className="modal-card-body">
                            {info[type].img.map((item, index) => (

                                <div className="is-justify-content-center" key={index}>
                                    <figure className="image">
                                        <img src={item.src} className="helpImg" alt={`${type} Help gif`} />
                                    </figure >

                                    <p className="strong">{item.text}</p>
                                </div>


                            ))}
                        </section>
                        <footer class="modal-card-foot">
                            Here to file a bug report:
                        </footer>
                    </div>
                </div>
                : <></>
            }
        </>




    )




}

export default Help;