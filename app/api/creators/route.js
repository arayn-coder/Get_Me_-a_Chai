import { NextResponse } from "next/server"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export async function GET() {
  try {
    await connectDb()

    const creators = await User.find({
      isCreator: true,
      username: { $exists: true, $ne: "" },
    })
      .select("name username profilepic coverpic createdAt")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      creators,
    })
  } catch (error) {
    console.error("CREATORS API ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch creators",
      },
      {
        status: 500,
      }
    )
  }
}