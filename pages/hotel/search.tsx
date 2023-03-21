import { Transition } from "@headlessui/react"
import { GetServerSideProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { Fragment, useState, useRef, useEffect } from "react"
import DatePicker from "../../components/date-picker"
import Filter from "../../components/filter"
import HotelSearch from "../../components/hotels-search"
import Layout from "../../components/layout"
import SearchHotelCard from "../../components/search-hotel-card"
import SortDrop from "../../components/sort-drop"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Link from "next/link"
import { useLocalStorage, useClickAway } from "react-use"
import Router, { useRouter } from "next/router"
import format from "date-fns/format"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import { addDays } from "date-fns"
import ClientsNumberDrop from "../../components/ClientsNumberDrop"
import RoomsNumberDrop from "../../components/RoomsNumberDrop"
import { useRoomsInfo } from "../../hooks/useRoomsInfo"
import { SWRConfig } from "swr"

const Search: NextPage<{ rooms: any }> = ({ rooms }) => {
  const router = useRouter()
  const { t, i18n } = useTranslation(["common", "search", "button", "search"])

  const { roomsInfo, isLoading } = useRoomsInfo()

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isSearchCardOpen, setIsSearchCardOpen] = useState(false)
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
  ] = useLocalStorage("selectedRoom")

  const mobileSearchRef = useRef(null)
  useClickAway(mobileSearchRef, () => {
    setIsSearchCardOpen(false)
  })
  const goToSearch = (data) => {
    router.push({
      pathname: "./search",
      query: {
        clients: data.clients,
        rooms: data.rooms,
        checkin: data.checkin,
        checkout: data.checkout,
      },
    })
  }
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

  const handleChangeDate = (data) => {
    if (data.startDate) {
      setSearchData({
        ...searchData,
        checkin: format(data.startDate, "yyyy-MM-dd"),
      })
    }
    if (data.endDate) {
      setSearchData({
        ...searchData,
        checkout: format(data.endDate, "yyyy-MM-dd"),
      })
    }
  }

  const handleChangeFilter = (data) => {
    console.log(data)
  }

  const getRoomPicture = (id: any) => {
    let room = roomsInfo?.filter((a: any) => a.Id === id)
    if (room?.length > 0) {
      if (room[0].ImageUrl !== null) {
        return room[0].ImageUrl
      } else {
        return null
      }
    }
  }

  return (
    <>
      <HeadSeo
        title={t("common:search-title")}
        description={t("home:jawharat-al-rashid")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-secondary-tint pt-16 lg:pt-20">
          <section className="flex flex-col bg-dark-tint">
            <div className="hidden lg:block p-4 bg-primary relative z-10">
              <HotelSearch goToSearch={goToSearch} />
            </div>
            <div className="flex">
              <div className="lg:w-3/12  lg:flex gap-4 flex-col items-start max-w-[18rem]">
                <div className="w-full hidden lg:block">
                  <Filter onFilterChange={handleChangeFilter} />
                </div>
                <Transition
                  show={isMobileFilterOpen}
                  as={Fragment}
                  enter="transition ease-in-out duration-100"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in-out duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed flex lg:hidden flex-col w-full h-full top-0 start-0 z-50 bg-white">
                    <div className="flex justify-between items-center mb-2 shadow-md w-full py-5 px-6">
                      <i
                        onClick={() => {
                          setTimeout(() => {
                            setIsMobileFilterOpen(false)
                          }, 0)
                        }}
                        className="icon-chevron_right_black_24dp-1 text-2xl text-primary cursor-pointer transform ltr:rotate-180"
                      ></i>
                      <div className="font-bold">{t("button:filter")}</div>
                      <i className="icon-chevron_left_black_24dp-1 text-2xl invisible"></i>
                    </div>
                    <div className="w-full flex flex-col gap-2 overflow-y-auto">
                      <Filter onFilterChange={handleChangeFilter} />
                    </div>
                    <div className="px-6 py-5 mt-auto w-full shadow-t-md">
                      <button
                        onClick={() => {
                          setIsMobileFilterOpen(false)
                        }}
                        className="btn btn-dark "
                      >
                        {t("button:apply")}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>

              <div className="lg:w-9/12 w-full py-1 lg:py-0  flex flex-col  ">
                {/* Start Card for update date and promocode */}
                <div ref={mobileSearchRef} className="relative">
                  <div
                    onClick={() => setIsSearchCardOpen(!isSearchCardOpen)}
                    className="p-4 shadow-md flex items-center gap-5 md:gap-7 bg-primary text-white lg:hidden  "
                  >
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-base flex items-center gap-2 font-bold">
                        <span> {t("search:clients-number")}</span>
                        <span>{router.query.clients}</span>
                      </div>
                      <div className=" text-sm flex justify-start gap-2 items-center">
                        <span>
                          {searchData.checkin
                            ? new Date(searchData.checkin).toLocaleDateString(
                                i18n.language === "ar" ? "ar-tn" : "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : t("input:choose-date")}
                        </span>
                        -
                        <span>
                          {searchData.checkout
                            ? new Date(searchData.checkout).toLocaleDateString(
                                i18n.language === "ar" ? "ar-tn" : "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : t("input:choose-date")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Transition as={Fragment} show={isSearchCardOpen}>
                    <div className=" flex absolute flex-col w-full start-0 z-20 bg-white top-full shadow-md">
                      <DatePicker
                        chosenDates={{
                          startDate: new Date(searchData.checkin),
                          endDate: new Date(searchData.checkout),
                        }}
                        changeDate={handleChangeDate}
                      />

                      <ClientsNumberDrop
                        chosenNum={{
                          id: searchData.clients,
                          value: searchData.clients.toString(),
                        }}
                        onChangeDirection={(clients) =>
                          setSearchData({ ...searchData, clients: clients })
                        }
                      />
                      <RoomsNumberDrop
                        chosenNum={{
                          id: searchData.rooms,
                          value: searchData.rooms.toString(),
                        }}
                        onChangeDirection={(rooms) =>
                          setSearchData({ ...searchData, rooms: rooms })
                        }
                      />
                      <div className="px-6 py-5 mt-auto w-full">
                        <button
                          className="btn btn-dark "
                          onClick={() =>
                            goToSearch({
                              clients: searchData.clients,
                              rooms: searchData.rooms,
                              checkin: searchData.checkin,
                              checkout: searchData.checkout,
                            })
                          }
                        >
                          {t("button:apply")}
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>

                {/* End Card for update date and promocode */}
                <div className="bg-dark-tint p-8 flex flex-col gap-5">
                  {/* Start Filter mobile buttons */}
                  <div className="flex items-center justify-between gap-3 lg:hidden">
                    <button
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="btn btn-primary-outline text-sm font-bold px-0"
                    >
                      {t("button:filter")}
                    </button>
                    <button className="btn btn-primary-outline   text-sm font-bold px-0">
                      {t("button:sort-with")}
                    </button>
                  </div>
                  {/* End Filter mobile buttons */}

                  <div className="flex flex-col items-start gap-5 mb-8 relative">
                    {rooms.map((room) =>
                      room.Data.map((item, idx) => (
                        <div
                          key={idx}
                          className="w-full shadow-md cursor-pointer"
                          onClick={() => {
                            setSelectedRoomStorage(item)
                          }}
                        >
                          <Link
                            passHref
                            href={{
                              pathname: `/hotel/room-details`,
                              query: {
                                ...router.query,
                              },
                            }}
                          >
                            <div className="h-full">
                              <SearchHotelCard
                                pic={getRoomPicture(item.RoomTypeId)}
                                room={item}
                              />
                            </div>
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* <Pagination /> */}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries = context.query

  const resRooms = await fetch(
    `${process.env.NEXT_PUBLIC_API}/hotels/groupedAvailabaleRooms/1?data.checkIn=${queries.checkin}&data.checkOut=${queries.checkout}`
  )
  const rooms = await resRooms.json()
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "search"],
        nextI18NextConfig
      )),

      rooms: rooms,
    },
  }
}

export default Search
