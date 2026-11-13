import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "আমাদের কথা (Our Story) | Sunset Kuakata Hotel & Resort",
  description:
    "কুয়াকাটার নৈসর্গিক সৌন্দর্যকে বিশ্বমানের আতিথেয়তার সাথে এক সুতোয় বাঁধার স্বপ্ন নিয়ে Sunset Kuakata Hotel & Resort Ltd এর যাত্রা। আমাদের ভিশন, মিশন ও পরিচালনা পর্ষদ।",
};

export default function AboutPage() {
  return <AboutClient />;
}
