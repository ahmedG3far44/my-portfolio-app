"use client";

import { FloatingControls } from "./ui/floating-controls";

export const ClientLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <FloatingControls />
    </>
  );
};
