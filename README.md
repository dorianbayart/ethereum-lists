# Ethereum-ChainList

A Vanilla JS library to simply use EthereumList's data

---

## Usage

### HTML
```html
<script src="https://raw.githubusercontent.com/dorianbayart/ethereum-lists/main/lib/ethereum-lists.min.js"></script>
```
See [example.html](https://github.com/dorianbayart/ethereum-lists/blob/main/example/example.html)

### JS
```javascript
const chains = await ChainList.fetch()

const allChains = chains.getList()

// Search by name and return an array of chains
const searchedChains = chains.searchByName('doge') // case insensitive

// Get a chain by chainId
const ethereumMainNet = chains.getByChainId(1)
const ethereumMainNet = await Chain.fetchChain(1)

const addressURL = ethereumMainNet.address('0x0255c9D3850cacA1152AEB20425C264787661692')
// "https://etherscan.io/address/0x0255c9D3850cacA1152AEB20425C264787661692"

const tokenURL = ethereumMainNet.token('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
// "https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

const txURL = ethereumMainNet.tx('0xe207224986764f5419887952f1923851bcf03d23268903d4cf0b94c10635bc09')
// "https://etherscan.io/tx/0xe207224986764f5419887952f1923851bcf03d23268903d4cf0b94c10635bc09"

const blockURL = ethereumMainNet.block(15798835)
// "https://etherscan.io/block/15798835"

const chainName = chain.name()
// "Ethereum Mainnet"
const chainId = chain.chainId()
// 1
const shortName = chain.shortName() // see EIP-3770
// "eth"
const infoURL = chain.infoURL()
// "https://ethereum.org"
const {name, symbol, decimals}  = chain.nativeCurrency()
// {"Ether", "ETH", 18}

```
See [example.js](https://github.com/dorianbayart/ethereum-lists/blob/main/example/example.beautified.js)

---

## Dev

### NPM Scripts

#### Generate JSDoc
```sh
npm run jsdoc
```

#### Uglify - Minify lib
```sh
npm run uglify
```

#### Beautify example.js
```sh
npm run beautify-ex
```

#### Run all scripts at once
```sh
npm run all
```

---

## Datasource

[ethereum-lists/chains](https://github.com/ethereum-lists/chains) and their JSon data [chainid.network/chains.json](https://chainid.network/chains.json)
