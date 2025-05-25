// app/api/schedules/[id]/rsvp/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(
    req: Request,
    { params }
) {
    const scheduleId = params.id
    const body = await req.json()
    const { status, name } = body as { status: string; name?: string }

    // status 검증
    if (!['accepted', 'declined'].includes(status)) {
        return NextResponse.json(
            { error: 'status는 accepted 또는 declined만 가능합니다.' },
            { status: 400 }
        )
    }

    const supabase = createClient()
    // 세션 가져오기
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession()
    if (sessionError) {
        return NextResponse.json(
            { error: '세션 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }

    const user = session?.user
    // 비회원일 때 이름 필수
    if (!user && !name) {
        return NextResponse.json(
            { error: '비회원은 이름을 입력해야 합니다.' },
            { status: 400 }
        )
    }

    // participants 테이블에 upsert
    const record: any = { schedule_id: scheduleId, status }
    if (user) record.user_id = user.id
    if (name) record.name = name

    const { data, error } = await supabase
        .from('participants')
        .upsert(record)
        .select()
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, participant: data![0] }, { status: 200 })
}
