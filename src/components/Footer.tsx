
import Image from "next/image";
import Link from "next/link";
import OurStoreButton from "./OurStoreButton";

const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-center bg-[#113d2d] bg-[url('/svg/second-header-bg.svg')] bg-cover bg-center px-4 py-10">
        <Image
          src="/svg/logo.svg"
          alt="Alkhafeef"
          width={72}
          height={90}
          className="h-20 w-auto"
        />
      </div>

      <div className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:max-w-[240px]">
              <h2 className="text-base font-semibold text-white">Get In Touch</h2>
              <nav className="mt-6 flex flex-col gap-3 text-sm text-slate-400">
                <a href="#" className="transition hover:text-white">
                  Contact Us
                </a>
                <a href="#" className="transition hover:text-white">
                  Help & Support
                </a>
                <a href="#" className="transition hover:text-white">
                  FAQs
                </a>
                <a href="#" className="transition hover:text-white">
                  Catering
                </a>
              </nav>
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Explore Alkhafeef
              </h2>
              <nav className="mt-6 grid gap-3 text-sm text-slate-400 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
                <OurStoreButton />
                <Link
                  href="/our-vision"
                  className="transition hover:text-white"
                >
                  Our Vision
                </Link>
                <Link href="/about-us" className="transition hover:text-white">
                  About Us
                </Link>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="transition hover:text-white"
                >
                  Terms And Conditions
                </Link>
              </nav>
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">Address</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-400">
                <p className="inline-flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="M8 8h8M8 12h8M8 16h5" />
                    </svg>
                  </span>
                  Email : info@alkhafeef.com
                </p>
                <p className="inline-flex items-start gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 7h18M7 7v14h10V7" />
                      <path d="M8 7V4h8v3" />
                    </svg>
                  </span>
                  Alkhafeef Company for Food and Catering
                </p>
                <p className="inline-flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </span>
                  CR No. 1010143297
                </p>
                <p className="inline-flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12h18M12 3v18" />
                    </svg>
                  </span>
                  VAT No. 300056043100003
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-8 sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Get in touch with:</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-0">
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-slate-700 hover:bg-slate-800"
              >
                <span className="sr-only">Facebook</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-slate-700 hover:bg-slate-800"
              >
                <span className="sr-only">X</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-slate-700 hover:bg-slate-800"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v6a3 3 0 1 0 3 3h3" />
                  <path d="M8 21a5 5 0 0 0 4-8" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-slate-700 hover:bg-slate-800"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="m16 11.37.01.01" />
                  <path d="M7 7h10v10H7z" />
                </svg>
              </a>
            </div>
          </div>

          <p className="mt-6 border-t border-slate-800 pt-6 text-xs text-slate-600">
            © 2026 Alkhafeef LLC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
