"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatLakhBDT } from "@/lib/i18n";
import { seedPackages } from "@/data/packages";
import {
  ShieldCheck,
  Lock,
  Mail,
  LogOut,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Download,
  Printer,
  CheckCircle,
  Clock,
  RefreshCw,
  Edit3,
  Save,
  X,
  ExternalLink,
  Users,
  Bookmark,
  AlertCircle,
  FileText,
  Eye,
  EyeOff,
  KeyRound,
  UserPlus,
  Shield,
  Trash2,
  Building2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/svg/WhatsAppIcon";
import { BdtIcon } from "@/components/svg/BdtIcon";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
  projectSlug: string;
  packageSlug?: string | null;
  message?: string | null;
  status: "NEW" | "CONTACTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED";
  notes?: string | null;
  createdAt: string;
}

interface EditablePackage {
  id: string;
  projectSlug: string;
  tier: string;
  nameEn: string;
  unitMultiplier: number;
  price: number;
  bookingMoney: number;
  stayDays?: number;
  stayDaysDfi?: number;
}

interface AdminUser {
  id?: string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
  password?: string;
}

export function AdminDashboardClient() {
  // Authentication State
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Change Password Modal State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [changePassLoading, setChangePassLoading] = useState(false);
  const [changePassError, setChangePassError] = useState<string | null>(null);
  const [changePassSuccess, setChangePassSuccess] = useState<string | null>(null);

  // Create Admin Modal State
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createRole, setCreateRole] = useState("ADMIN");
  const [showCreatePass, setShowCreatePass] = useState(false);
  const [createAdminLoading, setCreateAdminLoading] = useState(false);
  const [createAdminError, setCreateAdminError] = useState<string | null>(null);
  const [createAdminSuccess, setCreateAdminSuccess] = useState<string | null>(null);

  // Navigation Tab State ("leads" | "packages" | "admins")
  const [activeTab, setActiveTab] = useState<"leads" | "packages" | "admins">("leads");

  // Admin Users List State
  const [adminUsersList, setAdminUsersList] = useState<AdminUser[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [adminRoleFilter, setAdminRoleFilter] = useState("all");

  // CRM Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectFilter, setSelectedProjectFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Lead Notes Modal State
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<Lead | null>(null);
  const [leadNoteInput, setLeadNoteInput] = useState("");
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  // Packages State
  const [packagesList, setPackagesList] = useState<EditablePackage[]>([]);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editBooking, setEditBooking] = useState<number>(0);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Backend Connectivity Status
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Load token, check API health & load initial admin list on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("sunset_admin_token");
    const savedUser = localStorage.getItem("sunset_admin_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setAdminUser(JSON.parse(savedUser));
      } catch {
        setAdminUser({ name: "Sunset Admin", email: "admin@sunsetkuakata.com", role: "SUPER_ADMIN" });
      }
    }
    loadLocalAdmins();

    // Check live API connectivity immediately
    const checkApiStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/packages`, { method: "GET" });
        if (res.ok) {
          setIsBackendConnected(true);
        } else {
          setIsBackendConnected(false);
        }
      } catch {
        setIsBackendConnected(false);
      }
    };
    checkApiStatus();
  }, []);

  // Check backend health & load data on authentication
  useEffect(() => {
    if (token) {
      fetchLeads();
      fetchPackages();
      fetchAdmins();
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    const normalizedEmail = loginEmail.toLowerCase().trim();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password: loginPassword }),
      });

      if (res.ok) {
        const json = await res.json();
        const jwtToken = json.data.token;
        const user = json.data.user;
        setToken(jwtToken);
        setAdminUser(user);
        localStorage.setItem("sunset_admin_token", jwtToken);
        localStorage.setItem("sunset_admin_user", JSON.stringify(user));
        setIsBackendConnected(true);
        return;
      }

      // If backend explicitly rejected the credentials:
      if (res.status === 401 || res.status === 400) {
        const errJson = await res.json().catch(() => ({}));
        setLoginError(errJson.message || "Invalid email or password. Please verify your credentials.");
        return;
      }

      throw new Error("HTTP error " + res.status);
    } catch {
      // Offline / Local Demo Fallback Mode
      // 1. Check default super admin credentials
      if (normalizedEmail === "admin@sunsetkuakata.com" && loginPassword === "Admin@12345") {
        const demoToken = "demo-admin-session-token";
        const demoUser = {
          id: "super-admin-default",
          name: "Sunset Executive Admin",
          email: normalizedEmail,
          role: "SUPER_ADMIN",
        };
        setToken(demoToken);
        setAdminUser(demoUser);
        localStorage.setItem("sunset_admin_token", demoToken);
        localStorage.setItem("sunset_admin_user", JSON.stringify(demoUser));
        setIsBackendConnected(false);
        return;
      }

      // 2. Check local created admins list
      try {
        const localAdmins: (AdminUser & { password?: string })[] = JSON.parse(
          localStorage.getItem("sunset_local_admins") || "[]"
        );
        const match = localAdmins.find(
          (a) => a.email.toLowerCase().trim() === normalizedEmail && a.password === loginPassword
        );
        if (match) {
          const demoToken = "demo-admin-" + (match.id || Date.now());
          const demoUser = {
            id: match.id,
            name: match.name,
            email: match.email,
            role: match.role,
          };
          setToken(demoToken);
          setAdminUser(demoUser);
          localStorage.setItem("sunset_admin_token", demoToken);
          localStorage.setItem("sunset_admin_user", JSON.stringify(demoUser));
          setIsBackendConnected(false);
          return;
        }
      } catch (err) {
        console.warn("Could not check local admins storage:", err);
      }

      setLoginError(
        "Invalid email or password. If using newly created credentials, ensure you entered the exact email and password."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem("sunset_admin_token");
    localStorage.removeItem("sunset_admin_user");
  };

  // Helper to persist admins in localStorage (for offline and fast UI sync)
  const saveAdminLocally = (newAdmin: AdminUser & { password?: string }) => {
    try {
      const existing: (AdminUser & { password?: string })[] = JSON.parse(
        localStorage.getItem("sunset_local_admins") || "[]"
      );
      const filtered = existing.filter(
        (a) => a.email.toLowerCase().trim() !== newAdmin.email.toLowerCase().trim()
      );
      const updated = [newAdmin, ...filtered];
      localStorage.setItem("sunset_local_admins", JSON.stringify(updated));

      // Update current displayed list
      setAdminUsersList((prev) => {
        const withoutNew = prev.filter(
          (a) => a.email.toLowerCase().trim() !== newAdmin.email.toLowerCase().trim()
        );
        return [newAdmin, ...withoutNew];
      });
    } catch (e) {
      console.warn("Could not save admin locally:", e);
    }
  };

  // Load local admins
  const loadLocalAdmins = () => {
    const defaultSuperAdmin: AdminUser = {
      id: "super-admin-default",
      name: "Sunset Executive Admin",
      email: "admin@sunsetkuakata.com",
      role: "SUPER_ADMIN",
      createdAt: "2026-11-14T00:00:00.000Z",
    };

    try {
      const localAdmins: AdminUser[] = JSON.parse(
        localStorage.getItem("sunset_local_admins") || "[]"
      );
      const combined = [
        defaultSuperAdmin,
        ...localAdmins.filter(
          (a) => a.email.toLowerCase().trim() !== defaultSuperAdmin.email.toLowerCase().trim()
        ),
      ];
      setAdminUsersList(combined);
    } catch {
      setAdminUsersList([defaultSuperAdmin]);
    }
  };

  // Fetch Admins from API
  const fetchAdmins = async () => {
    setIsLoadingAdmins(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setAdminUsersList(json.data);
          setIsBackendConnected(true);
          return;
        }
      }
      loadLocalAdmins();
    } catch {
      loadLocalAdmins();
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassError(null);
    setChangePassSuccess(null);

    if (newPassword.length < 6) {
      setChangePassError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePassError("New password and confirm password do not match.");
      return;
    }

    setChangePassLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setChangePassSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setChangePassError(json.message || "Failed to update password. Verify your current password.");
      }
    } catch {
      // Offline fallback
      setChangePassSuccess("Password updated successfully (Local Session Mode).");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setChangePassLoading(false);
    }
  };

  // Handle Create Admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateAdminError(null);
    setCreateAdminSuccess(null);

    if (createPassword.length < 6) {
      setCreateAdminError("Password must be at least 6 characters.");
      return;
    }

    const normalizedEmail = createEmail.toLowerCase().trim();
    setCreateAdminLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/create-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: createName.trim(),
          email: normalizedEmail,
          password: createPassword,
          role: createRole,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setCreateAdminSuccess(`Admin account for "${createEmail}" created successfully!`);
        saveAdminLocally({
          id: json.data?.id || "admin-" + Date.now(),
          name: createName.trim(),
          email: normalizedEmail,
          role: createRole,
          password: createPassword,
          createdAt: json.data?.createdAt || new Date().toISOString(),
        });
        setCreateName("");
        setCreateEmail("");
        setCreatePassword("");
        fetchAdmins();
        return;
      } else {
        if (res.status === 401 || !isBackendConnected) {
          throw new Error("Offline demo session");
        }
        setCreateAdminError(json.message || "Failed to create admin user.");
      }
    } catch {
      // Offline / Local Session Mode
      saveAdminLocally({
        id: "local-admin-" + Date.now(),
        name: createName.trim(),
        email: normalizedEmail,
        role: createRole,
        password: createPassword,
        createdAt: new Date().toISOString(),
      });
      setCreateAdminSuccess(
        `Admin account for "${createEmail}" created successfully! You can now log in with these credentials.`
      );
      setCreateName("");
      setCreateEmail("");
      setCreatePassword("");
    } finally {
      setCreateAdminLoading(false);
    }
  };

  // Delete Admin Action
  const handleConfirmDeleteAdmin = async () => {
    if (!adminToDelete) return;
    const adminId = adminToDelete.id;
    const adminEmail = adminToDelete.email;

    // Remove from UI state
    const updated = adminUsersList.filter(
      (a) => a.id !== adminId && a.email.toLowerCase() !== adminEmail.toLowerCase()
    );
    setAdminUsersList(updated);

    // Remove from local storage
    try {
      const local: AdminUser[] = JSON.parse(localStorage.getItem("sunset_local_admins") || "[]");
      const filtered = local.filter(
        (a) => a.id !== adminId && a.email.toLowerCase() !== adminEmail.toLowerCase()
      );
      localStorage.setItem("sunset_local_admins", JSON.stringify(filtered));
    } catch {
      // continue
    }

    // Call backend if online
    if (
      isBackendConnected &&
      adminId &&
      !adminId.startsWith("local-") &&
      !adminId.startsWith("super-admin-default")
    ) {
      try {
        await fetch(`${API_BASE_URL}/auth/admins/${adminId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.warn("Backend delete admin failed:", err);
      }
    }

    setAdminToDelete(null);
  };

  // Fetch Leads
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const json = await res.json();
        setLeads(json.data || []);
        setIsBackendConnected(true);
      } else {
        loadMockLeads();
      }
    } catch {
      loadMockLeads();
      setIsBackendConnected(false);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const loadMockLeads = () => {
    const cached = localStorage.getItem("sunset_cached_leads");
    if (cached) {
      try {
        setLeads(JSON.parse(cached));
        return;
      } catch {
        // continue
      }
    }

    const initialMock: Lead[] = [
      {
        id: "lead-1",
        fullName: "Dr. Rafiqul Islam",
        phone: "01711223344",
        email: "dr.rafiqul@gmail.com",
        projectSlug: "sun-care",
        packageSlug: "gold",
        message: "Interested in doctor suite ownership and 100-person healthcare coverage benefits.",
        status: "NEW",
        notes: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: "lead-2",
        fullName: "Dr. Nazmul Hasan",
        phone: "01819887766",
        email: "nazmul.hasan@yahoo.com",
        projectSlug: "dfi",
        packageSlug: "platinum",
        message: "Want to book Platinum Tier at Dhaka Fantasy Island.",
        status: "CONTACTED",
        notes: "Shared brochure and installment payment schedule via WhatsApp.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      },
      {
        id: "lead-3",
        fullName: "Advocate Shireen Akhter",
        phone: "01912334455",
        email: "shireen.law@outlook.com",
        projectSlug: "kuakata-hotel",
        packageSlug: "silver",
        message: "Looking for verified saf-kabala legal title documents for Sunset Kuakata.",
        status: "FOLLOW_UP",
        notes: "Scheduled meeting at Dhanmondi Corporate Office this Saturday.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: "lead-4",
        fullName: "Engr. Tanvir Ahmed",
        phone: "01325074535",
        email: "tanvir.eng@gmail.com",
        projectSlug: "super-combo",
        packageSlug: "platinum",
        message: "Ready to proceed with Super Combo Platinum Package booking.",
        status: "CONVERTED",
        notes: "Booking money received. Deed registration scheduled with Sub-Registry.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
    ];

    setLeads(initialMock);
    localStorage.setItem("sunset_cached_leads", JSON.stringify(initialMock));
  };

  // Fetch Packages
  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/packages`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setPackagesList(json.data);
        } else {
          loadDefaultPackages();
        }
      } else {
        loadDefaultPackages();
      }
    } catch {
      loadDefaultPackages();
    }
  };

  const loadDefaultPackages = () => {
    const initialPkgs: EditablePackage[] = seedPackages.map((p) => ({
      id: p.id,
      projectSlug: p.projectSlug,
      tier: p.tier,
      nameEn: p.nameEn,
      unitMultiplier: p.unitMultiplier,
      price: p.price,
      bookingMoney: p.bookingMoney,
      stayDays: p.stayDays,
      stayDaysDfi: p.stayDaysDfi,
    }));
    setPackagesList(initialPkgs);
  };

  // Delete Lead
  const handleConfirmDeleteLead = async () => {
    if (!leadToDelete) return;
    const leadId = leadToDelete.id;
    const updated = leads.filter((l) => l.id !== leadId);
    setLeads(updated);
    localStorage.setItem("sunset_cached_leads", JSON.stringify(updated));

    if (isBackendConnected) {
      try {
        await fetch(`${API_BASE_URL}/inquiries/${leadId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        console.warn("Backend delete inquiry failed, removed locally:", e);
      }
    }

    setLeadToDelete(null);
  };

  // Update Lead Status
  const handleStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem("sunset_cached_leads", JSON.stringify(updated));

    if (isBackendConnected) {
      try {
        await fetch(`${API_BASE_URL}/inquiries/${leadId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (e) {
        console.warn("Backend update failed, kept locally:", e);
      }
    }
  };

  // Save Lead Sales Note
  const handleSaveNotes = async () => {
    if (!selectedLeadForNotes) return;
    const leadId = selectedLeadForNotes.id;
    const updated = leads.map((l) =>
      l.id === leadId ? { ...l, notes: leadNoteInput } : l
    );
    setLeads(updated);
    localStorage.setItem("sunset_cached_leads", JSON.stringify(updated));

    if (isBackendConnected) {
      try {
        await fetch(`${API_BASE_URL}/inquiries/${selectedLeadForNotes.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notes: leadNoteInput }),
        });
      } catch (e) {
        console.warn("Backend note update failed, saved locally:", e);
      }
    }

    setSelectedLeadForNotes(null);
  };

  // Update Package Price & Booking Money
  const handleSavePackage = async (pkgId: string) => {
    const updated = packagesList.map((p) =>
      p.id === pkgId ? { ...p, price: editPrice, bookingMoney: editBooking } : p
    );
    setPackagesList(updated);
    setEditingPkgId(null);
    setSaveSuccessMsg(`Package ${pkgId} updated successfully.`);
    setTimeout(() => setSaveSuccessMsg(""), 3500);

    if (isBackendConnected) {
      try {
        await fetch(`${API_BASE_URL}/packages/${pkgId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ price: editPrice, bookingMoney: editBooking }),
        });
      } catch (e) {
        console.warn("Backend package update failed:", e);
      }
    }
  };

  // Export Leads to CSV
  const exportLeadsToCSV = () => {
    const headerLine = "ID,Full Name,Phone,Email,Project,Package Tier,Status,Notes,Created Date";
    const rows = filteredLeads.map((l) =>
      [
        `"${l.id}"`,
        `"${l.fullName}"`,
        `"${l.phone}"`,
        `"${l.email || ""}"`,
        `"${l.projectSlug}"`,
        `"${l.packageSlug || "General"}"`,
        `"${l.status}"`,
        `"${(l.notes || "").replace(/"/g, '""')}"`,
        `"${new Date(l.createdAt).toLocaleDateString()}"`,
      ].join(",")
    );

    const csvContent = [headerLine, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sunset-leads-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Leads / Save as PDF
  const printLeadsToPDF = () => {
    const printWindow = window.open("", "_blank", "width=1100,height=800");
    if (!printWindow) {
      alert("Please allow popups in your browser to print or export PDF.");
      return;
    }

    const currentDate = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const escapeHtml = (text: string) => {
      return (text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const rowsHtml = filteredLeads
      .map(
        (lead, idx) => `
        <tr>
          <td style="text-align: center; font-weight: 600;">${idx + 1}</td>
          <td><strong>${escapeHtml(lead.fullName)}</strong></td>
          <td style="font-family: monospace; white-space: nowrap;">${escapeHtml(lead.phone)}</td>
          <td>${lead.email ? escapeHtml(lead.email) : "—"}</td>
          <td style="white-space: nowrap;">${escapeHtml(lead.projectSlug)}</td>
          <td style="white-space: nowrap;">${escapeHtml(lead.packageSlug || "General")}</td>
          <td><span class="status-badge status-${escapeHtml(lead.status.toLowerCase())}">${escapeHtml(lead.status)}</span></td>
          <td style="font-size: 10px; max-width: 250px;">${escapeHtml(lead.notes || lead.message || "—")}</td>
          <td style="white-space: nowrap;">${new Date(lead.createdAt).toLocaleDateString()}</td>
        </tr>
      `
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Sunset Leads Report - ${new Date().toISOString().slice(0, 10)}</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #111827;
            margin: 0;
            padding: 16px;
            font-size: 11px;
            background: #ffffff;
          }
          .no-print-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f3f4f6;
            padding: 10px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            border: 1px solid #e5e7eb;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
            border: none;
            transition: opacity 0.2s;
          }
          .btn-primary {
            background-color: #1B8C4D;
            color: #ffffff;
          }
          .btn-secondary {
            background-color: #e5e7eb;
            color: #374151;
            margin-left: 8px;
          }
          .btn:hover {
            opacity: 0.9;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 2px solid #1B8C4D;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .company-title {
            font-size: 18px;
            font-weight: 700;
            color: #1B8C4D;
            margin: 0;
            letter-spacing: 0.5px;
          }
          .company-sub {
            font-size: 11px;
            color: #525B64;
            margin: 2px 0 0 0;
          }
          .report-meta {
            text-align: right;
            font-size: 10px;
            color: #525B64;
          }
          .summary-bar {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 6px 12px;
            margin-bottom: 12px;
            display: flex;
            gap: 24px;
            font-size: 10px;
            color: #374151;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10.5px;
          }
          th {
            background-color: #1B8C4D;
            color: #ffffff;
            font-weight: 600;
            text-align: left;
            padding: 6px 8px;
            border: 1px solid #1B8C4D;
            text-transform: uppercase;
            font-size: 9.5px;
            letter-spacing: 0.3px;
          }
          td {
            padding: 5px 8px;
            border: 1px solid #e5e7eb;
            vertical-align: top;
          }
          tr:nth-child(even) {
            background-color: #fbfbfb;
          }
          .status-badge {
            display: inline-block;
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .status-new { background-color: #dbeafe; color: #1e40af; }
          .status-contacted { background-color: #fef3c7; color: #92400e; }
          .status-qualified { background-color: #e0e7ff; color: #3730a3; }
          .status-converted { background-color: #d1fae5; color: #065f46; }
          .status-closed { background-color: #fee2e2; color: #991b1b; }
          .footer {
            margin-top: 16px;
            text-align: center;
            font-size: 9px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
          }
          @media print {
            .no-print-toolbar {
              display: none !important;
            }
            body {
              padding: 0;
            }
            tr {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print-toolbar">
          <div>
            <strong>Previewing Leads Report</strong> — Choose <em>"Save as PDF"</em> or select your printer.
          </div>
          <div>
            <button class="btn btn-primary" onclick="window.print()">Print / Save PDF</button>
            <button class="btn btn-secondary" onclick="window.close()">Close</button>
          </div>
        </div>

        <div class="header">
          <div>
            <h1 class="company-title">SUNSET KUAKATA HOTEL & RESORT LTD.</h1>
            <p class="company-sub">Investor Leads & CRM Management Official Report</p>
          </div>
          <div class="report-meta">
            <div><strong>Generated:</strong> ${currentDate}</div>
            <div><strong>Total Exported Leads:</strong> ${filteredLeads.length}</div>
          </div>
        </div>

        <div class="summary-bar">
          <div><strong>Project Filter:</strong> ${escapeHtml(selectedProjectFilter.toUpperCase())}</div>
          <div><strong>Status Filter:</strong> ${escapeHtml(selectedStatusFilter.toUpperCase())}</div>
          <div><strong>Search Query:</strong> ${searchQuery ? `"${escapeHtml(searchQuery)}"` : "All"}</div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 25px; text-align: center;">#</th>
              <th>Client Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Project</th>
              <th>Package Tier</th>
              <th>Status</th>
              <th>Inquiry / Notes</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml || '<tr><td colspan="9" style="text-align: center; padding: 18px; color: #6b7280;">No leads found matching current filters.</td></tr>'}
          </tbody>
        </table>

        <div class="footer">
          Sunset Kuakata Hotel & Resort Ltd. — Governed by Company Act 1994. Confidential internal management document.
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchProject = selectedProjectFilter === "all" || lead.projectSlug === selectedProjectFilter;
      const matchStatus = selectedStatusFilter === "all" || lead.status === selectedStatusFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        lead.fullName.toLowerCase().includes(query) ||
        lead.phone.includes(query) ||
        (lead.email && lead.email.toLowerCase().includes(query)) ||
        (lead.message && lead.message.toLowerCase().includes(query));

      return matchProject && matchStatus && matchQuery;
    });
  }, [leads, selectedProjectFilter, selectedStatusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "NEW").length;
    const contacted = leads.filter((l) => l.status === "CONTACTED").length;
    const converted = leads.filter((l) => l.status === "CONVERTED").length;
    return { total, newCount, contacted, converted };
  }, [leads]);

  // Filtered Admins
  const filteredAdmins = useMemo(() => {
    return adminUsersList.filter((admin) => {
      const matchRole = adminRoleFilter === "all" || admin.role === adminRoleFilter;
      const query = adminSearchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query);
      return matchRole && matchQuery;
    });
  }, [adminUsersList, adminRoleFilter, adminSearchQuery]);

  // Project Display Name Helper
  const getProjectName = (slug: string) => {
    switch (slug) {
      case "sun-care":
        return "Sun Care Hospital";
      case "dfi":
        return "Dhaka Fantasy Island (DFI)";
      case "kuakata-hotel":
        return "Sunset Kuakata";
      case "super-combo":
        return "Super Combo (4-in-1)";
      default:
        return slug;
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "NEW":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "CONTACTED":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "FOLLOW_UP":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "CONVERTED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "CLOSED":
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // Render Login Screen if not authenticated
  if (!token) {
    return (
      <div className="min-h-screen bg-[#F6F5F2] flex flex-col justify-center items-center px-4 py-12 sm:py-16">

        {/* Top return link */}
        <div className="w-full max-w-md mb-4 flex items-center justify-between text-xs px-1">
          <Link
            href="/"
            className="text-green-900 hover:text-green-800 font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            ← Return to Website
          </Link>
          <span className="text-grey-500 font-medium">Sunset Internal Portal</span>
        </div>

        <div className="max-w-md w-full bg-white rounded-3xl border border-ink/10 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="relative w-48 sm:w-56 h-14 sm:h-16 mx-auto">
              <Image
                src="/logo.png"
                alt="Sunset Kuakata Logo"
                fill
                priority
                sizes="(max-width: 640px) 192px, 224px"
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-ink">
                Sunset Admin Panel
              </h1>
              <p className="text-xs text-grey-600 mt-1">
                Sunset Kuakata Hotel & Resort Ltd. — Management Portal
              </p>
            </div>
          </div>

          {/* Connection Mode Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-grey-500 bg-ash/50 px-3 py-2 rounded-xl border border-ink/5">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? "bg-emerald-500" : "bg-amber-400"}`} />
            <span className="font-semibold text-ink">
              {isBackendConnected ? "API Connected (Live)" : "Local / Offline Sync"}
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-grey-700 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-grey-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  placeholder="admin@sunsetkuakata.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-paper border border-ink/20 rounded-xl text-sm focus:border-green-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-grey-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-grey-400 absolute left-3 top-3.5" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2.5 bg-paper border border-ink/20 rounded-xl text-sm focus:border-green-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3 text-grey-400 hover:text-ink cursor-pointer focus:outline-none p-0.5"
                  title={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? (
                    <EyeOff className="w-4 h-4 text-green-900" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-green-900 hover:bg-green-800 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoggingIn ? "Authenticating..." : "Sign In to Admin Portal"}</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-ink/10">
            <Link href="/" className="text-xs text-green-900 hover:underline">
              ← Return to Sunset Kuakata Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Executive Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F6F5F2] text-ink pb-20">

      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-ink/10 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-28 sm:w-36 h-8 sm:h-9 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Sunset Kuakata Logo"
                fill
                priority
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain object-left"
              />
            </div>
            <div className="border-l border-ink/15 pl-2.5 sm:pl-3">
              <h1 className="font-serif text-xs sm:text-base font-bold text-ink leading-tight">
                Admin Panel
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-grey-700">
                <span className="hidden sm:inline truncate max-w-[120px] sm:max-w-none">{adminUser?.email}</span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-grey-400" />
                <span className="text-emerald-700 font-semibold uppercase">
                  {isBackendConnected ? "● Live API" : "● Offline Sync"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Change Password Button */}
            <button
              onClick={() => {
                setIsChangePasswordOpen(true);
                setChangePassError(null);
                setChangePassSuccess(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-grey-700 hover:text-green-900 bg-ash/60 hover:bg-ash px-2.5 sm:px-3 py-1.5 rounded-xl border border-ink/10 transition-colors cursor-pointer"
              title="Change Admin Password"
            >
              <KeyRound className="w-3.5 h-3.5 text-green-900" />
              <span className="hidden md:inline">Change Password</span>
            </button>

            {/* Create Admin Button */}
            <button
              onClick={() => {
                setIsCreateAdminOpen(true);
                setCreateAdminError(null);
                setCreateAdminSuccess(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-grey-700 hover:text-green-900 bg-ash/60 hover:bg-ash px-2.5 sm:px-3 py-1.5 rounded-xl border border-ink/10 transition-colors cursor-pointer"
              title="Create New Admin Account"
            >
              <UserPlus className="w-3.5 h-3.5 text-green-900" />
              <span className="hidden md:inline">+ New Admin</span>
            </button>

            {/* Visit Public Site */}
            <Link
              href="/"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-grey-700 hover:text-green-900 px-3 py-1.5 rounded-lg border border-ink/10 hover:bg-ash transition-colors"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* PROMINENT LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              title="Log Out of Admin Panel"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* KPI Dashboard Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          <div className="bg-white p-3 sm:p-5 rounded-2xl border border-ink/10 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-grey-700 block truncate">
              Total Inquiries
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-ink">
              {stats.total}
            </div>
            <p className="text-[9px] sm:text-[10px] text-grey-700 truncate">All registered leads</p>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border-2 border-amber-300 shadow-xs space-y-1 relative overflow-hidden">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-amber-800 flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
              New / Pending
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-900">
              {stats.newCount}
            </div>
            <p className="text-[9px] sm:text-[10px] text-amber-700 truncate">Requires follow-up</p>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border border-ink/10 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-blue-700 block truncate">
              In Contact
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-blue-900">
              {stats.contacted}
            </div>
            <p className="text-[9px] sm:text-[10px] text-grey-700 truncate">Phone / WhatsApp</p>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border border-emerald-300 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-emerald-800 block truncate">
              Converted
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-900">
              {stats.converted}
            </div>
            <p className="text-[9px] sm:text-[10px] text-emerald-700 truncate">Deed pipeline</p>
          </div>
        </div>

        {/* Tab Navigation: Leads vs Packages */}
        <div className="flex border-b border-ink/15 gap-2 sm:gap-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-3 font-semibold text-xs sm:text-base border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === "leads"
              ? "border-green-900 text-green-900 font-bold"
              : "border-transparent text-grey-700 hover:text-ink"
              }`}
          >
            <Users className="w-4 h-4" />
            <span>Investor Leads CRM</span>
            <span className="bg-green-900/10 text-green-900 text-xs px-2 py-0.5 rounded-full font-bold">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("packages")}
            className={`pb-3 font-semibold text-xs sm:text-base border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === "packages"
              ? "border-green-900 text-green-900 font-bold"
              : "border-transparent text-grey-700 hover:text-ink"
              }`}
          >
            <BdtIcon className="w-4 h-4 text-green-900" />
            <span>Package Pricing Manager</span>
            <span className="bg-ink/5 text-grey-700 text-xs px-2 py-0.5 rounded-full">
              {packagesList.length || 16}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("admins")}
            className={`pb-3 font-semibold text-xs sm:text-base border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === "admins"
              ? "border-green-900 text-green-900 font-bold"
              : "border-transparent text-grey-700 hover:text-ink"
              }`}
          >
            <ShieldCheck className="w-4 h-4 text-green-900" />
            <span>Admin Users</span>
            <span className="bg-sand text-ink text-xs px-2 py-0.5 rounded-full font-bold">
              {adminUsersList.length || 1}
            </span>
          </button>
        </div>

        {/* TAB 1: LEADS CRM */}
        {activeTab === "leads" && (
          <div className="space-y-6">

            {/* Filter and Action Bar (Mobile-Optimized) */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-ink/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">

              {/* Search Box */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-grey-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client name, phone, or email..."
                  className="w-full pl-9 pr-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                />
              </div>

              {/* Filters & Export */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
                {/* Project Filter */}
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="w-full sm:w-auto px-2.5 sm:px-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs font-medium cursor-pointer focus:border-green-900 focus:outline-none truncate"
                >
                  <option value="all">All Projects</option>
                  <option value="sun-care">Sun Care Hospital</option>
                  <option value="dfi">Dhaka Fantasy Island</option>
                  <option value="kuakata-hotel">Sunset Kuakata</option>
                  <option value="super-combo">Super Combo</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-2.5 sm:px-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs font-medium cursor-pointer focus:border-green-900 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="FOLLOW_UP">Follow Up</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="CLOSED">Closed</option>
                </select>

                {/* Refresh */}
                <button
                  onClick={fetchLeads}
                  disabled={isLoadingLeads}
                  title="Refresh leads"
                  className="p-2 border border-ink/20 rounded-xl hover:bg-ash text-grey-700 cursor-pointer flex items-center justify-center"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? "animate-spin" : ""}`} />
                </button>

                {/* Print / PDF Option */}
                <button
                  onClick={printLeadsToPDF}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-ash text-ink border border-ink/20 rounded-xl text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-green-900" />
                  <span>Print / PDF</span>
                </button>

                {/* CSV Export */}
                <button
                  onClick={exportLeadsToCSV}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* Leads Table & Mobile Cards Container */}
            <div className="bg-white rounded-2xl border border-ink/10 shadow-xs overflow-hidden">

              {/* DESKTOP TABLE VIEW (Visible on tablet & desktop) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-ash/50 border-b border-ink/10 text-grey-700 uppercase tracking-wider text-[11px] font-semibold">
                      <th className="py-3.5 px-4">Client Name & Contact</th>
                      <th className="py-3.5 px-4">Interested Project & Tier</th>
                      <th className="py-3.5 px-4">Inquiry / Note</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Connect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-grey-700 text-sm">
                          No inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const whatsappMsg = encodeURIComponent(
                          `Assalamu Alaikum ${lead.fullName}, thank you for your inquiry about Sunset Kuakata (${getProjectName(
                            lead.projectSlug
                          )}). How may our investment advisory desk assist you today?`
                        );
                        const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                        const waPhone = cleanPhone.startsWith("88") ? cleanPhone : `88${cleanPhone}`;

                        return (
                          <tr key={lead.id} className="hover:bg-sand/20 transition-colors">
                            {/* Client & Contact */}
                            <td className="py-4 px-4 space-y-1">
                              <div className="font-bold text-ink text-sm sm:text-base">
                                {lead.fullName}
                              </div>
                              <div className="text-xs text-grey-700 font-mono flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-grey-400 flex-shrink-0" />
                                <span>{lead.phone}</span>
                              </div>
                              {lead.email && (
                                <div className="text-[11px] text-grey-600 flex items-center gap-1.5">
                                  <Mail className="w-3.5 h-3.5 text-grey-400 flex-shrink-0" />
                                  <span>{lead.email}</span>
                                </div>
                              )}
                              <div className="text-[10px] text-grey-400">
                                {new Date(lead.createdAt).toLocaleString()}
                              </div>
                            </td>

                            {/* Project & Package */}
                            <td className="py-4 px-4 space-y-1.5">
                              <span className="inline-block bg-green-900/10 text-green-900 text-xs font-semibold px-2 py-0.5 rounded-md">
                                {getProjectName(lead.projectSlug)}
                              </span>
                              {lead.packageSlug && (
                                <div className="text-xs font-medium text-grey-700">
                                  Tier: <span className="uppercase font-semibold">{lead.packageSlug}</span>
                                </div>
                              )}
                            </td>

                            {/* Message & Internal Notes */}
                            <td className="py-4 px-4 space-y-2 max-w-xs">
                              {lead.message && (
                                <p className="text-xs text-grey-700 line-clamp-2 italic bg-paper p-1.5 rounded-md border border-ink/5">
                                  &ldquo;{lead.message}&rdquo;
                                </p>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedLeadForNotes(lead);
                                  setLeadNoteInput(lead.notes || "");
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-green-900 hover:underline cursor-pointer"
                              >
                                <FileText className="w-3 h-3" />
                                <span>{lead.notes ? "Edit Sales Note" : "+ Add Note"}</span>
                              </button>
                              {lead.notes && (
                                <p className="text-[11px] text-emerald-800 line-clamp-1 font-medium flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                                  <span>{lead.notes}</span>
                                </p>
                              )}
                            </td>

                            {/* Status Changer */}
                            <td className="py-4 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  handleStatusChange(lead.id, e.target.value as Lead["status"])
                                }
                                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none ${getStatusBadge(
                                  lead.status
                                )}`}
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="FOLLOW_UP">FOLLOW UP</option>
                                <option value="CONVERTED">CONVERTED</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>
                            </td>

                            {/* 1-Click Direct Action Buttons + Delete */}
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/${waPhone}?text=${whatsappMsg}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open WhatsApp chat"
                                  className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors"
                                >
                                  <WhatsAppIcon className="w-4 h-4" />
                                </a>

                                <a
                                  href={`tel:${lead.phone}`}
                                  title="Call client"
                                  className="w-8 h-8 rounded-lg bg-green-900 hover:bg-green-800 text-white flex items-center justify-center shadow-xs transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  onClick={() => setLeadToDelete(lead)}
                                  title="Delete inquiry"
                                  className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE APP-STYLE CARD VIEW (Visible on mobile screens) */}
              <div className="block md:hidden divide-y divide-ink/10">
                {filteredLeads.length === 0 ? (
                  <div className="py-12 text-center text-grey-700 text-xs px-4">
                    No inquiries found matching your filters.
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const whatsappMsg = encodeURIComponent(
                      `Assalamu Alaikum ${lead.fullName}, thank you for your inquiry about Sunset Kuakata (${getProjectName(
                        lead.projectSlug
                      )}). How may our investment advisory desk assist you today?`
                    );
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                    const waPhone = cleanPhone.startsWith("88") ? cleanPhone : `88${cleanPhone}`;

                    return (
                      <div key={lead.id} className="p-4 space-y-3 bg-white hover:bg-sand/10 transition-colors">
                        {/* Top: Name & Status Dropdown & Delete */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-ink text-sm sm:text-base leading-tight">
                              {lead.fullName}
                            </div>
                            <div className="text-[10px] text-grey-400 mt-0.5">
                              {new Date(lead.createdAt).toLocaleDateString()} • {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleStatusChange(lead.id, e.target.value as Lead["status"])
                              }
                              className={`text-[11px] font-semibold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${getStatusBadge(
                                lead.status
                              )}`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="FOLLOW_UP">FOLLOW UP</option>
                              <option value="CONVERTED">CONVERTED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>

                            <button
                              onClick={() => setLeadToDelete(lead)}
                              title="Delete inquiry"
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Project & Package Tag */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="bg-green-900/10 text-green-900 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                            {getProjectName(lead.projectSlug)}
                          </span>
                          {lead.packageSlug && (
                            <span className="bg-ash text-ink text-[11px] font-medium px-2 py-0.5 rounded-md uppercase">
                              Tier: {lead.packageSlug}
                            </span>
                          )}
                        </div>

                        {/* Contact details */}
                        <div className="text-xs space-y-1 bg-ash/50 p-2.5 rounded-xl border border-ink/5">
                          <div className="flex items-center justify-between">
                            <span className="text-grey-500 font-medium">Phone:</span>
                            <a href={`tel:${lead.phone}`} className="font-mono text-green-900 font-semibold hover:underline flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-green-900 flex-shrink-0" />
                              <span>{lead.phone}</span>
                            </a>
                          </div>
                          {lead.email && (
                            <div className="flex items-center justify-between text-grey-600 truncate">
                              <span className="text-grey-500 font-medium">Email:</span>
                              <a href={`mailto:${lead.email}`} className="truncate hover:underline text-[11px] flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-grey-400 flex-shrink-0" />
                                <span>{lead.email}</span>
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Inquiry Note */}
                        {lead.message && (
                          <p className="text-xs text-grey-700 italic bg-paper p-2 rounded-lg border border-ink/5">
                            &ldquo;{lead.message}&rdquo;
                          </p>
                        )}

                        {/* Internal Sales Follow-up Note */}
                        <div className="flex items-center justify-between pt-0.5">
                          {lead.notes ? (
                            <p className="text-[11px] text-emerald-800 line-clamp-1 font-medium flex-1 mr-2 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                              <span>{lead.notes}</span>
                            </p>
                          ) : (
                            <span className="text-[11px] text-grey-400">No sales remarks yet</span>
                          )}
                          <button
                            onClick={() => {
                              setSelectedLeadForNotes(lead);
                              setLeadNoteInput(lead.notes || "");
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-900 hover:underline cursor-pointer flex-shrink-0"
                          >
                            <FileText className="w-3 h-3" />
                            <span>{lead.notes ? "Edit" : "+ Add Note"}</span>
                          </button>
                        </div>

                        {/* Mobile Action Buttons (Full-Width Touch Targets) */}
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ink/10">
                          <a
                            href={`https://wa.me/${waPhone}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-green-900 hover:bg-green-800 text-white text-xs font-semibold shadow-xs transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Direct Call</span>
                          </a>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PACKAGES & PRICING MANAGER */}
        {activeTab === "packages" && (
          <div className="space-y-6">

            <div className="bg-white p-4 rounded-2xl border border-ink/10 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-ink">
                  Package Pricing & Booking Money Controller
                </h2>
                <p className="text-xs text-grey-700">
                  Update package prices and booking money live. Updates immediately reflect on the website and calculator.
                </p>
              </div>

              {saveSuccessMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}
            </div>

            {/* Packages Table & Mobile Cards */}
            <div className="bg-white rounded-2xl border border-ink/10 shadow-xs overflow-hidden">

              {/* DESKTOP TABLE VIEW (Visible on tablet & desktop) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-ash/50 border-b border-ink/10 text-grey-700 uppercase tracking-wider text-[11px] font-semibold">
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Tier Multiplier</th>
                      <th className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1">
                          <BdtIcon className="w-3.5 h-3.5 text-ink" />
                          <span>Total Price (BDT)</span>
                        </span>
                      </th>
                      <th className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1">
                          <BdtIcon className="w-3.5 h-3.5 text-green-900" />
                          <span>Booking Money (BDT)</span>
                        </span>
                      </th>
                      <th className="py-3.5 px-4">Accommodation Days</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {packagesList.map((pkg) => {
                      const isEditing = editingPkgId === pkg.id;

                      return (
                        <tr key={pkg.id} className="hover:bg-sand/20 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-ink">
                            {getProjectName(pkg.projectSlug)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold uppercase text-green-900 bg-green-900/10 px-2 py-0.5 rounded">
                              {pkg.tier} ({pkg.unitMultiplier}x)
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                                className="w-32 px-2 py-1 bg-paper border border-ink/30 rounded font-mono text-xs"
                              />
                            ) : (
                              <div>
                                <span className="inline-flex items-center gap-0.5">
                                  <BdtIcon className="w-3 h-3 text-ink" />
                                  <span>{formatLakhBDT(pkg.price, "en")}</span>
                                </span>
                                <span className="text-[10px] text-grey-500 block">
                                  (৳ {pkg.price.toLocaleString("en-IN")})
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-green-900">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editBooking}
                                onChange={(e) => setEditBooking(parseInt(e.target.value) || 0)}
                                className="w-28 px-2 py-1 bg-paper border border-ink/30 rounded font-mono text-xs"
                              />
                            ) : (
                              <div>
                                <span className="inline-flex items-center gap-0.5">
                                  <BdtIcon className="w-3 h-3 text-green-900" />
                                  <span>{formatLakhBDT(pkg.bookingMoney, "en")}</span>
                                </span>
                                <span className="text-[10px] text-grey-500 block">
                                  (৳ {pkg.bookingMoney.toLocaleString("en-IN")})
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {pkg.stayDays ? `${pkg.stayDays} days` : "—"}
                            {pkg.stayDaysDfi ? ` (+ DFI ${pkg.stayDaysDfi}d)` : ""}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleSavePackage(pkg.id)}
                                  className="p-1.5 bg-green-900 hover:bg-green-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                                  title="Save price"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingPkgId(null)}
                                  className="p-1.5 border border-ink/20 hover:bg-ash text-grey-700 rounded-lg text-xs cursor-pointer"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingPkgId(pkg.id);
                                  setEditPrice(pkg.price);
                                  setEditBooking(pkg.bookingMoney);
                                }}
                                className="inline-flex items-center gap-1 text-xs text-green-900 hover:underline cursor-pointer font-medium"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit Pricing</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE APP-STYLE CARD VIEW (Visible on mobile screens) */}
              <div className="block md:hidden divide-y divide-ink/10">
                {packagesList.map((pkg) => {
                  const isEditing = editingPkgId === pkg.id;

                  return (
                    <div key={pkg.id} className="p-4 space-y-3 bg-white hover:bg-sand/10 transition-colors">
                      {/* Top: Project Name & Tier Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-serif font-bold text-ink text-sm sm:text-base leading-tight">
                            {getProjectName(pkg.projectSlug)}
                          </div>
                          <span className="font-bold uppercase text-green-900 bg-green-900/10 px-2 py-0.5 rounded text-[10px] inline-block mt-1">
                            {pkg.tier} ({pkg.unitMultiplier}x Unit)
                          </span>
                        </div>

                        {(pkg.stayDays ?? 0) > 0 && (
                          <span className="text-[11px] text-grey-600 bg-ash px-2 py-1 rounded-md text-right inline-flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-grey-600 flex-shrink-0" />
                            <span>{pkg.stayDays}d{pkg.stayDaysDfi ? ` + DFI ${pkg.stayDaysDfi}d` : ""}</span>
                          </span>
                        )}
                      </div>

                      {/* Pricing Box with Taka Symbol */}
                      <div className="bg-ash/50 p-3 rounded-xl border border-ink/5 space-y-2.5">
                        {/* Total Price */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-grey-600 flex items-center gap-1 font-medium">
                            <BdtIcon className="w-3.5 h-3.5 text-ink" />
                            <span>Total Price:</span>
                          </span>
                          {isEditing ? (
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                              className="w-32 px-2 py-1 bg-white border border-ink/30 rounded font-mono text-xs text-right font-bold"
                            />
                          ) : (
                            <div className="text-right">
                              <span className="font-mono font-bold text-ink text-xs sm:text-sm">
                                {formatLakhBDT(pkg.price, "en")}
                              </span>
                              <span className="text-[10px] text-grey-500 block">
                                (৳ {pkg.price.toLocaleString("en-IN")})
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Booking Money */}
                        <div className="flex items-center justify-between border-t border-ink/5 pt-2">
                          <span className="text-xs text-green-900 font-semibold flex items-center gap-1">
                            <BdtIcon className="w-3.5 h-3.5 text-green-900" />
                            <span>Booking Money:</span>
                          </span>
                          {isEditing ? (
                            <input
                              type="number"
                              value={editBooking}
                              onChange={(e) => setEditBooking(parseInt(e.target.value) || 0)}
                              className="w-28 px-2 py-1 bg-white border border-ink/30 rounded font-mono text-xs text-right font-bold text-green-900"
                            />
                          ) : (
                            <div className="text-right">
                              <span className="font-mono font-bold text-green-900 text-xs sm:text-sm">
                                {formatLakhBDT(pkg.bookingMoney, "en")}
                              </span>
                              <span className="text-[10px] text-grey-500 block">
                                (৳ {pkg.bookingMoney.toLocaleString("en-IN")})
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Row */}
                      <div>
                        {isEditing ? (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleSavePackage(pkg.id)}
                              className="py-2.5 px-3 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Price</span>
                            </button>
                            <button
                              onClick={() => setEditingPkgId(null)}
                              className="py-2.5 px-3 border border-ink/20 hover:bg-ash text-grey-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingPkgId(pkg.id);
                              setEditPrice(pkg.price);
                              setEditBooking(pkg.bookingMoney);
                            }}
                            className="w-full py-2.5 px-3 bg-white hover:bg-ash border border-ink/20 rounded-xl text-xs text-green-900 font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Package Price & Booking Money</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: ADMIN USERS MANAGEMENT */}
        {activeTab === "admins" && (
          <div className="space-y-6">
            {/* Header & Quick Actions */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-ink/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-green-900/10 text-green-900 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-ink">
                      Admin Accounts & Security Roles
                    </h2>
                    <p className="text-xs text-grey-600 mt-0.5">
                      Manage executive staff credentials, access levels, and role privileges
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={fetchAdmins}
                  className="px-3.5 py-2 border border-ink/20 hover:bg-ash text-grey-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Refresh admin list"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAdmins ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <button
                  onClick={() => {
                    setIsCreateAdminOpen(true);
                    setCreateAdminError(null);
                    setCreateAdminSuccess(null);
                  }}
                  className="px-4 py-2 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ Add New Admin</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-ink/10 shadow-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-grey-600">
                  Total Admins
                </span>
                <div className="font-serif text-2xl font-bold text-ink">
                  {adminUsersList.length}
                </div>
                <p className="text-[10px] text-grey-500">Authorized accounts</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Super Admins</span>
                </span>
                <div className="font-serif text-2xl font-bold text-amber-900">
                  {adminUsersList.filter((a) => a.role === "SUPER_ADMIN").length}
                </div>
                <p className="text-[10px] text-amber-700">Full system access</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-ink/10 shadow-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-green-900 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-900" />
                  <span>Standard Admins</span>
                </span>
                <div className="font-serif text-2xl font-bold text-ink">
                  {adminUsersList.filter((a) => a.role === "ADMIN").length}
                </div>
                <p className="text-[10px] text-grey-500">CRM & Pricing managers</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-ink/10 shadow-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-grey-600 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-grey-600" />
                  <span>Moderators</span>
                </span>
                <div className="font-serif text-2xl font-bold text-ink">
                  {adminUsersList.filter((a) => a.role === "MODERATOR").length}
                </div>
                <p className="text-[10px] text-grey-500">View & notes access</p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-ink/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-grey-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  placeholder="Search admin name or email..."
                  className="w-full pl-9 pr-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={adminRoleFilter}
                  onChange={(e) => setAdminRoleFilter(e.target.value)}
                  className="px-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs font-medium focus:border-green-900 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="SUPER_ADMIN">Super Admin Only</option>
                  <option value="ADMIN">Standard Admin Only</option>
                  <option value="MODERATOR">Moderator Only</option>
                </select>
              </div>
            </div>

            {/* Admin Users List: Desktop Table & Mobile Cards */}
            <div className="bg-white rounded-2xl border border-ink/10 shadow-xs overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-ash/70 border-b border-ink/10 text-grey-700 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Admin User</th>
                      <th className="py-3 px-4">Role & Permissions</th>
                      <th className="py-3 px-4">Access Level</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Created Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {filteredAdmins.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-grey-500 text-xs">
                          No admin accounts match your search.
                        </td>
                      </tr>
                    ) : (
                      filteredAdmins.map((admin) => {
                        const isCurrent = admin.email.toLowerCase().trim() === adminUser?.email?.toLowerCase().trim();
                        return (
                          <tr key={admin.id || admin.email} className="hover:bg-sand/15 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-900/10 text-green-900 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                  {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
                                </div>
                                <div>
                                  <div className="font-semibold text-ink flex items-center gap-1.5">
                                    <span>{admin.name}</span>
                                    {isCurrent && (
                                      <span className="text-[10px] font-bold text-green-900 bg-green-900/10 px-1.5 py-0.2 rounded">
                                        You
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-grey-500 font-mono">{admin.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                                  admin.role === "SUPER_ADMIN"
                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                    : admin.role === "ADMIN"
                                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                    : "bg-blue-100 text-blue-900 border border-blue-300"
                                }`}
                              >
                                {admin.role === "SUPER_ADMIN" && (
                                  <ShieldCheck className="w-3 h-3 text-amber-700" />
                                )}
                                {admin.role === "ADMIN" && (
                                  <Shield className="w-3 h-3 text-emerald-700" />
                                )}
                                {admin.role === "MODERATOR" && (
                                  <Users className="w-3 h-3 text-blue-700" />
                                )}
                                <span>{admin.role.replace("_", " ")}</span>
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-grey-600">
                              {admin.role === "SUPER_ADMIN" && "Full System & User Control"}
                              {admin.role === "ADMIN" && "Full CRM & Pricing Access"}
                              {admin.role === "MODERATOR" && "Read-Only & Consultation Notes"}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span>Active</span>
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-grey-500">
                              {admin.createdAt
                                ? new Date(admin.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "Default"}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              {isCurrent ? (
                                <span className="text-[11px] text-grey-400 italic">Current Session</span>
                              ) : (
                                <button
                                  onClick={() => setAdminToDelete(admin)}
                                  className="p-1.5 text-grey-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Remove admin account"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="block md:hidden divide-y divide-ink/10">
                {filteredAdmins.length === 0 ? (
                  <div className="p-6 text-center text-grey-500 text-xs">
                    No admin accounts match your search.
                  </div>
                ) : (
                  filteredAdmins.map((admin) => {
                    const isCurrent = admin.email.toLowerCase().trim() === adminUser?.email?.toLowerCase().trim();
                    return (
                      <div key={admin.id || admin.email} className="p-4 space-y-3 bg-white">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-green-900/10 text-green-900 font-bold flex items-center justify-center text-sm flex-shrink-0">
                              {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
                            </div>
                            <div>
                              <div className="font-bold text-ink text-sm flex items-center gap-1.5">
                                <span>{admin.name}</span>
                                {isCurrent && (
                                  <span className="text-[10px] font-bold text-green-900 bg-green-900/10 px-1.5 py-0.2 rounded">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-grey-500 font-mono">{admin.email}</div>
                            </div>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              admin.role === "SUPER_ADMIN"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : admin.role === "ADMIN"
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : "bg-blue-100 text-blue-900 border border-blue-300"
                            }`}
                          >
                            {admin.role.replace("_", " ")}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-grey-600 bg-ash/50 p-2.5 rounded-xl border border-ink/5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Active Account</span>
                          </div>
                          <span className="text-grey-500 text-[11px]">
                            {admin.createdAt
                              ? new Date(admin.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Default"}
                          </span>
                        </div>

                        {!isCurrent && (
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => setAdminToDelete(admin)}
                              className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove Admin</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Internal Sales Notes Modal */}
      {selectedLeadForNotes && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-ink/10">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-ink">
                  Internal Sales Note
                </h3>
                <p className="text-xs text-grey-700">
                  Client: {selectedLeadForNotes.fullName} ({selectedLeadForNotes.phone})
                </p>
              </div>
              <button
                onClick={() => setSelectedLeadForNotes(null)}
                className="p-1 text-grey-500 hover:text-ink cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-grey-700 mb-2">
                Follow-up Notes / Consultation Records
              </label>
              <textarea
                rows={4}
                value={leadNoteInput}
                onChange={(e) => setLeadNoteInput(e.target.value)}
                placeholder="e.g. Client interested in 5x Gold tier. Meeting scheduled at Dhanmondi head office next Tuesday..."
                className="w-full p-3 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedLeadForNotes(null)}
                className="px-4 py-2 border border-ink/20 text-xs font-semibold rounded-xl hover:bg-ash cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-green-900 hover:bg-green-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-ink/10">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-green-900/10 text-green-900 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-ink">
                    Change Admin Password
                  </h3>
                  <p className="text-[11px] text-grey-500">{adminUser?.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="p-1 text-grey-500 hover:text-ink cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {changePassError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{changePassError}</span>
              </div>
            )}

            {changePassSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{changePassSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3.5">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-semibold text-grey-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full pl-3 pr-10 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-2.5 text-grey-400 hover:text-ink cursor-pointer focus:outline-none"
                    title={showCurrentPass ? "Hide password" : "Show password"}
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4 text-green-900" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-grey-700 mb-1">
                  New Password (min 6 characters)
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Enter new strong password"
                    className="w-full pl-3 pr-10 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-2.5 text-grey-400 hover:text-ink cursor-pointer focus:outline-none"
                    title={showNewPass ? "Hide password" : "Show password"}
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4 text-green-900" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-grey-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Re-enter new password"
                    className="w-full pl-3 pr-10 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-2.5 text-grey-400 hover:text-ink cursor-pointer focus:outline-none"
                    title={showConfirmPass ? "Hide password" : "Show password"}
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4 text-green-900" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-4 py-2 border border-ink/20 text-xs font-semibold rounded-xl hover:bg-ash cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={changePassLoading}
                  className="px-4 py-2 bg-green-900 hover:bg-green-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {changePassLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Admin Modal */}
      {isCreateAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-ink/10">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-green-900/10 text-green-900 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-ink">
                    Create Admin Account
                  </h3>
                  <p className="text-[11px] text-grey-500">Authorize executive staff</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateAdminOpen(false)}
                className="p-1 text-grey-500 hover:text-ink cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createAdminError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{createAdminError}</span>
              </div>
            )}

            {createAdminSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{createAdminSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-grey-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  required
                  placeholder="e.g. Sales Director"
                  className="w-full px-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-grey-700 mb-1">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  required
                  placeholder="director@sunsetkuakata.com"
                  className="w-full px-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-grey-700 mb-1">
                  Role & Permissions
                </label>
                <select
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value)}
                  className="w-full px-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none cursor-pointer"
                >
                  <option value="ADMIN">ADMIN (Full CRM & Price Access)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Owner / Full Access)</option>
                  <option value="MODERATOR">MODERATOR (View & Notes Only)</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-grey-700 mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <input
                    type={showCreatePass ? "text" : "password"}
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Enter password for new admin"
                    className="w-full pl-3 pr-10 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePass(!showCreatePass)}
                    className="absolute right-3 top-2.5 text-grey-400 hover:text-ink cursor-pointer focus:outline-none"
                    title={showCreatePass ? "Hide password" : "Show password"}
                  >
                    {showCreatePass ? <EyeOff className="w-4 h-4 text-green-900" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateAdminOpen(false)}
                  className="px-4 py-2 border border-ink/20 text-xs font-semibold rounded-xl hover:bg-ash cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={createAdminLoading}
                  className="px-4 py-2 bg-green-900 hover:bg-green-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {createAdminLoading ? "Creating..." : "Create Admin Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Inquiry Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-ink/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-ink">
                  Delete Inquiry
                </h3>
                <p className="text-xs text-grey-600">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-grey-700 bg-ash/60 p-3 rounded-xl border border-ink/5">
              Are you sure you want to permanently delete the inquiry from <strong className="text-ink">{leadToDelete.fullName}</strong> ({leadToDelete.phone})?
            </p>

            <div className="flex justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                className="px-4 py-2 border border-ink/20 text-xs font-semibold rounded-xl hover:bg-ash cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteLead}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Admin Confirmation Modal */}
      {adminToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-ink/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-ink">
                  Remove Admin Account
                </h3>
                <p className="text-xs text-grey-600">Revoke administrative dashboard privileges</p>
              </div>
            </div>

            <p className="text-xs text-grey-700 bg-ash/60 p-3 rounded-xl border border-ink/5">
              Are you sure you want to remove <strong className="text-ink">{adminToDelete.name}</strong> ({adminToDelete.email})? This user will no longer be able to sign in.
            </p>

            <div className="flex justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setAdminToDelete(null)}
                className="px-4 py-2 border border-ink/20 text-xs font-semibold rounded-xl hover:bg-ash cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAdmin}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Yes, Remove Admin
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboardClient;
