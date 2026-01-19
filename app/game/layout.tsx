import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
export default function IndexRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Toaster />
      <main className="bg-background">{children}</main>
    </>
  );
}
