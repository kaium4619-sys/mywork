import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  
  const url = date
    ? `${BASE_URL}/matches?date=${date}`
    : `${BASE_URL}/matches`;

  try {
    const res = await fetch(url, {
      headers: { "X-Auth-Token": API_KEY || "" },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      return NextResponse.json({ matches: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json({ matches: [] });
  }
}
