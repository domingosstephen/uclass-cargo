import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "uclass_admin_session";
const SESSION_VALUE = "authenticated";

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  if (session?.value !== SESSION_VALUE) {
    redirect("/admin/login");
  }
}

export function isValidAdminCredentials(username: string, password: string) {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export { ADMIN_COOKIE, SESSION_VALUE };
