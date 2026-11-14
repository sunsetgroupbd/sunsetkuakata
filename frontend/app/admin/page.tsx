import { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Panel | Sunset Kuakata Hotel & Resort",
  description: "Internal management portal for investor leads CRM, booking schedules, and live package pricing.",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
