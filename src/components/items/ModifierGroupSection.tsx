"use client";

import type { ModGroup } from "@/types/menu";
import {
  getGroupSelectionLabel,
  isModifierSelected,
  type ModifierSelections,
} from "@/lib/menu/modifiers";
import ModifierRow from "./ModifierRow";

interface Props {
  group: ModGroup;
  lang?: "en" | "ar";
  selections: ModifierSelections;
  onToggle: (groupId: string, modifierId: string) => void;
  scrollable?: boolean;
}

export default function ModifierGroupSection({
  group,
  lang = "en",
  selections,
  onToggle,
  scrollable = false,
}: Props) {
  const title = lang === "ar" ? group.titleUn : group.title;
  const availableModifiers = (group.modifiers ?? []).filter(
    (modifier) => modifier.isAvailable,
  );

  if (!group.isAvailable || !availableModifiers.length) {
    return null;
  }

  return (
    <section className="border-b border-dashed border-gray-200 py-4 last:border-b-0">
      <h2 className="text-base font-bold text-[#1d4744]">{title}</h2>
      <p className="mt-0.5 text-xs text-gray-400">
        {getGroupSelectionLabel(group)}
      </p>

      <div
        className={`mt-2 divide-y divide-gray-100 ${
          scrollable ? "max-h-48 overflow-y-auto pr-1 scrollbar-thin" : ""
        }`}
      >
        {availableModifiers.map((modifier) => (
          <ModifierRow
            key={modifier._id}
            modifier={modifier}
            lang={lang}
            isSelected={isModifierSelected(
              selections,
              group._id,
              modifier._id,
            )}
            onToggle={() => onToggle(group._id, modifier._id)}
          />
        ))}
      </div>
    </section>
  );
}
