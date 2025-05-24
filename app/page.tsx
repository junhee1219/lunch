// app/page.tsx
import Link from 'next/link'
import ClientSchedules from './ClientSchedules'
import { createClient } from '@/utils/supabase/server'

// Next.js App Router의 서버 컴포넌트이므로,
// useEffect 등 훅 없이 직접 await 처리 가능합니다.
export default async function HomePage() {
    // 1) 최신 쿠키/헤더 반영된 인스턴스 생성
    const supabase = createClient()

    // 2) 데이터 조회
    const { data: schedules, error } = await supabase
        .from('schedules')
        .select('*')
        .limit(5)

    if (error) {
        return <p>일정 조회 중 오류가 발생했습니다.</p>
    }

    // 3) 여러 컴포넌트를 반환할 땐 Fragment로 감싸기
    return (
        <>
            <ClientSchedules schedules={schedules || []} />
            <div className="p-8">
                <Link href="/new" className="btn btn-primary">
                    + 새 일정
                </Link>
            </div>
        </>
    )
}
