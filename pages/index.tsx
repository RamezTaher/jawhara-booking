import type { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Layout from "../components/layout"
import nextI18NextConfig from "../i18n/next-i18next.config.js"
import HotelSearch from "../components/hotels-search"
import Image from "next/image"
import StartsBox from "../components/starts-box"
import { useState } from "react"
import { useRouter } from "next/router"
import { useLocalStorage } from "react-use"

import HeadSeo from "../components/HeadSeo"
import siteMetadata from "../data/siteMetadata"
import ModalError from "../components/ModalError"
import { useForm } from "react-hook-form"

const Home: NextPage<{}> = () => {
  const { t } = useTranslation(["common", "home", "button", "validation"])

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
      console.log(data)
    } else {
      setShowModal(true)
    }
  }

  const router = useRouter()
  const [service, setService] = useState("restaurant")
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {}
  )
  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel", {})

  const [showModal, setShowModal] = useState(false)
  const handleGoToSearch = (data) => {
    if (true) {
      router.push({
        pathname: "hotel/search",
        query: data,
      })
      removeChosenRoomsStorage()
      removeChosenHotelStorage()
      removeGuestInfo()
      removeSelectedHotelStorage()
    } else {
      setShowModal(true)
    }
  }
  return (
    <>
      <HeadSeo
        title={t("home:jawharat-al-rashid")}
        description={t("home:jawharat-al-rashid")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <section className="bg-hero-pattern bg-cover bg-center relative w-screen h-screen flex justify-center items-center">
          <div className="container pt-10 sm:mx-auto px-6 xl:px-16">
            <div className="hidden lg:block">
              <h1 className="font-light text-xl text-center text-white mb-6 ">
                {t("home:jawharat-al-rashid")}
              </h1>
              <h1 className="font-bold text-5xl text-center px-20 text-white mb-[100px]">
                {t("home:best-hotels-best-location")}
              </h1>
            </div>

            <HotelSearch goToSearch={handleGoToSearch} />
          </div>
        </section>
        <section className="relative py-20 lg:py-28">
          <div className="lg:flex lg:container md:px-6 xl:px-16 lg:mx-auto justify-end">
            <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] bg-[url('/images/section_1_pic.jpg')] bg-cover bg-center lg:-ml-10 lg:-mt-10 lg:mb-10 z-[5]"></div>
            <div className="p-9 bg-primary text-white flex flex-col gap-9 lg:w-1/2 lg:pr-20 ">
              <h1 className="text-3xl font-bold">
                {t("home:jawharat-al-rashid")}
              </h1>
              <p className="text-base">{t("home:home-paragraph")}</p>
              <button className="btn btn-secondary-primary text-lg font-semibold ">
                {t("button:contact-us")}
              </button>
            </div>
          </div>
        </section>

        <section className=" py-8">
          <div className="container xl:px-16  sm:mx-auto flex flex-col gap-8 lg:flex-row">
            <div className="px-9 lg:w-1/2 lg:pb-10">
              <h1 className="text-black font-bold text-3xl lg:text-5xl mb-8 lg:mb-12">
                {t("home:on-services")}
              </h1>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {service === "restaurant" && (
                      <div className="w-6 h-1 bg-primary"></div>
                    )}

                    <h1
                      onClick={() => {
                        setService("restaurant")
                      }}
                      className={`text-base lg:text-2xl font-bold ${
                        service === "restaurant" ? "text-primary" : "text-dark"
                      } cursor-pointer`}
                    >
                      {t("home:restaurant")}
                    </h1>
                  </div>
                  {service === "restaurant" && (
                    <div className="text-black text-base lg:text-lg">
                      {t("home:restaurant-paragraph")}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {service === "cafe" && (
                      <div className="w-6 h-1 bg-primary"></div>
                    )}
                    <h1
                      onClick={() => {
                        setService("cafe")
                      }}
                      className={`text-base lg:text-2xl font-bold ${
                        service === "cafe" ? "text-primary" : "text-dark"
                      } cursor-pointer`}
                    >
                      {" "}
                      {t("home:cafe")}
                    </h1>
                  </div>
                  {service === "cafe" && (
                    <div className="text-black text-base lg:text-lg">
                      {t("home:cafe-paragraph")}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {service === "rooms" && (
                      <div className="w-6 h-1 bg-primary"></div>
                    )}
                    <h1
                      onClick={() => {
                        setService("rooms")
                      }}
                      className={`text-base lg:text-2xl font-bold ${
                        service === "rooms" ? "text-primary" : "text-dark"
                      } cursor-pointer `}
                    >
                      {t("home:rooms")}
                    </h1>
                  </div>
                  {service === "rooms" && (
                    <div className="text-black lg:text-lg text-base">
                      {t("home:rooms-paragraph")}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-80 lg:h-auto lg:w-1/2">
              {service === "restaurant" && (
                <div className="w-full bg-cover h-full bg-[url('/images/restaurant.jpg')]"></div>
              )}
              {service === "cafe" && (
                <div className="w-full bg-cover h-full bg-[url('/images/cafe.jpg')]"></div>
              )}
              {service === "rooms" && (
                <div className="w-full bg-cover h-full bg-[url('/images/rooms.jpg')]"></div>
              )}
            </div>
          </div>
        </section>

        <section className=" py-8">
          <div className="container px-9 xl:px-16  sm:mx-auto   ">
            <h1 className="text-black font-bold text-3xl lg:text-5xl mb-8 lg:mb-12">
              {t("home:photos")}
            </h1>
            <div className="h-[950px] lg:h-[400px] w-fill  grid lg:grid-rows-2 grid-rows-6 grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-0">
              <div className="bg-[url('/images/photo-1.jpg')] bg-cover bg-center col-span-1 row-span-2 lg:m-1"></div>
              <div className="bg-[url('/images/photo-2.jpg')] bg-cover bg-center  col-span-1 row-span-1 lg:m-1"></div>
              <div className="bg-[url('/images/photo-3.jpg')] bg-cover bg-center  col-span-1 row-span-1 lg:row-span-2 lg:m-1"></div>
              <div className="bg-[url('/images/photo-4.jpg')] bg-cover bg-center col-span-1 row-span-2 lg:m-1"></div>
            </div>
          </div>
        </section>

        <section className=" py-8 pb-16 lg:pb-28">
          <div className="container px-9 xl:px-16  sm:mx-auto   ">
            <h1 className="text-black font-bold text-3xl lg:text-5xl mb-8 lg:mb-12 text-center">
              {t("home:call-us")}
            </h1>
            <div className="flex flex-col lg:flex-row gap-4">
              <form
                className="grid grid-cols-2 gap-4 lg:w-1/2 lg:order-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                  <input
                    type="text"
                    className="rounded-none"
                    placeholder={t("input:first-name")}
                    name="firstName"
                    id="firstName"
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
                    className="rounded-none"
                    type="text"
                    name="lastName"
                    placeholder={t("input:last-name")}
                    id="lastName"
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
                <label className="flex flex-col gap-4 col-span-2 ">
                  <input
                    className="rounded-none"
                    type="email"
                    name="email"
                    id="email"
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
                <label className="flex flex-col gap-4 col-span-2 ">
                  <input
                    className="rounded-none"
                    type="text"
                    name="topic"
                    id="topic"
                    placeholder={t("input:topic")}
                    {...register("topic", { required: true, minLength: 6 })}
                  />
                  {errors.topic?.type === "required" && (
                    <div className="text-danger">
                      {t("validation:fill-all-fields")}
                    </div>
                  )}
                </label>
                <label className="flex flex-col gap-4 col-span-2 ">
                  <textarea
                    className="h-36 rounded-none"
                    placeholder={t("input:letter")}
                    name="letter"
                    id="letter"
                    {...(register("letter"), { required: true, minLength: 6 })}
                  />
                  {errors.letter?.type === "required" && (
                    <div className="text-danger">
                      {t("validation:fill-all-fields")}
                    </div>
                  )}
                </label>
                <button className="btn btn-primary col-span-2" type="submit">
                  {t("button:contact-us")}
                </button>
              </form>
              <div className=" lg:w-1/2 flex flex-col justify-start">
                <div className="h-[400px] lg:h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.561052759277!2d39.602747015353806!3d24.46600996697758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbf05d3ff8731%3A0x9674de593c9354d2!2sJawharat%20Al%20Rasheed%20Hotel!5e0!3m2!1sen!2stn!4v1654096155487!5m2!1sen!2stn"
                    className="w-full h-full"
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="p-4 bg-primary text-white text-xs  font-[400] grid grid-cols-1 lg:grid-cols-2 gap-4 z-[2] -mt-10 ml-5 -mr-5">
                  <div className="flex items-center gap-4 col-span-1">
                    <div> {t("home:phone")}</div>
                    <div>00 966 148 191 111</div>
                  </div>
                  <div className="flex items-center gap-4 col-span-1">
                    <div> {t("home:fax")}</div>
                    <div>00 966 148 192 323</div>
                  </div>
                  <div className="flex items-center gap-4 col-span-1">
                    <div> {t("home:whatsup")}</div>
                    <div>00 966 549 179 848</div>
                  </div>
                  <div className="flex items-center gap-4 col-span-1">
                    <div> {t("home:whatsup")}</div>
                    <div>00 966 549 179 833</div>
                  </div>
                  <div className="flex items-center gap-4 col-span-1 lg:col-span-2">
                    <div> {t("home:email")}</div>
                    <div>alrasheedjawharat@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={() => setShowModal(false)}
          />
        )}
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation"],
        nextI18NextConfig
      )),
    },
  }
}
export default Home
