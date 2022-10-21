'use strict'

/**
* A Vanilla JS library to simply use EthereumList's data
* @author Dorian Bayart
* @version 0.1.0
* @license MIT
*/


/**
* The URL to fetch data from
* @const {string}
*/
const CHAINLIST_URL = 'https://chainid.network/chains.json';

/**
* A global variable to store fetched data
* @type {ChainList}
*/
let chainList

/**
* A ChainList object
* @class
*/
class ChainList {
  /**
  * @property {array} list - An array of {@Chain}
  */
  #list

  /**
  * Create a ChainList - Keep chains containing at least one explorer on the EIP-3091 standard
  *
  * @constructor
  * @param {object[]} - An array of unknown objects representing chains data
  */
  constructor(list) {
    this.#list = list
      .filter(chain => chain.explorers?.find(explorer => explorer.standard === 'EIP3091'))
      .map(chain => new Chain(chain))
  }

  /**
  * Return a ChainList object
  *
  * @async
  * @static
  * @return {ChainList}
  */
  static fetch = async () => {
    const response = await fetch(CHAINLIST_URL)
    const list = await response.json()
    chainList = new ChainList(list)
    return chainList
  }

  /**
  * Return all chains
  *
  * @return {Chain[]} - All the chains
  */
  getList() {
    return this.#list
  }

  /**
  * Return a chain found by chainId
  *
  * @param {number} chainId - The chain unique id
  * @return {Chain}
  */
  getByChainId(chainId) {
    return this.#list.find(chain => chain.chainId() === chainId)
  }

  /**
  * Return a list of chains filtered by name
  *
  * @param {string} name - The name to filter
  * @return {Chain[] | null}
  */
  searchByName(name) {
    return this.#list.filter(chain => chain.name().toLowerCase().includes(name.toLowerCase()))
  }
}

/**
* A Chain
* @class
*/
class Chain {
  #chain
  #chainId
  #explorer
  #infoURL
  #name
  #nativeCurrency
  #shortName

  /**
  * Create a Chain
  *
  * @constructor
  * @param {object} data - An object representing a chain
  */
  constructor(data) {
    this.#chain = data.chain
    this.#chainId = data.chainId
    this.#explorer = data.explorers?.find(explorer => explorer.standard === 'EIP3091')
    this.#infoURL = this.infoURL
    this.#name = data.name
    this.#nativeCurrency = data.nativeCurrency
    this.#shortName = data.shortName
  }

  /**
  * Find or fetch data to build a Chain object
  *
  * @async
  * @static
  * @param {number} - The chainId of the Chain
  * @return {Chain}
  */
  static fetchChain = async (id) => {
    // use the chainList global variable if already fetched
    if(chainList && chainList.getList().length) {
      return chainList.getList().find(chain => chain.chainId = id)
    }

    const response = await fetch(CHAINLIST_URL)
    const chains = await response.json()

    return new Chain(chains.find(chain => chain.chainId === id))
  }

  /**
  * Return the chain group name
  *
  * @return {string}
  */
  chain() {
    return this.#chain
  }

  /**
  * Return the chainId
  *
  * @return {number}
  */
  chainId() {
    return this.#chainId
  }

  /**
  * Return the explorer base URL
  *
  * @return {string}
  */
  explorer() {
    return this.#explorer
  }

  /**
  * Return the main URL
  *
  * @return {string}
  */
  infoURL() {
    return this.#infoURL
  }

  /**
  * Return the name
  *
  * @return {string}
  */
  name() {
    return this.#name
  }

  /**
  * Return the native currency
  *
  * @return {objct}
  */
  nativeCurrency() {
    return this.#nativeCurrency
  }

  /**
  * Return the short name
  *
  * @return {string}
  */
  shortName() {
    return this.#shortName
  }

  /**
  * Return a link to Explorer for a given Block Hash
  *
  * @param {string} blockHashOrHeight - A block hash or block height
  * @return {string | null}
  */
  block(blockHashOrHeight) {
    if(this.#explorer?.url) return `${this.#explorer.url}/block/${blockHashOrHeight}`
    return
  }

  /**
  * Return a link to Explorer for a given Transaction Hash
  *
  * @param {string} txHash - A transaction hash
  * @return {string | null}
  */
  tx(txHash) {
    if(this.#explorer?.url) return `${this.#explorer.url}/tx/${txHash}`
    return
  }

  /**
  * Return a link to Explorer for a given Address
  *
  * @param {string} accountAddress - An account address
  * @return {string | null}
  */
  address(accountAddress) {
    if(this.#explorer?.url) return `${this.#explorer.url}/address/${accountAddress}`
    return
  }

  /**
  * Return a link to Explorer for a given ERC-20 Token Address
  *
  * @param {string} tokenAddress - A token contract address
  * @return {string | null}
  */
  token(tokenAddress) {
    if(this.#explorer?.url) return `${this.#explorer.url}/token/${tokenAddress}`
    return
  }
}
