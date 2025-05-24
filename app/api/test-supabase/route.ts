import { NextResponse } from 'next/server'
import { supabaseServer } from '@/utils/supabase/server'

export async function GET() {
    const { data, error } = await supabaseServer
        .from('schedules')
        .select('*')
        .limit(5)

    if (error) {
        return NextResponse.json({ ok: false, error }, { status: 500 })
    }
    return NextResponse.json({ ok: true, data })
}
