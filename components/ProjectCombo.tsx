// components/ProjectCombo.tsx
"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  addDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Project {
  id: string;
  name: string;
}

interface ProjectComboProps {
  label: string;            // Firestore 컬렉션 이름으로도 사용
  initialItems?: Project[]; // 빈 컬렉션 시 처음 한 번만 시딩용
}

export default function ProjectCombo({ label, initialItems }: ProjectComboProps) {
  const [items, setItems] = useState<Project[]>([]);

  const colRef = collection(db, label);

  // 1) 초기 시딩
  useEffect(() => {
    if (!initialItems?.length) return;
    (async () => {
      const snap = await getDocs(colRef);
      if (snap.empty) {
        for (const item of initialItems) {
          await addDoc(colRef, { name: item.name });
        }
      }
    })();
  }, [colRef, initialItems]);

  // 2) 실시간 구독
  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        name: d.data().name as string,
      }));
      setItems(data);
    });
    return () => unsub();
  }, [colRef]);

  // 3) 삭제 핸들러
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, label, id));
  };

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-lg font-semibold">{label}</label>
      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-2 bg-white rounded shadow-sm"
            >
              <span>{p.name}</span>
              <button
                onClick={() => handleDelete(p.id)}
                aria-label={`Delete ${p.name}`}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">등록된 프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
