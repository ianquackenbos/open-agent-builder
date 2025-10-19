"use client";

import { GeistMono } from "geist/font/mono";
import { Roboto_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import ColorStyles from "@/components/shared/color-styles/color-styles";
import Scrollbar from "@/components/ui/scrollbar";
import { BigIntProvider } from "@/components/providers/BigIntProvider";
import "styles/main.css";
import "styles/brand-overrides.css";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
});

// Metadata must be in a separate server component
// For now, set via document head

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const AppContent = () => (
    <html lang="en">
      <head>
        <title>SUSE Agent Builder</title>
        <meta name="description" content="Build, test, and deploy AI agent workflows with a visual no-code interface." />
        <meta property="og:title" content="SUSE Agent Builder" />
        <meta property="og:description" content="Build, test, and deploy AI agent workflows with a visual no-code interface." />
        <meta name="twitter:title" content="SUSE Agent Builder" />
        <meta name="twitter:description" content="Build, test, and deploy AI agent workflows with a visual no-code interface." />
        <link rel="icon" href="/favicon.png" />
        <ColorStyles />
      </head>
      <body
        className={`${GeistMono.variable} ${robotoMono.variable} font-sans text-accent-black bg-background-base overflow-x-clip`}
      >
        <BigIntProvider>
          <main className="overflow-x-clip">{children}</main>
          <Scrollbar />
          <Toaster position="bottom-right" />
        </BigIntProvider>
      </body>
    </html>
  );
  
  return (
    <AuthProvider>
      {convex ? (
        <ConvexProvider client={convex}>
          <AppContent />
        </ConvexProvider>
      ) : (
        <AppContent />
      )}
    </AuthProvider>
  );
}

