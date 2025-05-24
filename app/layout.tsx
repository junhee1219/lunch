// app/layout.tsx
export const metadata = {
    title: '점심약속 스케줄러',
    description: '직장인 점심약속을 간편하게 관리하세요',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
        <body className="min-h-screen bg-gray-50">
        {/* 예: 공통 헤더 */}
        <header className="p-4 bg-white shadow">
            <h1 className="text-xl font-bold">점심약속</h1>
        </header>

        {/* 각 페이지 렌더링 위치 */}
        <main>{children}</main>

        {/* 예: 공통 푸터 */}
        <footer className="p-4 text-center text-sm text-gray-500">
            © 2025 LunchApp
        </footer>
        </body>
        </html>
    )
}
