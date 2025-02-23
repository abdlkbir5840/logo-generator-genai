"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserDeatilContext } from "../_context/UserDetailContext";
import axios from "axios";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleDollarSign, Download, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { userDetail } = useContext(UserDeatilContext);
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetail?.id) {
      console.log(userDetail);
      fetchUserLogos();
    }
  }, [userDetail]);

  const fetchUserLogos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/user?userId=${userDetail.id}`);
      setLogos(response.data);
    } catch (error) {
      console.error("Error fetching user logos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (logo) => {
    const link = document.createElement("a");
    link.href = logo.imageUrl;
    link.download = `${logo.title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (logoId) => {
    try {
      await axios.delete(`/api/user-logos/${logoId}`);
      setLogos(logos.filter((logo) => logo.id !== logoId));
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-primary">
          Hello {userDetail?.name}
        </h2>
        <div className="flex items-center gap-2">
          <CircleDollarSign className="text-yellow-500 font-bold text-2xl" />
          <h2 className="font-bold text-2xl">
            {userDetail.credits} Credits Left
          </h2>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl mt-6">Dashboard</h2>
        <Link href="/create">
          <Button>+ Create New Logo</Button>
        </Link>
      </div>
      {logos.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't generated any logos yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logos?.logos.map((logo) => (
            <Card key={logo.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold truncate">
                  {logo.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative h-48 w-full">
                  <Image
                    src={logo.image || "/placeholder.svg"}
                    alt={logo.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {logo.description}
                </p>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(logo)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(logo.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// export default function DashboardPage() {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//         <UserLogoDashboard />
//       </div>
//     )
//   }
