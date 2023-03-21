import { GetStaticProps, NextPage, GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import Layout from "../../components/layout"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Pagination from "../../components/pagination"
import { useState } from "react"

import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import SortDrop from "../../components/sort-drop"
import ReservationState from "../../components/ReservationState"
import { useBookings } from "../../hooks/useBookings"
import { useLocalStorage } from "react-use"
import { useRouter } from "next/router"

type Hotel = {
  Adress: string
  AdressAr: string
  DefaultPicture: string
  Stars: number
  Name: string
  NameAr: string
  Slug: string
}

const Hotels: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation(["common", "button", "home", "input", "search"])

  const [form, setForm] = useState({
    email: "",
    num: "",
  })
  const onChangeForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <>
      <HeadSeo
        title={t("common:my-bookings")}
        description={t("home:jawharat-al-rashid")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-secondary-tint pt-16 lg:pt-20 h-screen">
          <section className="relative pt-10">
            <div className="container md:mx-auto relative flex flex-col lg:flex-row gap-5">
              <div className="p-6 lg:px-12 py-20 flex flex-col gap-8 lg:gap-8 lg:w-1/2">
                <h1 className="text-black font-bold text-2xl lg:text-[40px]">
                  {t("common:search-for-your-booking")}
                </h1>
                <form className="flex flex-col gap-4 items-end">
                  <label className="flex flex-col gap-4 w-full  ">
                    <input
                      type="text"
                      required
                      name="firstName"
                      id="firstName"
                      className="rounded-none"
                      placeholder={t("input:booking-num")}
                      value={form.num}
                      onChange={(e) => onChangeForm(e)}
                    />
                  </label>
                  <label className="flex flex-col gap-4 w-full  ">
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder={t("input:email")}
                      id="email"
                      className="rounded-none"
                      value={form.email}
                      onChange={(e) => onChangeForm(e)}
                    />
                  </label>
                  <button className="btn btn-dark lg:w-48">
                    {t("input:search")}
                  </button>
                </form>
                <div className="flex flex-col gap-5">
                  <h1 className="text-black text-sm font-bold">
                    {t("common:dont-know-num")}
                  </h1>
                  <p className="text-black text-sm">
                    {t("common:dont-know-num-paragraph")}{" "}
                  </p>
                </div>
              </div>
              <div className="bg-[url('/images/bookings_pic.jpg')] bg-cover bg-center w-full lg:w-1/2 h-[340px] lg:h-auto"></div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "search"],
        nextI18NextConfig
      )),
    },
  }
}
export default Hotels
