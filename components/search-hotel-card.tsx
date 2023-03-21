import React from "react"
import Image from "next/image"
import StartsBox from "./starts-box"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
type Props = {}

const SearchHotelCard = ({ room, pic }) => {
  const { t } = useTranslation(["common", "search", "button"])
  console.log(pic)

  const { query } = useRouter()

  return (
    <div className="flex flex-col md:flex-row shadow-md w-full bg-white">
      <div className="relative h-44 md:h-auto md:min-h-full w-full md:w-1/4">
        <Image
          alt="hotel"
          src={pic ? pic : "/images/no-hotel.jpg"}
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className="w-full flex flex-col md:flex-row md:w-3/4">
        <div className="md:w-2/3 w-full p-2.5 md:p-4 ">
          <div className="border-b border-solid border-dark-tint md:border-e flex flex-col gap-6 py-4">
            <h2 className="font-bold text-xl md:text-2xl">
              {room.RoomTypeNameAr ?? room.RoomTypeName}
            </h2>

            <div className="flex  items-center gap-6  ">
              <div className="flex items-center gap-1 ">
                <i className="icon-restaurant_black_24dp text-primary"></i>
                <span className="text-black text-xs">
                  {room.MealAr ?? room.Meal}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <i className="icon-vertical_shades_black_24dp text-primary"></i>
                <span className="text-black text-xs">
                  {room.ViewNameAr ?? room.ViewName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 border-b md:border-b-0 md:border-e py-2 border-solid border-dark-tint">
            <i className="icon-room_service_black_24dp text-2xl text-primary"></i>
            <i className="icon-wifi_black_24dp text-2xl text-primary"></i>
            <i className="icon-local_parking_black_24dp text-2xl text-primary"></i>
            <i className="icon-shower_black_24dp text-2xl text-primary"></i>
            <i className="icon-ac_unit_black_24dp text-2xl text-primary"></i>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-2.5 md:p-4 w-full md:w-1/3">
          <div className=" flex flex-col">
            <div className="text-primary font-bold text-3xl flex items-end gap-1">
              {room.Price}
              <span className="text-xs text-primary md:text-base">
                {t("common:sar")}
              </span>
            </div>
            <div className="text-dark text-xs">
              {t("search:for-x-nights", {
                nights: room.NbrNights,
              })}
            </div>
          </div>

          <Link
            href={{
              pathname: `/hotel/room-details`,
              query: {
                ...query,
              },
            }}
            passHref
            type="button"
          >
            <button className={`btn btn-dark lg:w-full  `}>
              {t("button:book")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchHotelCard
