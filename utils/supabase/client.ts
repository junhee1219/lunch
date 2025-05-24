// utils/supabase/client.ts
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// 이 함수는 내부적으로 NEXT_PUBLIC_ 환경변수에서 URL과 ANON_KEY를 읽어와 세션 관리까지 처리해 줍니다.
export const supabaseClient = createClientComponentClient()
