import React, { useState, useEffect } from 'react';

import qMark from '../assets/question-mark-circle-icon.png';


import { info } from '../util/info.js'

function Help({ type }) {
    const [isOpen, setOpen] = useState(false);

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
                                    <p className="strong">{item.text}</p>
                                    <figure className="image">
                                        <img src={item.src} key={index} id="helpImg" alt={`${type} Help gif`} height="auto" />
                                    </figure >

                                </div>


                            ))}
                        </section>
                        <footer className="modal-card-foot">
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