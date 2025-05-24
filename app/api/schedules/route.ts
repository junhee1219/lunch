// app/api/schedules/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'

export async function POST(req: Request) {
    const body = await req.json()

    // 1) 함수 호출로 인스턴스 생성
    const supabase = createClient()

    // 2) 필수 필드 체크, 세션 확인
    const { scheduled_at, location, public_scope, title, description } = body
    if (!scheduled_at || !location || !public_scope) {
        return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 })
    }

    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    if (!user) {
        return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }

    // 3) 삽입
    const { data, error } = await supabase
        .from('schedules')
        .insert([{
            organizer_id: user.id,
            title,
            description,
            scheduled_at,
            location,
            public_scope,
        }])
        .select()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ schedule: data![0] }, { status: 201 })
}
