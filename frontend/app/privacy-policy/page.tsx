import { Metadata } from "next";
import { PrivacyPolicyClient } from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Sunset Kuakata Hotel & Resort",
  description: "Privacy policy and data governance practices of Sunset Kuakata Hotel & Resort Limited.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
