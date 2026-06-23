export default function PolicySection() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-[#2d4a3e]">Our Policy</h2>

      <div className="rounded-2xl border border-[#efe8dc] bg-white p-4 shadow-sm">
        <p className="text-sm leading-relaxed text-gray-600">
          Please review your order details carefully before proceeding to
          payment. By placing your order, you agree to our terms and conditions.
        </p>
        <button
          type="button"
          className="mt-3 text-sm font-semibold text-[#F26A21] cursor-pointer"
        >
          Read Policy
        </button>
      </div>
    </section>
  );
}
