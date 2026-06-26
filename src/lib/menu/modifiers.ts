import type { ModGroup } from "@/types/menu";

export type ModifierSelections = Record<string, string[]>;

export function getGroupSelectionLabel(group: ModGroup) {
  const optionCount = (group.modifiers ?? []).filter((m) => m.isAvailable).length;
  return `Select ${group.maximum} out of ${optionCount} Options`;
}

export function toggleModifierSelection(
  selections: ModifierSelections,
  group: ModGroup,
  modifierId: string,
): ModifierSelections {
  const current = selections[group._id] ?? [];
  const isSelected = current.includes(modifierId);

  if (isSelected) {
    return {
      ...selections,
      [group._id]: current.filter((id) => id !== modifierId),
    };
  }

  if (group.maximum === 1) {
    return { ...selections, [group._id]: [modifierId] };
  }

  if (current.length >= group.maximum) {
    return selections;
  }

  return { ...selections, [group._id]: [...current, modifierId] };
}

export function isModifierSelected(
  selections: ModifierSelections,
  groupId: string,
  modifierId: string,
) {
  return selections[groupId]?.includes(modifierId) ?? false;
}

export function calculateModifierExtraPrice(
  modGroups: ModGroup[],
  selections: ModifierSelections,
) {
  return modGroups.reduce((total, group) => {
    const selectedIds = selections[group._id] ?? [];
    const groupTotal = group.modifiers
      .filter((modifier) => selectedIds.includes(modifier._id))
      .reduce((sum, modifier) => sum + modifier.price, 0);
    return total + groupTotal;
  }, 0);
}

export function buildSelectedModGroupsPayload(
  modGroups: ModGroup[],
  selections: ModifierSelections,
) {
  return modGroups
    .map((group) => {
      const selectedIds = selections[group._id] ?? [];
      const selectedModifiers = group.modifiers
        .filter((modifier) => selectedIds.includes(modifier._id))
        .map((modifier) => ({
          _id: modifier._id,
          sdmId: modifier.sdmId,
          quantity: 1,
          price: modifier.price,
          nameEnglish: modifier.nameEnglish,
          nameArabic: modifier.nameArabic,
        }));

      if (!selectedModifiers.length) {
        return null;
      }

      return {
        _id: group._id,
        modGroupId: group.modGroupId,
        modType: group.modType,
        title: group.title,
        titleUn: group.titleUn,
        modifiers: selectedModifiers,
      };
    })
    .filter(Boolean);
}

export function validateModifierSelections(
  modGroups: ModGroup[],
  selections: ModifierSelections,
) {
  for (const group of modGroups) {
    if (!group.isAvailable) continue;

    const count = selections[group._id]?.length ?? 0;

    if (group.isRequired && count < group.minimum) {
      return {
        valid: false,
        message: `Please select at least ${group.minimum} option(s) for "${group.title}"`,
      };
    }
  }

  return { valid: true, message: "" };
}
