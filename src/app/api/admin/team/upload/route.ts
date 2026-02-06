import { NextRequest, NextResponse } from 'next/server'

const IMGBB_API_KEY = '93fb3524249e8f39be550a4b8804904e'
const IMGBB_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const file = form.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    const payload = new URLSearchParams()
    payload.append('image', base64)

    const res = await fetch(IMGBB_UPLOAD_URL, {
      method: 'POST',
      body: payload,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    const json = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: 'Upload failed', details: json }, { status: 500 })
    }

    return NextResponse.json({ url: json.data.url, thumb: json.data.thumb?.url })
  } catch (error) {
    console.error('IMGBB upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
