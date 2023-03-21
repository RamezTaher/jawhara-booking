import { GetStaticProps, NextPage, GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import Layout from "../../components/layout"
import StartsBox from "../../components/starts-box"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Pagination from "../../components/pagination"
import { useMemo, useState } from "react"
import Link from "next/link"
import format from "date-fns/format"
import { addDays } from "date-fns"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import { useHotels } from "../../hooks/useHotels"
import { useLocalStorage } from "react-use"
import { useRouter } from "next/router"
import { useRoomsInfo } from "../../hooks/useRoomsInfo"
import { SWRConfig } from "swr"

type Hotel = {
  Adress: string
  AdressAr: string
  DefaultPicture: string
  Stars: number
  Name: string
  NameAr: string
  Slug: string
}

const Hotels: NextPage<{ rooms: any }> = ({ rooms }) => {
  const router = useRouter()
  const { t } = useTranslation(["common", "search", "button"])
  const [
    selectedRoomStorage,
    setSelectedRoomStorage,
    removeSelectedRoomStorage,
  ] = useLocalStorage("selectedRoom")

  const { roomsInfo, isLoading } = useRoomsInfo()

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
        title={t("common:rooms")}
        description={t("home:jawharat-al-rashid")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-secondary-tint pt-16 lg:pt-20 ">
          <section className="relative py-20">
            <div className="container md:px-24 md:mx-auto relative z-10">
              <div className=" gap-4 flex flex-col mb-8 ">
                {rooms &&
                  rooms?.map((room) =>
                    room?.Data.map((item, idx) => (
                      <div
                        key={idx}
                        className="w-full bg-white shadow-md   cursor-pointer "
                        onClick={() => {
                          setSelectedRoomStorage(item)
                        }}
                      >
                        <Link
                          passHref
                          href={{
                            pathname: `/hotel/room-details`,
                            query: {
                              clients: 1,
                              rooms: 1,
                              checkin: format(
                                addDays(new Date(), 0),
                                "yyyy-MM-dd"
                              ),
                              checkout: format(
                                addDays(new Date(), 1),
                                "yyyy-MM-dd"
                              ),
                            },
                          }}
                        >
                          <div className="h-[500px] flex flex-col relative w-full lg:flex-row   ">
                            <div className="h-1/2 lg:h-full w-full lg:w-1/2 relative  flex justify-center items-center">
                              <Image
                                alt="hotel"
                                src={
                                  getRoomPicture(item.RoomTypeId) ??
                                  "/images/no-hotel.jpg"
                                }
                                layout="fill"
                                objectFit="cover"
                              ></Image>
                            </div>
                            <div className="h-1/2 lg:w-1/2 lg:h-full flex flex-col justify-center items-center gap-6">
                              <div>
                                <span className="text-[40px] font-bold text-black">
                                  {item?.Price}
                                </span>{" "}
                                <span className="text-[40px]  text-black">
                                  {" "}
                                  {t("common:sar")}
                                </span>
                              </div>
                              <div className="text-primary text-3xl font-bold">
                                {item?.RoomTypeNameAr}
                              </div>
                              <button className="btn btn-dark w-[200px]">
                                {t("home:show-room")}{" "}
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resRooms = await fetch(
    `${
      process.env.NEXT_PUBLIC_API
    }/hotels/groupedAvailabaleRooms/1?data.checkIn=${format(
      addDays(new Date(), 0),
      "yyyy-MM-dd"
    )}&data.checkOut=${format(addDays(new Date(), 1), "yyyy-MM-dd")}`
  )
  const rooms = await resRooms.json()
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input"],
        nextI18NextConfig
      )),
      rooms: rooms,
    },
  }
}
export default Hotels
