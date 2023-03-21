import useSWR from "swr"

const fetcher = async (url) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.

  return await res.json()
}

export function useRoomsInfo() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/hotels/GetRoomsInfo/1`,
    fetcher
  )
  return {
    roomsInfo: data,
    isLoading: !error && !data,
    isError: error,
  }
}
