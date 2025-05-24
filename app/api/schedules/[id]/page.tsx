// app/schedule/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabaseClient } from '@/utils/supabase/client'

export default function ScheduleDetailPage() {
    const { id } = useParams() as { id: string }
    const [schedule, setSchedule] = useState<any>(null)
    const [participants, setParticipants] = useState<any[]>([])
    const [name, setName] = useState('')
    const [status, setStatus] = useState<'accepted'|'declined'|'pending'>('pending')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // 일정 및 참가자 불러오기 + 로그인 상태 확인
    useEffect(() => {
        ;(async () => {
            // 일정 + 참가자
            const { data, error } = await supabaseClient
                .from('schedules')
                .select('*, participants(*)')
                .eq('id', id)
                .single()
            if (error) {
                setError('일정 정보를 불러오지 못했습니다.')
            } else {
                setSchedule(data)
                setParticipants(data.participants)
            }

            // 로그인 여부
            const {
                data: { session }
            } = await supabaseClient.auth.getSession()
            setIsLoggedIn(!!session?.user)
        })()
    }, [id])

    // RSVP 처리
    const handleRsvp = async (choice: 'accepted'|'declined') => {
        setLoading(true)
        setError(null)

        // 비회원이면 이름 필수
        if (!isLoggedIn && !name) {
            setError('이름을 입력해주세요.')
            setLoading(false)
            return
        }

        try {
            const body: any = { status: choice }
            if (!isLoggedIn) body.name = name

            const res = await fetch(`/api/schedules/${id}/rsvp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || '응답 처리 중 오류가 발생했습니다.')

            setStatus(choice)
            // 참가자 목록 갱신
            const { data: updated, error: updErr } = await supabaseClient
                .from('participants')
                .select('*')
                .eq('schedule_id', id)
            if (!updErr && updated) setParticipants(updated)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    if (!schedule) return <p>로딩 중...</p>

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-2">
                {schedule.title || schedule.location}
            </h1>
            <p className="text-sm text-gray-600">
                {new Date(schedule.scheduled_at).toLocaleString()}
            </p>
            {schedule.description && <p className="mt-4">{schedule.description}</p>}

            <h2 className="mt-6 text-lg font-semibold">참석자</h2>
            <ul className="list-disc pl-5 mb-4">
                {participants.map((p) => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>

            {status === 'pending' ? (
                <div className="space-y-2">
                    {!isLoggedIn && (
                        <input
                            type="text"
                            placeholder="이름을 입력하세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        onClick={() => handleRsvp('accepted')}
                        className="btn btn-success mr-2"
                        disabled={loading}
                    >
                        참여
                    </button>
                    <button
                        onClick={() => handleRsvp('declined')}
                        className="btn btn-error"
                        disabled={loading}
                    >
                        불참
                    </button>
                </div>
            ) : (
                <p className="mt-4">
                    응답: {status === 'accepted' ? '참여' : '불참'}
                </p>
            )}
        </div>
    )
}
