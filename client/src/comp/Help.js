import React, { useState, useEffect } from 'react';

import qMark from '../assets/question-mark-circle-icon.png';


import { info } from '../util/info.js'

function Help({ type }) {
    const [isOpen, setOpen] = useState(false);

    return (

        <>
            <button
                onClick={() => setOpen(true)}>
                <figure className="image is-24x24">

                    <img src={qMark} />
                </figure>
            </button>


            {isOpen ?
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card helpCard">

                        <header className="modal-card-head">
                            <p className="modal-card-title">{info[type].title}</p>
                            <button className="delete" aria-label="close" onClick={() => setOpen(false)}></button>
                        </header>
                        <section className="modal-card-body ">
                            {info[type].img.map((item, index) => (

                                <div className="box" key={index}>
                                    <div className="block ">

                                        <p className="strong">{item.text}</p>
                                    </div>
                                    <figure className="image is-large">
                                        <img src={item.src} key={index} id="helpImg" alt={`${type} Help gif`} height="auto" />
                                    </figure >

                                </div>


                            ))}
                        </section>
                        <footer className="modal-card-foot is-justify-content-center">
                            <a href="https://github.com/DraconMarius/tokenapi-demo/issues/new" target="_blank">
                                -- Here to file a bug report --
                            </a>
                        </footer>
                    </div>
                </div>
                : <></>
            }
        </>




    )




}

export default Help;