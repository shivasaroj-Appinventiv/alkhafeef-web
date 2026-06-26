interface Props {
  label: string;
  color?: string;
}

export default function NewArrivalStamp({ label, color = "#F26A21" }: Props) {
  return (
    <div className="absolute left-3 top-3 z-10">
      <div
        className="relative rounded-md px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {label}
        <span
          className="absolute -bottom-1.5 left-3 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent"
          style={{ borderTopColor: color }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
