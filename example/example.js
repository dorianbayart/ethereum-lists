'use strict'

/**
* Example file - How to use  Ethereum-Lists JS Library
* @author Dorian Bayart
* @version 0.1.0
* @license MIT
*/

// The ChainId to use in this file
const CHAIN_ID = 1


const example = async () => {
  const chains = await ChainList.fetch() //

  const dogeChains = chains.searchByName('doge')
  console.log(dogeChains)

  const chain = await Chain.fetchChain(CHAIN_ID) //

  const addressURL = chain.address('0x0255c9D3850cacA1152AEB20425C264787661692')
  const tokenURL = chain.token('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
  const txURL = chain.tx('0xe207224986764f5419887952f1923851bcf03d23268903d4cf0b94c10635bc09')
  const blockURL = chain.block(15798835)
  console.log({
    addressURL,
    tokenURL,
    txURL,
    blockURL
  })

  console.log(chain)
  const chainName = chain.name()
  const chainId = chain.chainId()
  const shortName = chain.shortName() // EIP-3770
  const infoURL = chain.infoURL()
  const {name, symbol, decimals}  = chain.nativeCurrency()
  console.log({
    chainName,
    chainId,
    shortName,
    infoURL,
    name, symbol, decimals
  })

}

window[ addEventListener ? 'addEventListener' : 'attachEvent' ]( addEventListener ? 'load' : 'onload', example )
