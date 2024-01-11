import Modal from '@/components/common/Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { FaAngleDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { AppStore } from '@/types/store'

export const CreateModal = (props: any) => {
  const { openModal, handleCLose } = props
  const theme = useSelector((store: AppStore) => store.theme.theme)
  return (
    <div>
      <Modal
        open={openModal}
        handleClose={handleCLose}
        className="bg-[#FCFAFF] dark:bg-[#030303] mx-auto w-[90%] max-w-[380px] max-h-[420px] px-[24px] overflow-hidden hover:overflow-y-auto"
        hideCloseIcon
      >
        <div className="flex items-center justify-between py-2">
          <div className="font-larken text-[16px] font-[400] text-[#030303] dark:text-white md:text-[28px]">
            Create
          </div>
          <AiOutlineClose
            className="cursor-pointer text-[#030303] dark:text-[#ffff]"
            onClick={handleCLose}
          />
        </div>
        <div className={`mt-2 hidden h-[1px] w-full md:block` +`
      ${theme === 'light' ? 'bg-gradient-divider-light' : 'bg-gradient-divider'}`
        }></div>
        <div className="mt-[22px]">
          <input
            className="w-full rounded-[12px] border-[1px] border-solid border-[#E6E6E6] dark:border-[#1a1a1a] bg-transparent px-[21px] py-[16px] text-[16px] font-[500] text-[#959595]"
            type="text"
            placeholder="Title*"
          />
          <input
            className="mt-[14px] w-full rounded-[12px] border-[1px] border-solid border-[#E6E6E6] dark:border-[#1a1a1a] bg-transparent px-[21px] py-[16px] text-[16px] font-[500] text-[#959595]"
            type="text"
            placeholder="Forum link*"
          />
          <input
            className="mt-[14px] w-full rounded-[12px] border-[1px] border-solid border-[#E6E6E6] dark:border-[#1a1a1a] bg-transparent px-[21px] pb-[190px] pt-[20px] text-[16px] font-[500] text-[#959595]"
            type="text"
            placeholder="Description*"
          />
          <div className="mt-[14px] flex w-full items-center  justify-between rounded-[8px] border-[1px] border-solid border-[#E6E6E6] dark:border-[#1a1a1a] px-[21px] py-[12px]">
            <input
              type="text"
              className="bg-transparent text-[16px] font-[500] text-[#959595]"
              placeholder="Add action"
            />
            <FaAngleDown className="h-[24px] cursor-pointer text-[#959595]" />
          </div>
        </div>
        <button
          className={`font-mona mt-[16px] w-full rounded-full border border-[#AA5BFF] bg-gradient-to-b from-[#AA5BFF] to-[#912BFF] py-1 uppercase text-white transition-all hover:border hover:border-[#AA5BFF] hover:from-transparent hover:to-transparent hover:text-[#AA5BFF]
        `}
        >
          submit proposal
        </button>
      </Modal>
    </div>
  )
}
