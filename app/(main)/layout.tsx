import { getProfile } from "@/actions/current";
import Provider from "./provider";
import { getCategories } from "@/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let current = null;
  try {
    const res = await getProfile();
    await getCategories();
    current = res;
  } catch (error) {
    console.log(error);
  }

  return <Provider current={current}>{children}</Provider>;
}
