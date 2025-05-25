import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
    const { data, error } = await createClient
        .from('schedules')
        .select('*')
        .limit(5)

    if (error) {
        return NextResponse.json({ ok: false, error }, { status: 500 })
    }
    return NextResponse.json({ ok: true, data })
}
