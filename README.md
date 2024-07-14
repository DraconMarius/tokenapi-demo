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
  - [Snippets](#snippets)
  - [Caveat](#caveat)
  - [Tech Stack](#technologies)
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


  ***
  ## Usage

  To query blockchain token data using the Alchemy SDK requires the follow params:
 
  > *You are also able to connect your browser extension wallets that utilizes the [EIPS-6963](https://eips.ethereum.org/EIPS/eip-6963) which helps avoid conflict and improves user experience. See [Snippets](#snippets) for code sample*

  > ![gif0](/client/src/assets/connect.gif)

  > **Owned Tokens and metaData**
  > - *network*
  > - *wallet address*
  > - *pageKey (optional)*

  > ![gif1](/client/src/assets/balance.gif)

  > **Transactions related to focused Token**
  > - *network*
  > - *wallet address*
  > - *contract address*

  > ![gif2](/client/src/assets/tokenFocus.gif)


  > **All in/out bound transactions associated from a Contract on specific Network**
  > - *network*
  > - *wallet address*
  > - *pageKey (optional)*
  > - *sorting direction (optional)*
  > - *exclude Zero value (optional)*
  > - *type of transactions: currently includes all type supported on mainnets [external, erc20, erc721, erc1155, specialnft]*

  > ![gif3](/client/src/assets/txfilter.gif)


  > **Transaction Receipts**
  > - *network*
  > - *Transaction Hash*
  
  > ![gif5](/client/src/assets/focus.gif)


  


  ***

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


  