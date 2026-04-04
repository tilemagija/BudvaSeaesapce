import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { groq } from 'next-sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Raw query without any filters
    const all = await client.fetch(groq`*[_type == "tour"] { _id, title, isActive }`)
    return NextResponse.json({ ok: true, count: all.length, tours: all })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
