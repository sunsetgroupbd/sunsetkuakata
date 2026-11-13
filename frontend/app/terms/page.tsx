import { Metadata } from "next";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sunset Kuakata Hotel & Resort",
  description: "Terms and conditions of website use and investment engagement with Sunset Kuakata Hotel & Resort Limited.",
};

export default function TermsPage() {
  return <TermsClient />;
}
