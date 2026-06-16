import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/?login=1&callbackUrl=/cart");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#42695a]">Your Cart</h1>
      <p className="mt-4 text-gray-600">
        Hi {session.user.fullName}, your cart is empty.
      </p>
    </section>
  );
}
