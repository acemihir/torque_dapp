import React from 'react'

export const OptionToken = () => {
  return (
    <div className="mt-[42px] flex items-center justify-between">
      <div className="flex w-[32%] items-center justify-between rounded-[12px] border-[1px] border-solid border-[#1a1a1a] from-[#0d0d0d] to-[#0d0d0d]/0 px-[36px] py-[20px]">
        <div className="w-[50%]">
          <h4 className="font-larken text-[24px] font-[400] leading-[40px]">240,000,000</h4>
          <p className="font-[500] leading-[24px] text-[#959595]">
            TORQ Remaining
          </p>
        </div>
        <div className="w-[50%]">
          <div className="mb-[20px] flex items-center justify-end gap-[5px]">
            <p className="text-[14px] font-[500] uppercase  text-[#AA5BFF]">
              learn
            </p>
            <img src="/assets/pages/vote/genover/next.svg" alt="" />
          </div>
          <div className="relative h-[4px] w-full bg-[#aa5bff33]">
            <div className="absolute h-[4px] w-[70%] bg-[#AA5BFF]"></div>
          </div>
        </div>
      </div>
      <div className="flex w-[32%] items-center justify-between rounded-[12px] border-[1px] border-solid border-[#1a1a1a] from-[#0d0d0d] to-[#0d0d0d]/0 px-[36px] py-[20px]">
        <div className="w-[50%]">
          <h4 className="font-larken text-[24px] font-[400] leading-[40px]">0.00</h4>
          <p className="font-[500] leading-[24px] text-[#959595]">
            Circulating Supply
          </p>
        </div>
        <div className="w-[50%]">
          <div className="flex items-center justify-end gap-[5px]">
            <p className="text-[14px] font-[500] uppercase  leading-[40px] text-[#AA5BFF]">
              Verify
            </p>
            <img src="/assets/pages/vote/genover/next.svg" alt="" />
          </div>
          <div className="flex items-center justify-end gap-[4px]">
            <img src="/assets/pages/vote/genover/up-green.svg" alt="" />
            <p className="font-[500] leading-[24px] text-[#1EB26B]">0.00%</p>
          </div>
        </div>
      </div>
      <div className="flex w-[32%] items-center justify-between rounded-[12px] border-[1px] border-solid border-[#1a1a1a] from-[#0d0d0d] to-[#0d0d0d]/0 px-[36px] py-[20px]">
        <div className="w-[50%]">
          <h4 className="font-larken text-[24px] font-[400] leading-[40px]">0.00</h4>
          <p className="font-[500] leading-[24px] text-[#959595]">
            Global Delegates
          </p>
        </div>
        <div className="w-[50%]">
          <div className="flex items-center justify-end gap-[5px]">
            <p className="text-[14px] font-[500] uppercase  leading-[40px] text-[#AA5BFF]">
              leaders
            </p>
            <img src="/assets/pages/vote/genover/next.svg" alt="" />
          </div>
          <div className="flex items-center justify-end gap-[4px]">
            <img src="/assets/pages/vote/genover/up-green.svg" alt="" />
            <p className="font-[500] leading-[24px] text-[#1EB26B]">0.00%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
