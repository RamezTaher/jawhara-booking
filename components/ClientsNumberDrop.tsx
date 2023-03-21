import { Combobox, Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, { Fragment, useEffect, useMemo, useState } from "react"

type Num = {
  id: number
  value: string
}
type Props = {
  onChangeDirection: (data: any) => void
  chosenNum?: { id: number; value: string }
}

const numbers = [
  { id: 1, value: "1" },
  { id: 2, value: "2" },
  { id: 3, value: "3" },
  { id: 4, value: "4" },
  { id: 5, value: "5" },
  { id: 6, value: "6" },
  { id: 7, value: "7" },
  { id: 8, value: "8" },
  { id: 9, value: "9" },
  { id: 10, value: "10" },
]

const ClientsNumberDrop = ({ onChangeDirection, chosenNum }: Props) => {
  const { t, i18n } = useTranslation(["input", "button", "home"])
  const [selectedNumber, setSelectedNumber] = useState(numbers[0])

  useEffect(() => {
    setSelectedNumber({
      id: chosenNum.id ? chosenNum.id : 1,
      value: chosenNum.value ? chosenNum.value : "1",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenNum])
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isMobileDropOpen, setIsMobileDropOpen] = useState(false)

  return (
    <Fragment>
      <Combobox
        className={`hidden relative justify-between lg:flex flex-col gap-2  ${
          router.pathname !== "/hotel/search" ? "p-2.5 lg:p-5 w-3/12" : "w-2/12"
        }   border-b border-solid lg:border-transparent border-dark-tint`}
        as={"div"}
        value={selectedNumber}
        onChange={setSelectedNumber}
      >
        {({ open }) => (
          <>
            <Combobox.Button className={"h-full flex flex-col gap-1"}>
              <div
                className={`${
                  router.pathname !== "/hotel/search"
                    ? "text-primary  text-sm lg:text-base"
                    : "text-white text-xs"
                } `}
              >
                {t("common:clients-number")}
              </div>

              <div className="flex justify-between items-center gap-4 py-1 px-2 border border-solid border-dark rounded-none w-full bg-white ">
                <Combobox.Input
                  className="p-0 border-0  text-sm "
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("common:clients-number")}
                  displayValue={(number: Num) => number.value}
                />

                <i className="icon-expand_more_black_24dp text-lg text-primary"></i>
              </div>
            </Combobox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className={`absolute start-0 w-full overflow-y-auto bg-white flex flex-col gap-1 p-4 z-50 ${
                  router.pathname !== "/hotel/search" ? " top-28" : "top-"
                }`}
              >
                {numbers.map((number, idx) => (
                  <Combobox.Option
                    key={number.id}
                    value={number}
                    className={
                      "cursor-pointer border-b border-solid border-dark-tint last:border-b-0 pb-1 last:pb-0"
                    }
                    onClick={() => {
                      setSelectedNumber(number)
                      onChangeDirection(number.id)
                    }}
                  >
                    {number.value}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
      <div
        onClick={() => setIsMobileDropOpen(true)}
        className={`lg:hidden flex flex-col gap-2 p-2.5 lg:p-5 `}
      >
        <div className="text-sm font-bold  text-primary">
          {t("common:clients-number")}
        </div>

        <div className="flex items-center justify-between text-sm md:text-xl py-2 px-4 border border-solid border-dark">
          <input
            className="p-0 placeholder-dark-shade border-0"
            type="text"
            placeholder={t("input:common:clients-number")}
            readOnly
            value={selectedNumber.id}
          />
          <i className="icon-expand_more_black_24dp text-primary"></i>
        </div>
      </div>

      <Transition
        show={isMobileDropOpen}
        as={Fragment}
        enter="transition ease-in-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <div className="fixed flex lg:hidden flex-col w-full h-full top-0 start-0 z-50 bg-white">
          <div className="flex justify-between items-center mb-2 shadow-md py-5 px-6">
            <i
              onClick={() => {
                setTimeout(() => {
                  setIsMobileDropOpen(false)
                }, 0)
              }}
              className="icon-chevron_right_black_24dp-1 text-2xl text-primary cursor-pointer transform ltr:rotate-180"
            ></i>
            <div className="font-bold">{t("common:clients-number")}</div>
            <i className="icon-chevron_left_black_24dp-1 text-2xl invisible"></i>
          </div>
          <div className="w-full flex flex-col gap-2 py-5 px-4 overflow-scroll">
            {numbers.map((number) => (
              <div
                onClick={() => {
                  setSelectedNumber(number)
                  onChangeDirection(number.id)
                }}
                key={number.id}
                className="flex justify-between items-center gap-2 border-b border-solid border-dark-tint pb-4"
              >
                <div>{number.value}</div>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio focus:ring-0 text-secondary"
                    name="radio"
                    onChange={() => setSelectedNumber(number)}
                    checked={selectedNumber.id === number.id}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="px-6 py-5 mt-auto w-full shadow-t-md">
            <button
              onClick={() => {
                setIsMobileDropOpen(false)
              }}
              className="btn btn-primary "
            >
              {t("button:apply")}
            </button>
          </div>
        </div>
      </Transition>
    </Fragment>
  )
}

export default ClientsNumberDrop
