'use client'  // ← 이 파일은 클라이언트에서만 동작

import { useState } from 'react'

type Props = {
    schedules: { id: string; title: string; scheduled_at: string }[]
}

export default function ClientSchedules({ schedules: initial }: Props) {
    const [schedules] = useState(initial)

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">최근 점심 일정</h1>
            <ul className="mt-4 space-y-2">
                {schedules.map((s) => (
                    <li key={s.id} className="card p-4">
                        <h2>{s.title || s.location}</h2>
                        <p>{new Date(s.scheduled_at).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}
