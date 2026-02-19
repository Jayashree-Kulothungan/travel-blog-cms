import { redirect } from "next/navigation";

// Redirect root "/" to "/home" so the homepage is always reachable
export default function RootPage() {
  redirect("/home");
}
