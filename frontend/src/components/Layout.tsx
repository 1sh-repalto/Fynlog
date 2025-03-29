import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen z-0">
      <div className="fixed inset-0 -z-10 bg-dark bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_6rem] bg-fixed"></div>
      <div className="relative z-10 font-montserrat">{children}</div>
    </div>
  );
};

export default Layout;
