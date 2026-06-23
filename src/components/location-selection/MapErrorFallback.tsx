"use client";

interface Props {
  origin: string;
}

export default function MapErrorFallback({ origin }: Props) {
  const referrerPattern = `${origin}/*`;

  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl bg-[#f3eee4] px-6 text-center text-sm text-gray-600">
      <p className="font-semibold text-gray-800">Google Maps could not load</p>
      <p className="mt-2 max-w-sm">
        Your API key does not allow this site. Add the referrer below in Google
        Cloud Console.
      </p>
      <code className="mt-3 break-all rounded-lg bg-white px-3 py-2 text-xs font-medium text-[#42695a]">
        {referrerPattern}
      </code>
      <p className="mt-3 max-w-sm text-xs leading-relaxed text-gray-500">
        APIs &amp; Services → Credentials → your Maps API key → Application
        restrictions → HTTP referrers
      </p>
    </div>
  );
}
