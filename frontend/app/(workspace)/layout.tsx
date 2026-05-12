"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getAuthToken,
  verifyToken,
  removeAuthToken,
  getCurrentUser,
} from "@/lib/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Search,
  FileText,
  Settings,
  LogOut,
  User,
  FileCheck,
  Users,
  SquareStack,
  SquareDashed,
  Box,
  ScanSearch,
  ContactRound,
  Phone,
  MessagesSquare,
  BotMessageSquare,
  ChevronDown,
} from "lucide-react";

function SidebarHeaderContent({
  organizationName,
}: {
  organizationName: string | null;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <img
        src="/logos/Lumina-logo-transparent.svg"
        alt="Lumina"
        className={`object-contain ${isCollapsed ? "h-8 w-10" : "h-9 w-full max-w-[140px]"}`}
      />
      {/* Company name - hidden when collapsed */}
      {!isCollapsed && (
        <div className="text-center">
          <h2 className="text-sm font-semibold text-[#37322F]">
            {organizationName || "Organization"}
          </h2>
        </div>
      )}
    </div>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname === "/leads") {
    return "Leads";
  }
  if (pathname === "/call-agent") {
    return "Call Agent";
  }
  if (pathname.startsWith("/lead-qualification")) {
    return "Lead Qualifier";
  }
  if (pathname === "/research-agent") {
    return "Research Agent";
  }
  if (pathname === "/research-browser-run") {
    return "Proposal Agent";
  }
  if (pathname === "/home" || pathname === "/") {
    return "Home";
  } else if (pathname === "/main-page-1") {
    return "Main Page 1";
  } else if (pathname === "/reports") {
    return "Main Page 2";
  } else if (pathname === "/team") {
    return "Team";
  } else if (pathname === "/demo-report-list") {
    return "Sample Dashboard";
  } else if (pathname.startsWith("/demo-report")) {
    return "Item Details";
  } else if (pathname === "/settings") {
    return "Settings";
  }
  return "Home";
}

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aiWorkersOpen, setAiWorkersOpen] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  const [userData, setUserData] = useState<{
    user: {
      IdUser: string;
      Name: string;
      Email: string;
      Role: string;
      IdOrganization: string | null;
    };
    organization: {
      IdOrganization: string;
      Name: string;
      Type: string | null;
    } | null;
  } | null>(null);
  // When NEXT_PUBLIC_BYPASS_AUTH=1, skip real auth (local dev or Vercel demo)
  const isBypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === "1";
  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    const checkAuth = async () => {
      if (isBypassAuth) {
        setUserData({
          user: {
            IdUser: "dev-user-id",
            Name: "Taylor Appleseed",
            Email: "taylor@farmersinsurance.com",
            Role: "admin",
            IdOrganization: "dev-org-id",
          },
          organization: {
            IdOrganization: "dev-org-id",
            Name: "Taylor Appleseed Farmers Insurance",
            Type: "sample",
          },
        });
        setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }

      const token = getAuthToken();

      if (!token) {
        router.push("/login");
        return;
      }

      // Verify token with backend and get user data
      const isValid = await verifyToken(token);

      if (!isValid) {
        // Remove invalid token
        localStorage.removeItem("auth_token");
        router.push("/login");
        return;
      }

      // Fetch user data with organization
      const userInfo = await getCurrentUser();
      if (userInfo) {
        setUserData(userInfo);
      }

      setIsAuthenticated(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [router, isBypassAuth]);

  // Show loading state while checking authentication
  if (isChecking || !isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-[#37322F]">Loading...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" data-sidebar="sidebar">
        <SidebarHeader>
          <SidebarHeaderContent
            organizationName={userData?.organization?.Name || null}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Leads */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Leads"
                    isActive={pathname.startsWith("/leads")}
                    asChild
                  >
                    <Link href="/leads">
                      <ContactRound className="size-4" />
                      <span>Leads</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* AI Workers collapsible */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="AI Workers"
                    onClick={() => setAiWorkersOpen((o) => !o)}
                    className="w-full"
                  >
                    <BotMessageSquare className="size-4" />
                    <span>AI Workers</span>
                    <ChevronDown
                      className={`size-3.5 ml-auto transition-transform duration-200 ${aiWorkersOpen ? "" : "-rotate-90"}`}
                    />
                  </SidebarMenuButton>

                  {aiWorkersOpen && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/call-agent"}
                        >
                          <Link href="/call-agent">
                            <Phone className="size-3" />
                            <span className="text-xs">Call Agent</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname.startsWith("/lead-qualification")}
                        >
                          <Link href="/lead-qualification">
                            <MessagesSquare className="size-3" />
                            <span className="text-xs">Lead Qualifier</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/research-agent"}
                        >
                          <Link href="/research-agent">
                            <ScanSearch className="size-3" />
                            <span className="text-xs">Research Agent</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {/* Early Access */}
          <div className="px-3 pb-2">
            <a
              href="https://calendar.app.google/oyQHduj2cSYvidjG6"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#6c70ba] hover:bg-[#6c70ba]/90 transition-colors text-white text-xs font-medium"
            >
              Get Early Access
            </a>
          </div>
          {/* Connected integrations */}
          <div className="px-3 py-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Connected</p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <img src="/AgencyZoom-removebg-preview.png" alt="AgencyZoom" className="h-3 w-auto object-contain" />
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <img src="/RingCentral_logo.png" alt="RingCentral" className="h-3 w-auto object-contain" />
              </div>
            </div>
          </div>
          <SidebarMenu>
            {/* User info section */}
            {userData && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={userData.user.Name}
                  className="w-full cursor-default"
                  disabled
                >
                  <User className="size-4" />
                  <span className="truncate">
                    {userData.user.Name}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Sign out"
                onClick={() => {
                  removeAuthToken();
                  router.push("/login");
                }}
                className="w-full"
              >
                <LogOut className="size-4" />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {/* Header with sidebar toggle – visible on all workspace pages */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 workspace-page-header">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold text-[#37322F]">
            {pageTitle}
          </h1>
        </header>
        {/* Main content area */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
