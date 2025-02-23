"use client"

import { useContext, useEffect, useState } from "react"
import { UserDeatilContext } from "../_context/UserDetailContext"
import Prompt from "../_data/Prompt"
import axios from "axios"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, RefreshCw } from "lucide-react"

function GenerateLogo() {
  const { userDetail } = useContext(UserDeatilContext)
  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(false)
  const [logoImage, setLogoImage] = useState()

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData")
      if (storage) {
        const parsedData = JSON.parse(storage)
        setFormData(parsedData)
      }
    }
  }, [userDetail])

  useEffect(() => {
    if (formData?.title) {
      generateAILogo()
    }
  }, [formData])

  const generateAILogo = async () => {
    setLoading(true)
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt)

    try {
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        title: formData?.title,
        desc: formData?.desc,
        userId: userDetail?.id,
      })
      setLogoImage(result.data?.image)
    } catch (error) {
      console.error("Error generating logo:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (logoImage) {
      const link = document.createElement("a")
      link.href = logoImage
      link.download = `${formData?.title || "generated"}_logo.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-28">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Generated Logo</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {loading ? (
          <Skeleton className="w-64 h-64 rounded-lg" />
        ) : logoImage ? (
          <div className="relative w-64 h-64">
            <Image
              src={logoImage || "/placeholder.svg"}
              alt="Generated logo"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500">No logo generated yet</p>
          </div>
        )}
        <div className="flex space-x-2">
          <Button onClick={generateAILogo} disabled={loading || !formData?.title}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
          <Button onClick={handleDownload} disabled={!logoImage} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default GenerateLogo

