import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import StartsBox from "../../components/starts-box"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import { parseISO } from "date-fns"
import format from "date-fns/format"
import { useForm } from "react-hook-form"

type Props = {
  hotelInfo: any
}
const Booking: NextPage<{ hotelInfo }> = ({ hotelInfo }: Props) => {
  const router = useRouter()
  const { t } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
  ])
  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {
      clients: 1,
      rooms: 1,
    })

  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {}
  )

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

  const [showModal, setShowModal] = useState(false)
  const closeErrorModal = () => {
    setShowModal(false)
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    reValidateMode: "onChange",
    mode: "all",
  })

  const onSubmit = (data) => {
    if (isValid) {
      setGuestInfo(data)
      router.push({
        pathname: "/hotel/booking-paiement",
      })
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
          <section className="flex flex-col gap-4  ">
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
                  <span>2</span>
                </div>
                <div className="text-xxs font-bold text-white text-center">
                  {t("common:enter-data")}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="bg-primary text-white border border-solid border-white flex justify-center items-center w-10 h-10">
                  <span>3</span>
                </div>
                <div className="text-xxs font-bold text-white text-center">
                  {t("common:pay")}
                </div>
              </div>
            </div>
            <div className="w-full  pb-12 container mx-auto   gap-6 lg:px-12 relative grid grid-cols-3 ">
              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2">
                <h1 className="text-black text-3xl font-bold">
                  {t("common:enter-data")}
                </h1>

                <form
                  className="grid grid-cols-2 gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="rounded-none"
                      placeholder={t("input:first-name")}
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      name="lastName"
                      placeholder={t("input:last-name")}
                      id="lastName"
                      className="rounded-none"
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                    {errors.lastName?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>

                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="rounded-none"
                      placeholder={t("input:email")}
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                    />
                    {errors.email?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="rounded-none "
                      placeholder={t("input:phone-number")}
                      {...register("phone", { required: true, minLength: 6 })}
                    />
                    {errors.phone?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>

                  <h1 className="text-black text-3xl font-bold">
                    {t("booking:special-demands")}
                  </h1>

                  <label className="flex flex-col gap-4 col-span-2 ">
                    <textarea
                      className="h-36 rounded-none"
                      name="demandes"
                      placeholder={t("booking:special-demands-taxed")}
                      {...(register("demandes"),
                      { required: true, minLength: 6 })}
                    />
                  </label>

                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between col-span-2 ">
                    <button
                      className="btn btn-dark text-base lg:w-52"
                      type="submit"
                    >
                      {t("button:go-to-pay")}
                    </button>
                    <button
                      className="btn btn-secondary-outline text-base lg:w-52"
                      onClick={() => goBack()}
                    >
                      {t("button:review-order")}
                    </button>
                  </div>
                </form>
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
                      {choosenRoomStorage.clients}  {t("common:clients-word")}:
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pb-3 border-b border-solid border-dark gap-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">
                      {choosenRoomStorage.rooms} x
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
                    <span className="text-dark text-sm">
                    {t("common:TVA")}
                    </span>
                    <div className="text-black font-bold text-base">
                      {(
                        selectedRoomStorage.VAT * choosenRoomStorage.rooms
                      ).toFixed(2)}{" "}
                      {t("common:sar")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">
                      {t("common:period")}
                    </span>
                    <div className="text-black font-bold text-base">
                      {selectedRoomStorage.NbrNights} {t("common:nights-word")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-dark text-sm">{t("common:sum")}</span>
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
export default Booking
