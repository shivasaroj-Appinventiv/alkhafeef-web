interface ProfilePageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ProfilePageShell({
  title,
  description,
  children,
}: ProfilePageShellProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">{title}</h1>

      <p className="mt-2 text-sm text-gray-500 sm:text-base">{description}</p>

      <hr className="my-6 border-0 border-t border-dashed border-gray-300" />

      {children}
    </div>
  );
}
