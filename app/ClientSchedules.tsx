// app/ClientSchedules.tsx  (홈에서 일정 목록 렌더링)
'use client'

import Link from 'next/link'
import { useState } from 'react'

type Props = {
    schedules: { id: string; title?: string; location: string; scheduled_at: string }[]
}

export default function ClientSchedules({ schedules: initial }: Props) {
    const [schedules] = useState(initial)

    return (
        <ul className="grid gap-4 md:grid-cols-2">
            {schedules.map((s) => (
                <li key={s.id}>
                    <div className="card bg-base-100 shadow hover:shadow-lg transition">
                        <div className="card-body">
                            <h2 className="card-title">{s.title || s.location}</h2>
                            <p className="text-sm text-gray-600">
                                {new Date(s.scheduled_at).toLocaleString()}
                            </p>
                            <Link
                                href={`/schedule/${s.id}`}
                                className="btn btn-sm btn-link mt-2"
                            >
                                자세히 보기
                            </Link>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
