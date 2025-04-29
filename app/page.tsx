// app/page.tsx
import ProjectCombo from '@/components/ProjectCombo'

export default function HomePage() {
  // 초기 보여줄 항목 데이터
  const 진행목록 = [
    { id: '1', name: 'API 서버 개발' },
    { id: '2', name: 'UI 리팩터링' },
  ]
  const 관리목록 = [
    { id: 'a', name: '백로그 정리' },
    { id: 'b', name: '버전 관리' },
  ]

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProjectCombo label="진행 프로젝트" initialItems={진행목록} />
      <ProjectCombo label="관리 프로젝트"  initialItems={관리목록} />
    </main>
  )
}
