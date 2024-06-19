import React, { useState, useEffect } from 'react';
import { useSearch } from '../cont/searchContext';

function Connect() {
    const { updateSearchParams } = useSearch();
    const [address, setAddress] = useState('');
    // const [selectedProv, setSelectedProv] = useState(null);
    const [walletDisp, setWalletDisp] = useState(false);
    const [btnDisp, setBtnDisp] = useState(false);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const handleProviderAnnouncement = event => {
            const providerDetails = event.detail;
            setProviders(prev => [...prev, providerDetails]);
        };

        window.addEventListener('eip6963:announceProvider', handleProviderAnnouncement);
        window.dispatchEvent(new Event('eip6963:requestProvider'));

        return () => window.removeEventListener('eip6963:announceProvider', handleProviderAnnouncement);
    }, []);

    const handleConnect = async providerDetail => {
        try {
            const accounts = await providerDetail.provider.request({ method: 'eth_requestAccounts' });
            updateSearchParams({
                network: 'Eth',
                walletAdd: accounts[0],
                zero: '',
                pageKey: '',
                txPageKey: {},
                prevKeys: [],
                currentKey: '',
                currentTxKey: {},
                type: 'balance',
                dir: "desc",
                zeroOpt: false,
                isNew: true
            })
            // setSelectedProv(providerDetail);
            setWalletDisp(false);
        } catch (err) {
            console.error("Error connecting to wallet provider", err);
        }
    };

    useEffect(() => {
        setBtnDisp(providers.length > 0);
    }, [providers]);

    return (
        <div>
            {btnDisp && (
                <button className="icon has-text-weight-bold" onClick={() => setWalletDisp(true)}>+</button>
            )}

            <div className={`modal ${walletDisp ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setWalletDisp(false)}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Detected Wallet(s)</p>
                        <button className="delete" aria-label="close" onClick={() => setWalletDisp(false)}></button>
                    </header>
                    <section className="modal-card-body">
                        {providers.map((provider, index) => (
                            <div className="box" key={index}>
                                <article className="media">
                                    <figure className="media-left">
                                        <p className="image is-32x32">
                                            <img src={provider.info.icon} alt={`${provider.info.name} icon`} />
                                        </p>
                                    </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <button className="button is-link" onClick={() => handleConnect(provider)}>
                                                {provider.info.name}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Connect;