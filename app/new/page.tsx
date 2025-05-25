// app/new/page.tsx  (새 일정 생성)
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewSchedulePage() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('12:00')
    const [location, setLocation] = useState('')
    const [scope, setScope] = useState<'link'|'private'>('link')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        const scheduled_at = new Date(`${date}T${time}`).toISOString()
        const res = await fetch('/api/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, scheduled_at, location, public_scope: scope }),
        })

        if (!res.ok) {
            const body = await res.json()
            setError(body.error || '알 수 없는 오류')
            setSubmitting(false)
            return
        }
        const { schedule } = await res.json()
        router.push(`/schedule/${schedule.id}`)
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">새 점심 일정 만들기</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">제목 (선택)</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="예: 팀 점심 회의"
                    />
                </div>
                <div>
                    <label className="block mb-1">설명 (선택)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        placeholder="간단한 메모를 남겨보세요"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block mb-1">날짜</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">시간</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-1">장소</label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="예: 회사 식당"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">공개 범위</label>
                    <select
                        value={scope}
                        onChange={(e) => setScope(e.target.value as any)}
                        className="select select-bordered w-full"
                    >
                        <option value="link">링크 소지자만</option>
                        <option value="private">나만 보기</option>
                    </select>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={submitting}
                >
                    {submitting ? '생성 중...' : '일정 생성'}
                </button>
            </form>
        </div>
    )
}
