import Nav from "@/Components/Nav";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
};

export default layout;
