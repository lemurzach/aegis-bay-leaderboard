import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user-dal";
import { SignupForm } from "./signup-form";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return <SignupForm />;
}
