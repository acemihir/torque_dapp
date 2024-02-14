import { ethers } from 'ethers'

export const NATIVE_TOKEN_ADDRESS = ethers.constants.AddressZero
export const V2_TOKENS: { [chainId: number]: Token[] } = {}
export const WRAPPED_TOKENS_MAP: { [chainId: number]: Token } = {};

export type Token = {
  name: string
  symbol: string
  baseSymbol?: string
  decimals: number
  address: string
  priceDecimals?: number
  wrappedAddress?: string
  coingeckoUrl?: string
  imageUrl?: string

  isUsdg?: boolean
  isNative?: boolean
  isWrapped?: boolean
  isShortable?: boolean
  isStable?: boolean
  isSynthetic?: boolean
  isTempHidden?: boolean
}

export const TOKENS_MAP: { [chainId: number]: { [address: string]: Token } } =
  {}

export function getToken(chainId: number, address: string) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`)
  }
  if (!TOKENS_MAP[chainId][address]) {
    throw new Error(`Incorrect address "${address}" for chainId ${chainId}`)
  }

  return TOKENS_MAP[chainId][address]
}

export function getV2Tokens(chainId: number) {
  return V2_TOKENS[chainId]
}

export function getTokensMap(chainId: number) {
  return TOKENS_MAP[chainId]
}

export function getTokens(chainId: number) {
  TOKENS_MAP
}

export function getWrappedToken(chainId: number) {
  return WRAPPED_TOKENS_MAP[chainId]
}
