// app/api/schedules/[id]/rsvp/route.ts  (참여/불참)
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
export async function POST(req: Request, { params }: { params: { id: string } }) {
    const scheduleId = params.id
    const { status, name } = await req.json()
    if (!['accepted','declined'].includes(status)) {
        return NextResponse.json({ error: '잘못된 상태' }, { status: 400 })
    }
    const supabase = createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (!session?.user && !name) {
        return NextResponse.json({ error: '비회원은 이름을 입력해야 합니다.' }, { status: 400 })
    }
    const record: any = { schedule_id: scheduleId, status }
    if (session?.user) record.user_id = session.user.id
    if (name) record.name = name
    const { data, error } = await supabase.from('participants').upsert(record).select()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true, participant: data![0] })
}
