import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/types/store'

export const Against = () => {
  const theme = useSelector((store: AppStore) => store.theme.theme)

  return (
    <div className="mt-[24px] rounded-[12px] border border-[#E6E6E6] bg-[#ffffff]  from-[#0d0d0d] to-[#0d0d0d]/0 text-[#030303] dark:border-[#1A1A1A] dark:bg-transparent dark:bg-gradient-to-br dark:text-white px-[56px] py-[17px] md:mt-0 md:w-[49%]">
      <div className="mx-auto w-full py-[58px]">
      <img
            src={
              theme === 'light'
                ? '/assets/pages/vote/genover/noproposal-white.png'
                : '/assets/pages/vote/genover/noproposal.png'
            }
            alt=""
            className="mx-auto w-full max-w-[84px]"
          />
        <h3 className="font-larken text-[#030303] dark:text-white mt-[12px] text-center text-[24px] font-[400] leading-[34px]">
          Vote hasn't started
        </h3>
        <p className="mx-auto mt-[2px] w-full text-center text-[16px] font-[500] text-[#959595] max-w-[280px]">
          Against votes will appear here.
        </p>
      </div>
      {/* <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-[400] leading-[60px]">Against</h2>
        <p className="font-[500] leading-[24px] text-[#F05858]">682</p>
      </div>
      <div className="relative h-[4px] w-full bg-[#F058584D]">
        <div className="absolute h-[4px] w-[5%] bg-[#F05858]"></div>
      </div>
      <div className="gradient-border mt-[31px] hidden h-[1px] w-full md:block"></div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-[50%] py-[16px] text-left font-[500] leading-[24px] text-[#959595]">
              25 Delegates
            </th>
            <th className="w-[50%] py-[16px] text-right font-[500] leading-[24px] text-[#959595]">
              Votes
            </th>
          </tr>
        </thead>

        {menu.map((item, i) => (
          <tbody>
            <tr className="relative">
              <td className="py-[16px] text-left">{item.delegates}</td>
              <td className="py-[16px] text-right">{item.votes}</td>
              <div className="gradient-border absolute left-0 hidden h-[1px] w-full md:block"></div>
            </tr>
          </tbody>
        ))}
      </table>
      <div className="gradient-border mt-[24px] hidden h-[1px] w-full md:block"></div> */}
      {/* <div className="mt-[18px] cursor-pointer text-center text-[14px] font-[500] uppercase text-[#959595]">
        view all
      </div> */}
    </div>
  )
}

const menu = [{ delegates: '0x123..4567', votes: '0.00' }]
