'use client'

import toast from 'react-hot-toast'
import { BiSolidCircleThreeQuarter } from 'react-icons/bi'
import { PiCopy } from 'react-icons/pi'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import axios from 'axios'

export default function Home() {
  const [shortUrl, setShortUrl] = useState('')
  const [url, setUrl] = useState('')
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (theme === null) return null

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateUrl(url)) {
      toast.error('Invalid URL')
      return
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/links`,
        { url }
      )
      const data = response.data
      const short = data.data.short
      console.log('data: ', data)
      console.log('short: ', short)
      setShortUrl(`http://localhost:3000/${short}`)
    } catch (error) {
      toast.error('Error shortening URL')
      console.error(error)
    }

    toast.success('URL shortened successfully!')
  }

  const validateUrl = (url: string) => {
    const regex = new RegExp(
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
    )
    return regex.test(url)
  }

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
      toast.success('Copied to clipboard')
    }
  }

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-gray-950 min-h-screen">
        <div className="flex flex-col">
          <div className="flex flex-row items-center py-5 px-12">
            <div className="flex flex-row items-center space-x-6">
              <BiSolidCircleThreeQuarter className="text-2xl scale-x-[-1] rotate-90 dark:text-white" />
              <p className="text-xl font-semibold dark:text-white">ChopLink</p>
            </div>
            <button
              onClick={toggleTheme}
              className="absolute right-14 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300"
            >
              {theme === 'dark' ? (
                <MdOutlineLightMode className="text-2xl text-white" />
              ) : (
                <MdOutlineDarkMode className="text-2xl text-black" />
              )}
            </button>
          </div>
          <hr className="border-[1px]" />
        </div>

        <div className="flex flex-col items-center gap-8 py-14">
          <div className="flex flex-col space-y-4 w-[570px]">
            <p className="text-4xl font-semibold dark:text-white">
              Shorten your link
            </p>
            <p className="font-light text-[#637587]">
              Create a shortened URL for easy sharing
            </p>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <p className="dark:text-white">Paste your URL here</p>
              <form
                className="flex flex-row items-center space-x-6"
                onSubmit={handleShorten}
              >
                <input
                  className="bg-[#F0F2F5] dark:bg-[#293038] text-gray-500 dark:text-[#9EABB8] p-4 rounded-xl w-[450px]"
                  type="text"
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex flex-row justify-center items-center rounded-xl bg-[#1A80E5] w-24 h-[50px]"
                >
                  <p className="text-lg text-white">Chop it!</p>
                </button>
              </form>
            </div>

            {shortUrl && (
              <div className="flex flex-col space-y-6">
                <p className="text-xl font-semibold dark:text-white">
                  Your short link
                </p>
                <div className="flex flex-col space-y-2">
                  <p className="text-lg dark:text-white">Shortened URL</p>
                  <div className="flex flex-row">
                    <input
                      className="bg-[#F0F2F5] dark:bg-[#293038] text-gray-500 dark:text-[#9EABB8] p-4 rounded-xl w-[450px]"
                      readOnly
                      type="text"
                      value={shortUrl}
                    />
                    <button
                      className="relative right-11 text-gray-500 hover:text-gray-800"
                      onClick={handleCopy}
                    >
                      <PiCopy className="text-3xl " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
