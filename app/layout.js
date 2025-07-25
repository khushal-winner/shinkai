import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/custom/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shinkai",
  description: "AI Resume Builder, Cover Letter Generator, and Interview Prep",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystemdisableTransitionOnChange
          >
            {/* header */}
            <Header />

            <main className="min-h-screen mb-64">
              <Toaster richColors />
              {children}
            </main>
            {/* footer */}
            <footer className="bg-muted/65 py-12">
              <div className="container mx-auto text-center text-gray-200">
                <p>Made with ❤️ by Khushal</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
