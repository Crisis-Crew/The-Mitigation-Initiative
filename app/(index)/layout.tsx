import Header from "@/components/header";
import Footer from "@/components/footer";
import { ReactNode } from "react";

export default function IndexRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
