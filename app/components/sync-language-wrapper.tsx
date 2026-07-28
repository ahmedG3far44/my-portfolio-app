"use client";

import { useSyncLanguage } from "@/app/lib/sync-language";

export const SyncLanguageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useSyncLanguage();
  return <>{children}</>;
};
