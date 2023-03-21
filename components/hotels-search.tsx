import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { type } from "os"
import React, { useEffect, useState } from "react"
import DatePicker from "./date-picker"
import DirectionDrop from "./direction-drop"
import format from "date-fns/format"
import { addDays } from "date-fns"
import ClientsNumberDrop from "./ClientsNumberDrop"
import RoomsNumberDrop from "./RoomsNumberDrop"

type Props = {
  goToSearch: (_data: any) => void
}

const HotelSearch = ({ goToSearch }: Props) => {
  const { t } = useTranslation(["input", "button", "home"])
  const router = useRouter()
  const [queriesObject, setQueriesObject] = useState<{
    checkin: string
    checkout: string
    clients: number
    rooms: number
  }>({
    clients: 1,
    rooms: 1,
    checkin: router.query.checkin
      ? (router.query.checkin as string)
      : format(addDays(new Date(), 1), "yyyy-MM-dd"),
    checkout: router.query.checkout
      ? (router.query.checkout as string)
      : format(addDays(new Date(), 2), "yyyy-MM-dd"),
  })
  const handleChangeDate = (data) => {
    if (data.startDate) {
      setQueriesObject({
        ...queriesObject,
        checkin: format(data.startDate, "yyyy-MM-dd"),
      })
    }
    if (data.endDate) {
      setQueriesObject({
        ...queriesObject,
        checkout: format(data.endDate, "yyyy-MM-dd"),
      })
    }
  }

  useEffect(() => {
    setQueriesObject({
      ...queriesObject,
      clients: router.query.clients ? Number(router.query.clients) : 1,
      rooms: router.query.rooms ? Number(router.query.rooms) : 1,
      checkin: router.query.checkin
        ? (router.query.checkin as string)
        : format(addDays(new Date(), 1), "yyyy-MM-dd"),
      checkout: router.query.checkout
        ? (router.query.checkout as string)
        : format(addDays(new Date(), 2), "yyyy-MM-dd"),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <div
      className={` flex flex-col lg:flex-row  w-full   pt-2.5  lg:p-0  ${
        router.pathname !== "/hotel/search"
          ? "bg-white shadow-md"
          : "bg-transparent gap-4"
      }`}
    >
      <DatePicker
        chosenDates={{
          startDate: new Date(queriesObject.checkin),
          endDate: new Date(queriesObject.checkout),
        }}
        changeDate={handleChangeDate}
      />
      <ClientsNumberDrop
        chosenNum={{
          id: queriesObject.clients,
          value: queriesObject.clients.toString(),
        }}
        onChangeDirection={(clients) =>
          setQueriesObject({ ...queriesObject, clients: clients })
        }
      />
      <RoomsNumberDrop
        chosenNum={{
          id: queriesObject.rooms,
          value: queriesObject.rooms.toString(),
        }}
        onChangeDirection={(rooms) =>
          setQueriesObject({ ...queriesObject, rooms: rooms })
        }
      />

      <button
        onClick={() => goToSearch(queriesObject)}
        className={`btn ${
          router.pathname !== "/hotel/search"
            ? "btn-primary py-5 px-2 lg:w-1/12 text-xl font-bold mt-4 lg:mt-0"
            : "btn-dark lg:w-3/12 p-0 text-sm leading-3"
        }   w-full   `}
      >
        {t("common:book-now")}
      </button>
    </div>
  )
}

export default HotelSearch
