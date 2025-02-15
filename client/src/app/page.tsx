'use client'

import toast from 'react-hot-toast'
import { BiSolidCircleThreeQuarter } from 'react-icons/bi'
import { PiCopy } from 'react-icons/pi'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [shortUrl, setShortUrl] = useState('')
  const [url, setUrl] = useState('')

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
      setShortUrl(`https://localhost:3000/${short}`)
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
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-6 py-5 px-12">
            <BiSolidCircleThreeQuarter className="text-2xl scale-x-[-1] rotate-90" />
            <p className="text-xl font-semibold">ChopLink</p>
          </div>
          <hr className="border-[1px]" />
        </div>

        <div className="flex flex-col gap-8 px-48 py-14">
          <div className="flex flex-col space-y-4">
            <p className="text-4xl font-semibold">Shorten your link</p>
            <p className="font-light text-[#637587]">
              Create a shortened URL for easy sharing
            </p>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <p className="">Paste your URL here</p>
              <form
                className="flex flex-row items-center space-x-6"
                onSubmit={handleShorten}
              >
                <input
                  className="bg-[#F0F2F5] p-4 rounded-xl w-[450px]"
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
                <p className="text-xl font-semibold">Your short link</p>
                <div className="flex flex-col space-y-2">
                  <p className="text-lg">Shortened URL</p>
                  <div className="flex flex-row">
                    <input
                      className="bg-[#F0F2F5] p-4 rounded-xl w-[450px]"
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
