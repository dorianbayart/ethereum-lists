'use strict'

const example = async () => {
  const chains = await ChainList.fetch() //

  const dogeChains = chains.searchByName('doge'))
  console.log(dogeChains)

  const ethereumMainNet = await Chain.fetchChain(1) //
  console.log(ethereumMainNet)

  const addressURL = ethereumMainNet.address('0x0255c9D3850cacA1152AEB20425C264787661692')
  const tokenURL = ethereumMainNet.token('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
  const txURL = ethereumMainNet.tx('0xe207224986764f5419887952f1923851bcf03d23268903d4cf0b94c10635bc09')
  const blockURL = ethereumMainNet.block(15798835)

  console.log({
    addressURL,
    tokenURL,
    txURL,
    blockURL
  })
}

window[ addEventListener ? 'addEventListener' : 'attachEvent' ]( addEventListener ? 'load' : 'onload', example )
