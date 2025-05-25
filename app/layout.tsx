// app/layout.tsx
import './globals.css' // Tailwind 의 전역 CSS
import Link from 'next/link'

export const metadata = {
    title: '🍽️ LunchApp',
    description: '직장인 점심약속 스케줄러',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko" data-theme="lunchapp">
        <body className="min-h-screen bg-neutral">
        {/* 네비게이션 바 */}
        <nav className="bg-base-100 shadow-md">
            <div className="container mx-auto flex items-center px-4 py-3">
                <Link href="/" className="text-xl font-bold mr-6">
                    🍽️ LunchApp
                </Link>
                <Link href="/new" className="btn btn-sm btn-outline mr-4">
                    새 일정
                </Link>
                <Link href="/signup" className="mr-4">
                    회원가입
                </Link>
                <Link href="/login">로그인</Link>
            </div>
        </nav>

        {/* 메인 컨텐츠 영역 */}
        <main className="container mx-auto p-4">{children}</main>

        {/* 푸터 */}
        <footer className="text-center text-sm text-gray-500 py-4">
            © 2025 LunchApp. All rights reserved.
        </footer>
        </body>
        </html>
    )
}
