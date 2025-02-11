import React from "react"
import Image from "next/image"
import StartsBox from "./starts-box"
import { useTranslation } from "next-i18next"
import { parseISO, format } from "date-fns"

type Props = {
  room: any
  onSelectRoom: (_data: any) => void
}

const TableRow = ({ room, onSelectRoom }: Props) => {
  const { t } = useTranslation(["common", "search", "button"])
  const inc = (choice: any) => {
    choice.Quantity = parseInt(choice.Quantity) + 1
    onSelectRoom(choice)
  }
  const dec = (choice: any) => {
    if (!choice.Quantity) {
      choice.Quantity = 0
    } else {
      choice.Quantity = parseInt(choice.Quantity) - 1
    }
    onSelectRoom(choice)
  }

  const selectChoice = (choice) => {
    choice.selected = true
    choice.Quantity = 1
    onSelectRoom(choice)
  }
  return (
    <div key={20} className="flex">
      <div className="p-4 border border-solid border-dark-tint w-1/3 ">
        <div className="relative mb-4">
          <Image
            alt="hotel"
            src={room?.DefaultPicture ?? "/images/no-hotel.jpg"}
            width={360}
            height={220}
            objectFit="cover"
          ></Image>
        </div>
        <h2
          className="text-dark-shade text-base font-bold
            "
        >
          {room.RoomTypeNameAr ?? room.RoomTypeName}
        </h2>
      </div>
      <div className="flex flex-col w-1/3 border border-solid border-dark-tint">
        {room.Data.map((choice, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 p-4 pb-8 border-b border-solid border-dark-tint h-36 last:border-b-0 "
          >
            <div className="flex items-center gap-2">
              <i className="icon-bed text-xs text-primary"></i>
              <h1 className="text-sm text-dark-shade">
                {choice.MealAr ?? choice.Meal}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <i className="icon-balcony text-xs text-primary"></i>
              <h1 className="text-sm text-dark-shade">
                {choice.ViewNameAr ?? choice.ViewName}
              </h1>
            </div>
            <div className="text-dark font-bold text-xs">
              {t("common:from")}{" "}
              {format(parseISO(choice.CheckIn), "yyyy-MM-dd")} {t("common:to")}{" "}
              {format(parseISO(choice.CheckOut), "yyyy-MM-dd")}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-1/3 border border-solid border-dark-tint">
        {room.Data.map((choice, idx) => (
          <div
            key={idx}
            className="flex flex-col  p-4 pb-8 border-b last:border-b-0 border-solid border-dark-tint h-36"
          >
            <div className="text-primary font-bold text-xl ">
              {choice.PriceToPay}
              <span className="text-xs text-primary ">{t("common:sar")}</span>
            </div>
            <div className="text-black font-bold text-xs">
              {t("search:for-x-nights", {
                nights: choice.NbrNights,
              })}
            </div>
            <div className="text-dark text-xs">{t("common:TVA")}</div>
            {choice.selected && choice.Quantity > 0 && (
              <div className="w-full flex mt-3 items-center">
                <button
                  className="btn btn-primary w-4 h-5 p-5 text-white"
                  onClick={() => dec(choice)}
                >
                  -
                </button>
                <div className="w-full flex items-center justify-center text-black font-bold">
                  {choice.Quantity}
                </div>
                <button
                  className=" btn btn-primary btn-primary w-4 h-5 p-5 text-white"
                  onClick={() => inc(choice)}
                >
                  +
                </button>
              </div>
            )}
            {(!choice.selected || choice.Quantity == 0) && (
              <button
                className="btn btn-secondary py-2 mt-3 rounded-3xl"
                onClick={() => selectChoice(choice)}
              >
                {t("button:book")}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableRow
