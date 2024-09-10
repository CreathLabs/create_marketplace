import { getProfile } from "@/actions";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Welcome back",
  description: "Where Digital Meets Physical",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let current = null;
  try {
    const res = await getProfile();
    current = res;
  } catch (error) {
    console.log(error);
  }

  if (current) {
    redirect("/");
  }

  return (
    <div className="grid lg:grid-cols-2 w-full h-screen">
      <div className="w-full h-[323px] lg:h-full relative">
        <Image
          src="/auth.png"
          fill
          alt="Auth Image"
          className="object-cover cursor-pointer "
        />
        <div className="absolute w-full top-0 left-0 bottom-0 right-0 bg-[#000000AD] flex justify-end  ">
          <div className="container max-w-screen-sm pl-4 py-11 mx-auto lg:mx-0 lg:py-[60px] ">
            <Link href="/">
              <div className="w-[90.48px] h-[50px]  lg:h-[71px] lg:w-[128.48px] relative">
                <Image
                  src="/logo2.svg"
                  fill
                  alt=""
                  className="cursor-pointer"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-4 lg:px-20  container max-w-screen-sm mx-auto lg:mx-0 lg:pr-16 ">
        {children}
      </div>
    </div>
  );
}
