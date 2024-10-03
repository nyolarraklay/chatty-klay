"use client";

import { RecoilRoot } from "recoil";

export default function ClientLayout({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
