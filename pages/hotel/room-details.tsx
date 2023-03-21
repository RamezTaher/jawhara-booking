import { NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { Disclosure, Transition } from "@headlessui/react"
import { useLocalStorage } from "react-use"

import HotelRoomCard from "../../components/HotelRoomCard"
import HotelSearch from "../../components/hotels-search"
import Layout from "../../components/layout"
import RoomCardsTable from "../../components/RoomCardsTable"
import StartsBox from "../../components/starts-box"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import { addDays } from "date-fns"
import format from "date-fns/format"
import { useFacilities } from "../../hooks/useFacilities"
import { useRoomsInfo } from "../../hooks/useRoomsInfo"
import { useHotel } from "../../hooks/useHotel"
import { SWRConfig } from "swr"

const Details: NextPage = () => {
  const { t, i18n } = useTranslation([
    "common",
    "button",
    "home",
    "input",
    "search",
    "hotel",
  ])
  const router = useRouter()
  const { roomsInfo } = useRoomsInfo()

  const [searchData, setSearchData] = useState<{
    checkin: string
    checkout: string
    clients: number
    rooms: number
  }>({
    checkin: "",
    checkout: "",
    clients: 1,
    rooms: 1,
  })
  const [
    selectedRoomStorage,
    setSelectedRoomStorage,
    removeSelectedRoomStorage,
  ] = useLocalStorage("selectedRoom", {
    RoomTypeNameAr: "",
    ViewNameAr: "",
    MealAr: "",
    RoomTypeId: 0,
  })
  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {})

  useEffect(() => {
    setSearchData({
      ...searchData,
      clients: router.query.clients ? Number(router.query.clients) : 1,
      rooms: router.query.rooms ? Number(router.query.rooms) : 1,
      checkin: router.query.checkin
        ? (router.query.checkin as string)
        : format(addDays(new Date(), 1), "yyyy-MM-dd"),
      checkout: router.query.checkout
        ? (router.query.checkout as string)
        : format(addDays(new Date(), 2), "yyyy-MM-dd"),
    })
  }, [router.query])

  const goToCheckOut = (data) => {
    setChoosenRoomStorage({
      clients: data.clients,
      rooms: data.rooms,
      checkin: data.checkin,
      checkout: data.checkout,
    })
    router.push({
      pathname: "./booking",
    })
  }
  const { data, isLoading } = useFacilities()
  const { hotel } = useHotel()

  const getRoomPicture = (id: any) => {
    let room = roomsInfo?.filter((item: any) => item.Id === id)
    if (room?.length > 0) {
      if (room[0].ImageUrl !== null) {
        return room[0].ImageUrl
      } else {
        return null
      }
    }
  }
  const getRoomDescription = (id: any) => {
    let room = hotel?.Rooms?.filter((item: any) => item.Id === id)
    if (room?.length > 0) {
      return room[0]?.DescriptionAr
    } else {
      return null
    }
  }

  return (
    <>
      <HeadSeo
        title={selectedRoomStorage.RoomTypeNameAr}
        description={t("home:jawharat-al-rashid")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-dark-tint pt-16 lg:pt-20 ">
          <section className="flex justify-start  ">
            <div className="w-full pt-16 pb-36 container mx-auto flex flex-col gap-6 lg:px-28 relative">
              <div className="  shadow-md flex flex-col items-start  lg:justify-between gap-5 md:gap-7 relative bg-white ">
                <div className="flex flex-col p-5 gap-3">
                  <div className="flex flex-col gap-1 lg:flex-row lg:gap-4">
                    <h1 className="text-black font-bold text-3xl ">
                      {selectedRoomStorage?.RoomTypeNameAr}
                    </h1>
                  </div>

                  <div className="text-black text-base mt-5">
                    {getRoomDescription(selectedRoomStorage.RoomTypeId)}
                  </div>
                </div>

                <div className=" w-full  bg-white lg:hidden">
                  <div className="relative ">
                    <Image
                      alt="hotel"
                      src={
                        getRoomPicture(selectedRoomStorage.RoomTypeId) ??
                        "/images/no-hotel.jpg"
                      }
                      layout="responsive"
                      width={360}
                      height={250}
                      objectFit="cover"
                    ></Image>
                  </div>
                </div>
              </div>

              <div className="hidden lg:grid grid-cols-3 grid-rows-5 gap-4">
                <div className="relative col-span-1 row-span-5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.561052759277!2d39.602747015353806!3d24.46600996697758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbf05d3ff8731%3A0x9674de593c9354d2!2sJawharat%20Al%20Rasheed%20Hotel!5e0!3m2!1sen!2stn!4v1654096155487!5m2!1sen!2stn"
                    className="w-full h-full"
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="col-span-2 row-span-5 grid grid-col-4 gap-4">
                  <div className="relative col-span-4 row-span-4">
                    <Image
                      alt="hotel"
                      src={
                        getRoomPicture(selectedRoomStorage.RoomTypeId) ??
                        "/images/no-hotel.jpg"
                      }
                      layout="responsive"
                      width={360}
                      height={220}
                      objectFit="cover"
                    ></Image>
                  </div>
                  {hotel &&
                    hotel?.Pictures.slice(0, 4).map((img, idx) => (
                      <div key={idx} className="relative col-span-1 row-span-5">
                        <Image
                          alt="hotel"
                          src={img?.secure_url ?? "/images/no-hotel.jpg"}
                          layout="responsive"
                          width={360}
                          height={220}
                          objectFit="cover"
                        ></Image>
                      </div>
                    ))}
                </div>
              </div>
              {/* End Hotel images + map */}

              {/* Start Card for update date and promocode */}
              <div className="p-8 lg:p-0">
                <HotelSearch goToSearch={goToCheckOut} />
              </div>

              {/* End Card for update date and promocode */}

              {/* Start Facilities */}
              <div className="px-4 py-8  flex flex-col gap-8 bg-white shadow-md">
                <h1 className="text-black text-3xl font-bold">
                  {t("hotel:facilities")}
                </h1>

                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="font-bold text-black text-base mb-2">
                      {t("hotel:facility")}
                    </h2>
                    <ul className="grid grid-cols-2 lg:grid-cols-4">
                      {data &&
                        data.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <i className="text-primary icon-check_circle_black_24dp"></i>
                            <span>
                              {i18n.language === "ar" ? item.NameAr : item.Name}
                            </span>
                          </li>
                        ))}

                      <Disclosure>
                        {({ open }) => (
                          <>
                            <div className="flex flex-col col-span-2 lg:col-span-4">
                              <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="grid grid-cols-2 lg:grid-cols-4">
                                  {data &&
                                    data.slice(4, -1).map((item, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-center gap-2"
                                      >
                                        <i className="text-primary icon-check_circle_black_24dp"></i>
                                        <span>
                                          {i18n.language === "ar"
                                            ? item.NameAr
                                            : item.Name}
                                        </span>
                                      </li>
                                    ))}
                                </Disclosure.Panel>
                              </Transition>

                              <Disclosure.Button className="flex justify-start items-center gap-2">
                                <h3 className="font-bold text-sm">
                                  {t("button:show-more")}
                                </h3>
                                <i
                                  className={`icon-vuesax-bold-arrow-down text-base transform transition-transform ease-in-out duration-100 ${
                                    open ? "rotate-180" : "rotate-0"
                                  }`}
                                ></i>
                              </Disclosure.Button>
                            </div>
                          </>
                        )}
                      </Disclosure>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Facilities */}
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "search", "hotel"],
        nextI18NextConfig
      )),
    },
  }
}
export default Details
