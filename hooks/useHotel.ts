import useSWR from "swr"
import { fetcher } from "../utils/fetcher"

export function useHotel() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/Hotels/GetHotels/1`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return {
    hotel: data,
    isLoading: !error && !data,
    isError: error,
  }
}
