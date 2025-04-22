'use client'

import { useState } from 'react'

interface Task {
  date: string
  project: string
  person: string
  note: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [form, setForm] = useState<Task>({
    date: '',
    project: '',
    person: '',
    note: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTasks(prev => [...prev, form])
    setForm({ date: '', project: '', person: '', note: '' })
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🗓 일정 입력</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />
        <input name="project" placeholder="프로젝트명" value={form.project} onChange={handleChange} className="border p-2 rounded" />
        <input name="person" placeholder="담당자" value={form.person} onChange={handleChange} className="border p-2 rounded" />
        <select name="note" value={form.note} onChange={handleChange} className="border p-2 rounded">
          <option value="">특이사항 선택</option>
          <option value="감독 전화 요망">감독 전화 요망</option>
          <option value="출장 후 복귀 요망">출장 후 복귀 요망</option>
          <option value="야근 요망">야근 요망</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">일정 추가</button>
      </form>

      <h2 className="text-lg font-semibold mb-2">📋 입력된 일정</h2>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li key={i} className="border rounded p-2">
            <p>📅 <strong>{task.date}</strong></p>
            <p>📁 {task.project}</p>
            <p>👤 <span className={task.person.includes('최대리') ? 'text-blue-600 font-bold' : ''}>{task.person}</span></p>
            <p>📝 {task.note}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
