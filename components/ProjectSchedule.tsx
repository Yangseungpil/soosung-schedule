"use client";

import { useState, useEffect } from 'react';

const 진행프로젝트들 = [
  '축산 이주단지(설계 PM)', '서울영등포(계획 PM)', '서울 A지구(설계 PM)', '고양창릉(유신 PM)',
  '전주 역세권(경동 PM)', '화성어천(경동 PM)', '광주송정역(도화 PM)', '양주테크노(KG PM)',
  '나주에너지국가산단(설계 PM)', '석수역도시개발사업(설계 PM)', '양산덕계지구(설계 PM)',
  '과천과천지구(경동 PM)', '아산모종샛들지구(도화 PM)', '농진청 6지구(도화 PM)',
  '남양주왕숙(진건)지구(경동 PM)', '강릉국가산업단지(설계 PM)', '서안양스마트밸리(설계 PM)'
];

const 관리프로젝트들 = [
  '당진기지(계획 PM)', '광주선운2(계획 PM)', '황해 포승지구(계획 PM)', '은남산단(KG PM)',
  '청주지북(동부 PM)', '하남미사(도화 PM)', '과천주암(도화 PM)', '광명시흥(동명 PM)',
  '부천대장(설계 PM)', '고양일산테크노밸리(설계 PM)', '효행지구(도화 PM)', '밀레니엄타운(KG PM)'
];

const fontColor = (text) => /설계 PM|계획 PM/.test(text) ? 'text-blue-500' : 'text-black';
const 담당자들 = ['황인호 차장', '함다올 과장', '박건희 대리', '김성환 사원', '양형준 사원'];
const 특이사항옵션 = ['감독 전화 요망', '출장 후 복귀 요망', '야근 요망', '기타 입력'];

export default function ProjectSchedule() {
  const [projectJ, setProjectJ] = useState('');
  const [projectM, setProjectM] = useState('');
  const [manager, setManager] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('schedule');
    if (saved) setSchedule(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  const addSchedule = () => {
    const project = projectJ || projectM;
    if (project && manager && date) {
      const finalNote = note === '기타 입력' ? customNote : note;
      const newEntry = { project, manager, date, note: finalNote };
      if (editingIndex !== null) {
        const updated = [...schedule];
        updated[editingIndex] = newEntry;
        setSchedule(updated);
        setEditingIndex(null);
      } else {
        setSchedule([...schedule, newEntry]);
      }
      setProjectJ('');
      setProjectM('');
      setManager('');
      setDate('');
      setNote('');
      setCustomNote('');
    }
  };

  const deleteSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const editSchedule = (index) => {
    const entry = schedule[index];
    setProjectJ(진행프로젝트들.includes(entry.project) ? entry.project : '');
    setProjectM(관리프로젝트들.includes(entry.project) ? entry.project : '');
    setManager(entry.manager);
    setDate(entry.date);
    setNote(entry.note);
    setCustomNote(entry.note);
    setEditingIndex(index);
  };

  const filteredSchedule = schedule.filter(s =>
    s.project.includes(filter) || s.manager.includes(filter) || s.date.includes(filter) || s.note.includes(filter)
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">◎ 도시설계부 프로젝트 관리</h1>
      <div className="space-y-2">
        <label className="font-semibold">진행 프로젝트명</label>
        <select className="border p-2 rounded w-full" value={projectJ} onChange={e => setProjectJ(e.target.value)}>
          <option value="">선택하세요</option>
          {진행프로젝트들.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>

        <label className="font-semibold">관리 프로젝트명</label>
        <select className="border p-2 rounded w-full" value={projectM} onChange={e => setProjectM(e.target.value)}>
          <option value="">선택하세요</option>
          {관리프로젝트들.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>

        <label className="font-semibold">담당자</label>
        <select className="border p-2 rounded w-full" value={manager} onChange={e => setManager(e.target.value)}>
          <option value="">담당자 선택 (본사)</option>
          {담당자들.map((name, idx) => (
            <option key={idx} value={name}>{name}</option>
          ))}
        </select>

        <label className="font-semibold">날짜</label>
        <input type="date" className="border p-2 rounded w-full" value={date} onChange={e => setDate(e.target.value)} />

        <label className="font-semibold">업무 및 특이사항</label>
        <select className="border p-2 rounded w-full" value={note} onChange={e => setNote(e.target.value)}>
          <option value="">특이사항 선택</option>
          {특이사항옵션.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
        {note === '기타 입력' && (
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="기타 특이사항 입력"
            value={customNote}
            onChange={e => setCustomNote(e.target.value)}
          />
        )}
        <button onClick={addSchedule} className="bg-blue-500 text-white p-2 rounded w-full">
          {editingIndex !== null ? '일정 수정' : '일정 추가'}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">등록된 일정</h2>
        <input
          type="text"
          className="border p-2 rounded w-full mb-4"
          placeholder="검색어 입력 (프로젝트명, 담당자, 날짜, 특이사항)"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        {filteredSchedule.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-2 border rounded mb-2">
            <span className={`${fontColor(item.project)} font-medium`}>{item.project}</span>
            <span>{item.manager}</span>
            <span>{item.date}</span>
            <span>{item.note}</span>
            <div className="space-x-2">
              <button onClick={() => editSchedule(idx)} className="text-yellow-500">수정</button>
              <button onClick={() => deleteSchedule(idx)} className="text-red-500">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
