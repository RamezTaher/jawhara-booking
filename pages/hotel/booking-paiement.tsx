import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"

import { parseISO } from "date-fns"
import format from "date-fns/format"
import Booking from "./booking"

type Props = {
  banks: any
}

const BookingPaiement: NextPage<{ banks: any }> = ({ banks }: Props) => {
  const { t } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
  ])
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {}
  )
  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {
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
    CheckIn: "",
    CheckOut: "",
    NbrNights: 1,
    Price: 0,
    VAT: 0,
    PriceNoFeeNoVAT: 0,
    HotelId: 0,
  })

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()
  const closeErrorModal = () => {
    setShowModal(false)
  }

  const [form, setForm] = useState({
    banks: 0,
  })

  const onChangeForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validator = (form) => {
    return form.banks
  }
  const confirmPaiement = async () => {
    if (validator(form)) {
      let booking = {
        HotelId: selectedRoomStorage.HotelId,
        Bookings: [selectedRoomStorage],
        User: guestInfo,
      }
      console.log(booking)
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API}/booking/book_multi_rooms`,
          options
        )
        router.push("/hotel/booking-success")
      } catch (err) {}
    } else {
      setShowModal(true)
    }
  }

  const goBack = () => {
    router.back()
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
          <section className="flex flex-col gap-4  lg:gap-10">
            <div className="bg-primary pt-2 pb-1 mt-4 lg:mt-0 flex justify-center gap-8">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white text-primary flex justify-center items-center w-10 h-10">
                  <i className="icon-done_black_24dp"></i>
                </div>
                <div className="text-xxs font-bold text-white text-center">
                  {t("common:choose-a-room")}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white text-primary flex justify-center items-center w-10 h-10">
                  <i className="icon-done_black_24dp"></i>
                </div>
                <div className="text-xxs font-bold text-white text-center">
                  {t("common:enter-data")}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white text-primary flex justify-center items-center w-10 h-10">
                  <span>3</span>
                </div>
                <div className="text-xxs font-bold text-white text-center">
                  {t("common:pay")}
                </div>
              </div>
            </div>
            <div className="w-full  pb-12 container mx-auto   gap-6 lg:px-12 relative grid grid-cols-3 ">
              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2 ">
                <h1 className="text-black text-3xl font-bold">
                  {t("booking:bank-transfer")}
                </h1>

                <form className="flex flex-col gap-4  mb-7 lg:mb-12">
                  <h1 className="text-dark text-sm">
                    {t("booking:choose-bank-we-send-details")}
                  </h1>
                  {banks.map((bank, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between py-4 border-b border-dark-tint border-solid gap-4"
                    >
                      <span className="ms-1.5 text-base font-bold text-dark-shade ">
                        {bank.AccountNameAr} - {bank.BankNameAr}
                      </span>

                      <input
                        type="checkbox"
                        className="form-radio outline-none text-secondary ring-0 ring-offset-0 rounded-full checked:ring-secondary ring-white h-3 w-3 "
                        value={bank.Id}
                        name={"banks"}
                        onChange={(e) => onChangeForm(e)}
                        checked={form.banks == bank.Id}
                      />
                    </label>
                  ))}
                </form>

                <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                  <button
                    className="btn btn-secondary-outline text-base lg:w-52"
                    onClick={() => {
                      goBack()
                    }}
                  >
                    {t("button:review-booking")}
                  </button>
                  <button
                    className="btn btn-dark text-base lg:w-52"
                    onClick={() => confirmPaiement()}
                  >
                    {t("button:next")}
                  </button>
                </div>
              </div>
              {/* end guest information */}
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
                      {t("common:depart")}{" "}
                    </span>
                    <span className="text-black font-bold text-xs">
                      حتى الساعة 3:30 مساءً
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pb-3 border-b border-solid border-dark gap-2">
                  <div className="flex gap-1">
                    <span className="text-primary text-xs">
                      {selectedRoomStorage.NbrNights} {t("common:nights")}:
                    </span>
                    <div className="text-black font-bold text-xs">
                      {format(
                        parseISO(selectedRoomStorage.CheckIn),
                        "yyyy-MM-dd"
                      )}{" "}
                      -{" "}
                      {format(
                        parseISO(selectedRoomStorage.CheckOut),
                        "yyyy-MM-dd"
                      )}
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
            </div>
          </section>
        </div>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={closeErrorModal}
          />
        )}
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const resBank = await fetch(
    `${process.env.NEXT_PUBLIC_API}/booking/bankAccounts`
  )
  const banks = await resBank.json()

  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation", "booking"],
        nextI18NextConfig
      )),
      banks,
    },
  }
}
export default BookingPaiement
