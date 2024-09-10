import type { Metadata } from "next";
import Sidebar from "./sidebar";
import { getAdminProfile } from "@/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Creath Art Marketplace",
  description: "Admin Dashboard",
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

  if (!current) {
    redirect("/admin/auth/signin");
  }

  return (
    <div className="w-full h-full">
      <Sidebar />
      <main className="lg:pl-[280px] min-h-screen bg-white  w-full h-full">
        {children}
      </main>
    </div>
  );
}
