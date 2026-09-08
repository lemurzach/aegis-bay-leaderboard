"use server";

import { redirect } from "next/navigation";
import { deleteUserSession } from "@/lib/user-session";

export async function logoutUser() {
  await deleteUserSession();
  redirect("/");
}
