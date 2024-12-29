# Alchemy Token API - Demo
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  ###### Check out the badges hosted by [shields.io](https://shields.io/)

 [Deployed Heroku Link](https://alchemy-tokenapi-3249c3de8b20.herokuapp.com/)
  
  ## Description
  *A GUI demo-ing the capability of Alchemy's Token API SDK*

  ***

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Author](#author)

  ***

  ## Installation

  ~~***This project is hosted on a heroku eco-dyno, when it is not being actively used it requires a bit extra start up time. This can be mitigated by upgrading to the next tier on heroku.***~~
  
  [Deployed Heroku Link](https://alchemy-tokenapi-3249c3de8b20.herokuapp.com/)
  
  If you would like to host a version of it yourself, please follow these instructions:

  > to install both the client and server side dependencies: `npm i`

  > start the server: `npm start`

  > to concurrently start server and client react code w/ hotreload: `npm run develop`


  ***if you run into any issue with conflicting dependency with the split-flap display, you can include `--legacy-peer-deps` tag in your `npm i` / install script in your package.json.***

  ***if you are indeed hosting your own version, please ensure that there is a `.env` file with your Alchemy API Key set up correctly in your project!***

  > **If you would like to host a heroku version of it privately**, make sure you have heroku CLI installed, and at the root of the project run `heroku create app_name`. After we confirmed that it has been deployed. Navigate to your heroku project page and ensure that all of your env var is set.
  >
  > ![envvar](/client/src/assets/envvar.png)

  ***

  ## Usage

  To query blockchain token data using the Alchemy SDK requires the follow params:
 
  > *You are also able to connect your browser extension wallets that utilizes the [EIPS-6963](https://eips.ethereum.org/EIPS/eip-6963) which helps avoid conflict and improves user experience. See [Snippets](#snippets) for code sample*
  >
  > ![gif0](/client/src/assets/connect.gif)

  > **Owned Tokens and metaData `/api/balance/:net/:address`**
  > *`alchemy.core.getTokenForOwner()`*
  > - *network* (for SDK config)
  > - *wallet address*
  > - *pageKey* (optional)
  >
  > With Alchemy's SDK, once we instantiate our [config](https://docs.alchemy.com/reference/alchemy-sdk-quickstart), we do not require network as a param. All operation using that config would be for a specific network only. We only need our wallet address hash to query tokens owned.
  >
  > For this demo's purpose, I had filtered out any token with zero balances, and som eadditional filter on our React side to filter any spam like token names.
  > 
  > Also we have a functional pagination on our React side, which store new and subsequent pageKeys from our API call, allowing us to easily page through large amount of tokens in a wallet.
  >
  > ![gif1](/client/src/assets/balance.gif)
  >
  > ![filter](/client/src/assets/filter.png)
  >
  > ![pagination](/client/src/assets/pagination.png)

  > **Transactions related to focused Token `/api/tokentx/:net/:wallet/:token`**
  > *`alchemy.core.getAssetTransfers()`*
  > - *network* (for SDK config)
  > - *to/from-Address*
  > - *contract address*
  > - *excludeZeroValue* (*true*/false)
  > - *category* *["erc20", "erc721", "erc1155"]*
  > - *withMetadata* (*true*/false)
  >
  > From our token owned page, we utilize the token contract address to query all of the transactions between the current address and current focused token.
  > 
  > Before passing our response to the frontend, we are using `alchemy.core.getTokenMetadata()` to add additional information such as token logo to our result (if applicable).
  >
  > ![gif2](/client/src/assets/tokenFocus.gif)
  >
  > ![filter](/client/src/assets/tokenFocus.png)


  > **All in/out bound transactions associated from a Contract on specific Network `/api/transactions/:net/:address`**
  > *`alchemy.core.getAssetTransfers()`*
  > - *network* (for SDK config)
  > - *wallet address*
  > - *pageKey* (optional)
  > - *sorting direction* (optional)
  > - *exclude Zero value* (optional)
  > - *type of transactions* [external, erc20, erc721, erc1155, specialnft]
  > - *maxCount* (50)
  >
  > To get all assets transfer for a specific address, we would have to account for the direction of the transaction. Here we are calling `getAssetTransfers` twice, once with our wallet set to `fromAddress` and the other as `toAddress`
  >
  > ![gif3](/client/src/assets/txfilter.gif)


  > **Transaction Receipts `/api/receipt/:net/:hash`**
  > *`alchemy.core.getTransactionReceipt()`*
  > - *network* (for SDK config)
  > - *Transaction Hash*
  >
  > From our list of transactions, we are utilizing the transaction hash to look up additional informations associated to that tx.
  >
  > ![gif5](/client/src/assets/focus.gif)

  ***
  ## License

  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ***
  ## Author
  *Mari Ma*

  [<img src="https://res.cloudinary.com/dbjhly3lm/image/upload//h_50/v1682488301/personal%20assets/logo_github_icon_143196_phgakv.png" alt='github' >](https://github.com/DraconMarius)
  [<img src="https://res.cloudinary.com/dbjhly3lm/image/upload/h_50/v1682488301/personal%20assets/logo_linkedin_icon_143191_nv9tim.png" alt='linkedin'>](https://www.linkedin.com/in/mari-ma-70771585/)

[Icon credit @ Anton Kalashnyk](https://icon-icons.com/users/14quJ7FM9cYdQZHidnZoM/icon-sets/)

  ***
  ## Questions
  For any questions, please reach out directly or by creating an issue.


  