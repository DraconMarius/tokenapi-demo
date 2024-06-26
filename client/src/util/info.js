import connect from '../assets/connect.gif';
import network from '../assets/network.gif';
import balance from '../assets/balance.gif';
import clipboard from '../assets/clipboard.gif';
import scan from '../assets/scan.gif';
import txfilter from '../assets/txfilter.gif';


export const info = {
    default: {
        title: "Need help to get started?",
        img: [{
            src: connect,
            text: 'If a wallet is detected, connect supported wallet with the connect icon'
        },
        {
            src: network,
            text: 'The following network\'s mainnet wallet addresses are supported:'
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