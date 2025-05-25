// app/api/schedules/route.ts  (새 일정 생성)
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
export async function POST(req: Request) {
    const { scheduled_at, location, public_scope, title, description } = await req.json()
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    const { data, error } = await supabase
        .from('schedules')
        .insert([{ organizer_id: session.user.id, title, description, scheduled_at, location, public_scope }])
        .select()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ schedule: data![0] }, { status: 201 })
}
