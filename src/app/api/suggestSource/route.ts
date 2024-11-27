import { NextResponse } from "next/server";
import axios from "axios";

const REVIEW_APP_URL = process.env.REVIEW_APP_URL;

export async function POST(request: Request) {
  try {
    const { title, media, targetRepository } = await request.json();

    const response = await axios.post(
      `${REVIEW_APP_URL}/api/github/suggestSource`,
      {
        title,
        media,
        targetRepository,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error suggesting source:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      return NextResponse.json(
        { message: errorMessage },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        {
          message: "An unexpected error occurred while suggesting the source",
        },
        { status: 500 }
      );
    }
  }
}
