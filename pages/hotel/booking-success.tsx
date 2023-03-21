import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import StartsBox from "../../components/starts-box"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"

import { parseISO } from "date-fns"
import format from "date-fns/format"

const BookingSuccess: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
  ])
  const [chosenRoomsStorage, setchosenRoomsStorage, removechosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setchosenHotelStorage, removechosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setguestInfo, removeguestInfo] = useLocalStorage(
    "guestInfo",
    { firstName: "", lastName: "", phone: 0, email: "", demandes: "" }
  )

  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {
      clients: 1,
      rooms: 1,
      checkin: "",
      checkout: "",
    })

  const [
    selectedRoomStorage,
    setSelectedRoomStorage,
    removeSelectedRoomStorage,
  ] = useLocalStorage("selectedRoom", {
    RoomTypeNameAr: "",
    ViewNameAr: "",
    MealAr: "",
    CheckIn: "",
    CheckOut: "",
    NbrNights: 1,
    Price: 0,
    VAT: 0,
    PriceNoFeeNoVAT: 0,
  })
  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel", {
    NameAr: "",
    Name: "",
    Stars: 0,
    AdressAr: "",
    Adress: "",
    DefaultPicture: "",
  })

  let totalPrice = 0
  let totalWithoutVat = 0
  let totalVAT = 0

  if (chosenRoomsStorage) {
    chosenRoomsStorage.forEach((x) => {
      totalPrice = totalPrice + x.PriceToPay * x.Quantity
    })
  }
  totalVAT = totalPrice * 0.15
  totalWithoutVat = totalPrice - totalVAT

  const goToHome = () => {
    router.push("/")
  }
  return (
    <>
      <HeadSeo
        title={t("validation:success-book")}
        description={t("home:jawharat-al-rashid")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-secondary-tint pt-[57px] lg:pt-14 ">
          <section className="flex flex-col justify-start  ">
            <div className="bg-[#00800A] px-5 lg:px-20 py-4 z-10 w-full flex items-center gap-5 text-white text-2xl font-bold mt-5">
              <div className="w-10 h-10 flex justify-center items-center border border-solid border-white">
                <i className="icon-done_black_24dp text-2xl"></i>
              </div>

              <p>{t("validation:success-book")}</p>
            </div>
            <div className="w-full pt-16 pb-36 px-5 lg:px-20 bg-dark-tint gap-6  relative grid grid-cols-3">
              {/* Start Booking Card */}
              <div className="flex flex-col w-full bg-white col-span-3 lg:col-span-2 gap-10 h-fit">
                <h1 className="hidden lg:block text-3xl text-black font-bold m-5">
                  {t("common:booking-info")}
                </h1>
                <div className="flex flex-col lg:flex-row">
                  <div className="relative h-44 md:h-auto md:min-h-full w-full md:w-1/4 md:hidden">
                    <Image
                      alt="hotel"
                      src={"/images/no-hotel.jpg"}
                      layout="fill"
                      objectFit="cover"
                    ></Image>
                  </div>
                  <div className="hidden md:block relative h-44 md:h-auto md:min-h-full w-full md:w-1/4">
                    <Image
                      alt="hotel"
                      src={"/images/no-hotel.jpg"}
                      layout="fill"
                      objectFit="cover"
                    ></Image>
                  </div>
                  <div className="w-full flex flex-col  md:flex-row md:w-3/4">
                    <div className=" w-full p-4 flex flex-col gap-5">
                      <h1 className="text-black text-base font-bold">
                        {choosenRoomStorage.rooms} x
                        {selectedRoomStorage.RoomTypeNameAr}
                      </h1>
                      <div className="flex justify-between items-center gap-6 pb-4 border-b border-solid border-dark-tint lg:justify-start  ">
                        <div className="flex items-center gap-1 w-1/2 lg:w-auto">
                          <i className="icon-restaurant_black_24dp text-primary"></i>
                          <span className="text-black text-xs">
                            {" "}
                            {selectedRoomStorage.MealAr}{" "}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 w-1/2 lg:w-auto">
                          <i className="icon-vertical_shades_black_24dp text-primary"></i>
                          <span className="text-black text-xs">
                            {" "}
                            {selectedRoomStorage.ViewNameAr}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between  ">
                        <div className="flex items-center gap-1 text-black text-xs lg:w-1/2">
                          <span>
                            {selectedRoomStorage.NbrNights}{" "}
                            {t("common:nights-word")}:
                          </span>
                          <span>
                            {" "}
                            {choosenRoomStorage.checkin} -{" "}
                            {choosenRoomStorage.checkout}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-black text-xs lg:w-1/2">
                          <span>
                            {" "}
                            {choosenRoomStorage.clients}{" "}
                            {t("common:clients-word")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Booking Card */}

              {/* Start Booking Info */}
              {/* Start Booking Info */}
              <div className="p-8 bg-white shadow-md col-span-3 lg:col-span-1 md:h-fit flex flex-col gap-4 ">
                <h1 className="text-black text-3xl font-bold mb-3">
                  {t("booking:book-info")}
                </h1>
                <div className="flex pb-3 border-b border-solid border-dark flex-between ">
                  <div className="flex flex-col w-1/2 gap-1">
                    <span className="text-primary text-xs">
                      {t("common:date")}
                    </span>
                    <span className="text-black font-bold text-xs">
                      بعد الساعة 2:00 مساءً
                    </span>
                  </div>
                  <div className="flex flex-col  w-1/2 gap-1">
                    <span className="text-primary text-xs">
                      {" "}
                      {t("common:depart")}
                    </span>
                    <span className="text-black font-bold text-xs">
                      حتى الساعة 3:30 مساءً
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pb-3 border-b border-solid border-dark gap-2">
                  <div className="flex gap-1">
                    <span className="text-primary text-xs">
                      {selectedRoomStorage.NbrNights} {t("common:nights-word")}:
                    </span>
                    <div className="text-black font-bold text-xs">
                      {choosenRoomStorage.checkin} -{" "}
                      {choosenRoomStorage.checkout}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-primary text-xs">
                      {choosenRoomStorage.clients} {t("common:clients-word")}:
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pb-3 border-b border-solid border-dark gap-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">
                      {choosenRoomStorage.rooms} x{" "}
                      {selectedRoomStorage.RoomTypeNameAr}
                    </span>
                    <div className="text-black font-bold text-base">
                      {(
                        selectedRoomStorage.PriceNoFeeNoVAT *
                        choosenRoomStorage.rooms
                      ).toFixed(2)}{" "}
                      {t("common:sar")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">{t("common:TVA")}</span>
                    <div className="text-black font-bold text-base">
                      {(
                        selectedRoomStorage.VAT * choosenRoomStorage.rooms
                      ).toFixed(2)}{" "}
                      {t("common:sar")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">
                      {" "}
                      {t("common:period")}
                    </span>
                    <div className="text-black font-bold text-base">
                      {selectedRoomStorage.NbrNights} {t("common:nights-word")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-dark text-sm"> {t("common:sum")}</span>
                  <div className="text-primary font-bold text-2xl">
                    {(
                      selectedRoomStorage.Price * choosenRoomStorage.rooms
                    ).toFixed(2)}{" "}
                    {t("common:sar")}
                  </div>
                </div>
              </div>
              {/* End Booking Info */}
              {/* End Booking Info */}

              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2 lg:-translate-y-[150px]">
                <h1 className="text-black text-3xl font-bold">بيانات الضيف</h1>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:first-name")}
                    </span>
                    <span> {guestInfo.firstName}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:last-name")}
                    </span>
                    <span>{guestInfo.lastName}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:email")}
                    </span>
                    <span>{guestInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:phone-number")}
                    </span>
                    <span> {guestInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {" "}
                      {t("common:special-demandes")}
                    </span>
                    <span>{guestInfo.demandes}</span>
                  </div>
                </div>
              </div>
              {/* end guest information */}

              <div className="px-4 py-8 flex  gap-8 bg-white shadow-md col-span-3 lg:col-span-2 lg:-translate-y-[150px] lg:justify-end">
                <button
                  className="btn btn-dark lg:w-[200px]"
                  onClick={() => {
                    goToHome()
                  }}
                >
                  {t("button:okay")}
                </button>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation", "booking"],
        nextI18NextConfig
      )),
    },
  }
}
export default BookingSuccess
