import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Welcome back",
  description: "Where Digital Meets Physical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="w-full h-full relative">
        <Image
          src="/auth.png"
          fill
          alt="Auth Image"
          className="object-cover cursor-pointer "
        />
        <div className="absolute w-full top-0 left-0 bottom-0 right-0 bg-[#000000AD] flex justify-end  ">
          <div className="container max-w-screen-sm pl-4 py-[60px] ">
            <Link href="/" className=" ">
              <Image
                src="/logo2.svg"
                width={128.48}
                height={71}
                alt=""
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-20  container max-w-screen-sm pr-16 ">
        {children}
      </div>
    </div>
  );
}
