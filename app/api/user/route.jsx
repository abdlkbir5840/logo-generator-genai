import prisma from "@/app/config/db";
import { NextResponse } from "next/server";


export async function POST(req){
 try {
    const {userEmail, userName} = await req.json()
    console.log("POST", userEmail, userName);
    const existingUser = await prisma.user.findUnique({
        where:{email: userEmail}
    })

    if(!existingUser){
        const newUser = await prisma.user.create({
            data:{
                name: userName,
                email: userEmail
            }
        })
        return NextResponse.json(newUser, { status: 201 })
    }
    return NextResponse.json(existingUser, { status: 200 })
 } catch (error) {
    console.error(error)
    return NextResponse.json({error: "An error occurred"}, { status: 500 })
    
 }
}

export async function GET(req) {
    try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          logos: true, 
        },
      });
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }