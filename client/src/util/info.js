import connect from '../assets/connect.gif';
import network from '../assets/network.gif';
import balance from '../assets/balance.gif';
import clipboard from '../assets/clipboard.gif';
import scan from '../assets/scan.gif';
import txfilter from '../assets/txfilter.gif';
import lightDark from '../assets/lightDarkMode.gif';
import focus from '../assets/focus.gif';
import tokenFocus from '../assets/tokenFocus.gif'


export const info = {
    default: {
        title: "Need help to get started?",
        img: [{
            src: lightDark,
            text: 'This webapp supports light and darkmode based on your device\'s preferred setting'
        }, {
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
            text: 'Here you are able to view all tokens currently owned'
        },
        {
            src: scan,
            text: 'Clicking on the network logo to take you directly to the various blockchain explorer respectively'
        }, {
            src: tokenFocus,
            text: 'By click on the `EYE`-con, you can view relevant transactions for the token selected'
        }
        ]
    },
    transaction: {
        title: "Transaction View",
        img: [{
            src: txfilter,
            text: 'Within the transaction table, you can change how the Alchemy SDK return the transaction datas, just press update filter when you are reaady'
        }, {
            src: focus,
            text: 'By clicking on the `EYE`-con, you can pull up additional info from the receipt of that transaction'
        },
        {
            src: clipboard,
            text: 'When you click on a specific cell for `Hash #`, `Block #`, `Address #`, it will automatically copy it to your clipboard'
        }
        ]
    }, balanceP: {
        title: "Balance View:",
        img: [{
            src: balance,
            text: 'Here you are able to view all tokens currently owned'
        },
        {
            src: scan,
            text: 'Clicking on the network logo to take you directly to the various blockchain explorer respectively'
        }, {
            src: tokenFocus,
            text: 'By click on the `EYE`-con, you can view relevant transactions for the token selected'
        }
        ]
    },
    transactionP: {
        title: "Transaction View",
        img: [{
            src: txfilter,
            text: 'Within the transaction table, you can change how the Alchemy SDK return the transaction datas, just press update filter when you are reaady'
        }, {
            src: focus,
            text: 'By clicking on the `EYE`-con, you can pull up additional info from the receipt of that transaction'
        },
        {
            src: clipboard,
            text: 'When you click on a specific cell for `Hash #`, `Block #`, `Address #`, it will automatically copy it to your clipboard'
        }
        ]
    }
}