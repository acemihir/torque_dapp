import CurrencySwitch from '@/components/common/CurrencySwitch'
import LoadingCircle from '@/components/common/Loading/LoadingCircle'
import NumberFormat from '@/components/common/NumberFormat'
import { ethers } from 'ethers'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AutowidthInput } from 'react-autowidth-input'
import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'sonner'
import { useAccount } from 'wagmi'
import Web3 from 'web3'
import { IStakingInfo } from '../types'

interface StakingInfoProps {
  stakeInfo: IStakingInfo
  isRefresh?: boolean
}

export default function StakingInfo({
  stakeInfo,
  isRefresh,
}: StakingInfoProps) {
  const { address, isConnected } = useAccount()

  const [isSubmitLoading, setSubmitLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const [balance, setBalance] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [allowance, setAllowance] = useState('0')
  const [totalEarnings, setTotalEarnings] = useState<string | number>(0)
  const [totalStaked, setTotalStake] = useState<string | number>(0)
  const [apr, setApr] = useState<string | number>(0)

  const [label, setLabel] = useState(stakeInfo?.label)
  const [isEdit, setEdit] = useState(false)
  const refLabelInput = useRef<HTMLInputElement>(null)

  const isApproved = +allowance

  const tokenContract = useMemo(() => {
    const web3 = new Web3(Web3.givenProvider)
    const contract = new web3.eth.Contract(
      JSON.parse(stakeInfo?.tokenContract.abi),
      stakeInfo?.tokenContract.address
    )
    return contract
  }, [Web3.givenProvider, stakeInfo?.symbol])

  const tokenStakeContract = useMemo(() => {
    const web3 = new Web3(Web3.givenProvider)
    const contract = new web3.eth.Contract(
      JSON.parse(stakeInfo?.tokenStakeContract.abi),
      stakeInfo?.tokenStakeContract?.address
    )
    return contract
  }, [Web3.givenProvider, stakeInfo?.symbol])

  const stakingContract = useMemo(() => {
    const web3 = new Web3(Web3.givenProvider)
    const contract = new web3.eth.Contract(
      JSON.parse(stakeInfo?.stakeContract.abi),
      stakeInfo?.stakeContract.address
    )
    return contract
  }, [Web3.givenProvider, stakeInfo?.symbol])

  const handleGetInfoStaked = async () => {
    try {
      if (!isConnected || !tokenContract || !address) {
        return setTotalStake(0)
      }
      const decimals = await tokenContract.methods.decimals().call()

      const response = await stakingContract.methods.stakers(address).call()
      const principal = response?.principal
      const totalStaked = ethers.utils
        .formatUnits(principal, decimals)
        .toString()
      setTotalStake(totalStaked)
    } catch (error) {
      console.log('error handle get info staked:>> ', error)
    }
  }

  const handleGetInterestInfo = async () => {
    try {
      if (!isConnected || !tokenStakeContract || !address) {
        return setTotalStake(0)
      }
      const decimals = await tokenStakeContract.methods.decimals().call()
      const response = await stakingContract.methods.getInterest(address).call()
      const totalEarnings = ethers.utils
        .formatUnits(response, decimals)
        .toString()
      setTotalEarnings(totalEarnings)
    } catch (error) {
      console.log('error get interest info:>> ', error)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await stakingContract.methods.apr().call()
        setApr(response / 100)
      } catch (error) {
        console.log('error :>> ', error)
      }
    })()
  }, [stakingContract])

  useEffect(() => {
    handleGetInterestInfo()
  }, [stakingContract, isConnected, tokenStakeContract, address, isRefresh])

  useEffect(() => {
    handleGetInfoStaked()
  }, [stakingContract, isConnected, tokenContract, address, isRefresh])

  const handleGetAllowance = async () => {
    if (!isConnected || !tokenStakeContract) {
      return setAllowance('0')
    }
    setSubmitLoading(true)

    try {
      const allowanceToken = await tokenStakeContract.methods
        .allowance(address, stakeInfo?.stakeContract?.address)
        .call()
      const decimals = await tokenStakeContract.methods.decimals().call()
      const allowance = ethers.utils
        .formatUnits(allowanceToken, decimals)
        .toString()
      setAllowance(allowance)
    } catch (error) {
      console.log('Staking.DepositModal.handleGetAllowance', error)
    }
    setSubmitLoading(false)
  }

  const approveToken = async () => {
    if (!isConnected) {
      return toast.error('You need connect your wallet first')
    }

    setSubmitLoading(true)

    try {
      await tokenStakeContract.methods
        .approve(
          stakeInfo?.stakeContract?.address,
          '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        )
        .send({ from: address })
      handleGetAllowance()
    } catch (error) {
      console.log('Staking.DepositModal.approveToken', error)
    }
    setSubmitLoading(false)
  }

  useEffect(() => {
    handleGetAllowance()
  }, [tokenStakeContract, isConnected])

  const handleWithdraw = async () => {
    if (!isConnected) {
      return toast.error('You need connect your wallet first')
    }
    if (!+amount) {
      return toast.error('You must input amount to withdraw')
    }
    setSubmitLoading(true)
    try {
      const decimals = await tokenContract.methods.decimals().call()
      const tokenAmount = ethers.utils
        .parseUnits(amount.toString(), decimals)
        .toString()

      await stakingContract.methods.redeem(tokenAmount).send({ from: address })
      toast.success('Withdraw successfully')
      handleGetInterestInfo()
      handleGetInfoStaked()
      setAmount(0)
    } catch (error) {
      toast.error('Withdraw failed ' + error?.message)
      console.log('Staking.ManageStaking.StakingInfo.handleWithdraw', error)
    }
    setSubmitLoading(false)
  }

  useEffect(() => {
    if (isEdit && refLabelInput.current) {
      refLabelInput.current.focus()
    }
  }, [isEdit])

  const summaryInfor = (item: IStakingInfo) => {
    return (
      <>
        <CurrencySwitch
          tokenSymbol={item?.symbol}
          tokenValue={+totalStaked}
          usdDefault
          className="-my-4 flex min-w-[100px] flex-col items-center justify-center gap-2 py-4"
          render={(value) => (
            <>
              <p className="text-[22px]">{value}</p>
              <p className="font-mona text-[14px] text-[#959595]">Deposited</p>
            </>
          )}
          decimalScale={2}
        />
        <CurrencySwitch
          tokenSymbol={item?.symbol}
          tokenValue={+totalEarnings}
          usdDefault
          className="-my-4 flex min-w-[100px] flex-col items-center justify-center gap-2 py-4"
          render={(value) => (
            <>
              <p className="text-[22px]">{value}</p>
              <p className="font-mona text-[14px] text-[#959595]">Earnings</p>
            </>
          )}
          decimalScale={5}
        />
        <div className="flex min-w-[100px] flex-col items-center justify-center gap-2">
          <div className="text-[22px]">{apr}%</div>
          <div className="font-mona text-[14px] text-[#959595]">Net APR</div>
        </div>
      </>
    )
  }

  return (
    <div className="mt-[24px] grid w-full rounded-[12px] border border-[#1A1A1A] bg-gradient-to-br from-[#0d0d0d] to-[#0d0d0d]/0 px-[24px] py-[20px]">
      <div className="grid w-full grid-cols-2">
        <div className="flex items-center gap-4">
          <img
            src={`assets/t-logo-circle.svg`}
            alt=""
            className="w-[42px] object-cover"
          />
          {!isEdit && (
            <div
              className="flex cursor-pointer items-center text-[22px] transition-all hover:scale-105"
              onClick={() => setEdit(!isEdit)}
            >
              {label}
              <button className="ml-2">
                <AiOutlineEdit />
              </button>
            </div>
          )}
          {isEdit && (
            <div className="flex cursor-pointer items-center text-[22px]">
              <AutowidthInput
                ref={refLabelInput}
                className="min-w-[60px] bg-transparent"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && setEdit(false)}
              />
              <button className="ml-2">
                <AiOutlineCheck
                  className="transition-all hover:scale-105"
                  onClick={() => setEdit(!isEdit)}
                />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-14">
          <div className="hidden items-center justify-between gap-14 lg:flex">
            {summaryInfor(stakeInfo)}
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <button className="" onClick={() => setOpen(!isOpen)}>
              <img
                className={
                  'w-[18px] transition-all' + ` ${isOpen ? 'rotate-180' : ''}`
                }
                src="/icons/arrow-down.svg"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 gap-8 overflow-hidden transition-all duration-300 lg:grid-cols-2 ${
          isOpen
            ? 'max-h-[1000px] py-[16px] ease-in'
            : 'max-h-0 py-0 opacity-0 ease-out'
        }`}
      >
        <div className="flex items-center justify-between gap-4 lg:hidden">
          {summaryInfor(stakeInfo)}
        </div>
        <div className="">
          {/* <Chart /> */}
          <img src="/assets/pages/boost/chart.svg" alt="" />
        </div>
        <div className="mt-10">
          <div className="text-[28px]">Withdraw {stakeInfo?.symbol}</div>
          <div className="mt-2 flex w-full items-center justify-between rounded-[12px] border border-[#1A1A1A] bg-gradient-to-b from-[#0d0d0d] to-[#0d0d0d]/0 px-2 py-4">
            <NumberFormat
              className="w-full bg-transparent bg-none px-2 font-mona focus:outline-none"
              placeholder="Select amount"
              value={amount || ''}
              onChange={(e: any, value: any) => setAmount(value)}
              thousandSeparator
              decimalScale={5}
            />
            <div className="flex items-center gap-2">
              {[25, 50, 100].map((item: any) => (
                <button
                  className="rounded bg-[#1A1A1A] px-2 py-1 font-mona text-sm text-[#959595]"
                  onClick={() => setAmount((Number(totalStaked) * item) / 100)}
                >
                  {item}%
                </button>
              ))}
            </div>
          </div>
          <button
            className="mt-4 flex w-full justify-center rounded-full bg-gradient-to-b from-[#AA5BFF] to-[#912BFF] py-1 font-mona text-[16px] uppercase transition-all duration-300 ease-linear hover:bg-gradient-to-t"
            onClick={() => (!isApproved ? approveToken() : handleWithdraw())}
          >
            {isSubmitLoading && <LoadingCircle />}
            {!isApproved ? 'Approve' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  )
}
