import Link from 'next/link'
import { AppStore } from '@/types/store'
import { useSelector } from 'react-redux'

export default function Banner() {
  const theme = useSelector((store: AppStore) => store.theme.theme)
  return (
    <div className="relative">
      <img
        className="rounded-xl"
        src={
          theme === 'light'
            ? '/assets/banners/boost-light-large.png'
            : '/assets/banners/boost-compressed.png'
        }
        alt="Torque Boost"
      />
      <Link
        href="/home"
        className="absolute left-[24px] top-[18px] flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#FCFAFF] dark:bg-[#030303] lg:top-[24px] lg:h-[48px] lg:w-[48px]"
      >
        <img
          className="w-[8px] lg:w-[12px]"
          src={
            theme === 'light'
              ? '/icons/arrow-left-dark.png'
              : '/icons/arrow-left.svg'
          }
          alt="Back home"
        />
      </Link>
    </div>
  )
}
