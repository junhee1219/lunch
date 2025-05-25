// app/page.tsx  (홈 대시보드)
import Link from 'next/link'
import ClientSchedules from './ClientSchedules'
import { createClient } from '@/utils/supabase/server'

export default async function HomePage() {
    const supabase = createClient()
    const { data: schedules, error } = await supabase
        .from('schedules')
        .select('*')
        .limit(5)

    if (error) {
        return <p>일정 조회 중 오류가 발생했습니다.</p>
    }

    return (
        <>
            <ClientSchedules schedules={schedules || []} />
            <div className="p-8 text-center">
                <Link href="/new" className="btn btn-primary">
                    + 새 일정 만들기
                </Link>
            </div>
        </>
    )
}
