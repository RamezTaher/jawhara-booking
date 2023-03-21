import { useTranslation } from "next-i18next"
import Link from "next/link"
import Image from "next/image"
const Footer = () => {
  const { t }: { t: any } = useTranslation(["common", "button"])
  return (
    <footer className="w-full flex relative">
      <div className="bg-primary w-full">
        <div className="md:border-b border-primary border-solid ">
          <div className="container px-6 pt-7 pb-2 mx-auto flex justify-between flex-col lg:flex-row gap-6 md:gap-10 ">
            <div className="w-full lg:g:w-3/5 mb-5 lg:mb-0">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ">
                <Link href="/rooms" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:rooms")}
                  </h3>
                </Link>
                <Link href="/bookings" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:my-bookings")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:book-now")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:terms-conditions")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:privacy-policy")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:contact-us")}
                  </h3>
                </Link>
              </div>
            </div>
            <div className="flex flex-col lg:w-2/5 gap-5">
              <form>
                <label className="flex flex-col gap-4 col-span-2 relative">
                  <input
                    required
                    className="rounded-none placeholder:text-white border-white border boder-solid"
                    type="text"
                    name="topic"
                    id="topic"
                    placeholder={t("input:email")}
                  />
                  <div className="absolute left-0 top-0 h-full w-10 text-base cursor-pointer flex justify-center items-center bg-white font-bold">
                    <i className="icon-Group-20 text-primary"></i>
                  </div>
                </label>
              </form>
              <div className="flex justify-center lg:justify-end gap-4">
                <i className="icon-icons8-facebook text-white text-2xl cursor-pointer"></i>
                <i className="text-white icon-icons8-twitter text-2xl cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-white text-center py-2">
          &copy;<span>{new Date().getFullYear()}</span> jawharatalrasheed.com.
          All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
