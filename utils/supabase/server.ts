// utils/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

// createClient() 호출할 때마다,
// 최신 쿠키/헤더를 반영한 클라이언트 인스턴스를 리턴합니다.
export function createClient() {
    return createServerComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        cookies,
        headers,
    })
}
