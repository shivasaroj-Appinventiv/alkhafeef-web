"use client";

import { MapPin } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function StoreSearch({ value, onChange }: Props) {
  return (
    <div className="relative">
      <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Store"
        className="h-14 w-full rounded-xl border border-[#d9cdbd] bg-white pl-12 pr-4 text-sm outline-none focus:border-[#f26a21]"
      />
    </div>
  );
}