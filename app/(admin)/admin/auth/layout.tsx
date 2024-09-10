import { getAdminProfile } from "@/actions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in to Admin Dashboard",
  description: "Creath, Where Digital Meets Physical",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let current = null;
  try {
    const res = await getAdminProfile();
    current = res;
  } catch (error) {
    console.log(error);
  }

  if (current) {
    redirect("/admin");
  }

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
