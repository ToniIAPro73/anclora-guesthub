import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { AppPreferencesProvider } from "@/components/AppPreferencesProvider";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  // Legacy endpoint: anclora-syncxml.vercel.app — pending owner domain decision.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://anclora-syncxml.vercel.app",
  ),
  title: "Anclora GuestHub",
  description: "Gestión de huéspedes, check-in y operación de alquiler vacacional.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        {/* Legacy storage/cookie keys (anclora-syncxml-*) kept intentionally after the
            Anclora SyncXML → Anclora GuestHub rename (2026-08): renaming them would
            reset saved theme/language for returning users. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('anclora-syncxml-theme') || 'dark';
                  var params = new URLSearchParams(window.location.search);
                  var rawLanguage = params.get('lang') || params.get('locale') || localStorage.getItem('anclora-syncxml-language') || ((navigator.languages && navigator.languages[0]) || navigator.language || 'es');
                  var language = String(rawLanguage).toLowerCase().split(/[-_]/)[0];
                  if (language !== 'en' && language !== 'de') language = 'es';
                  var resolved = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : theme;
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.lang = language;
                  document.cookie = 'anclora-syncxml-theme=' + theme + '; path=/; max-age=31536000; SameSite=Lax';
                  document.cookie = 'anclora-syncxml-language=' + language + '; path=/; max-age=31536000; SameSite=Lax';
                  document.documentElement.classList.toggle('light', resolved === 'light');
                  document.documentElement.classList.toggle('dark', resolved !== 'light');
                } catch (error) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  document.body.removeAttribute('cz-shortcut-listen');
                } catch (error) {}
              })();
            `,
          }}
        />
        <AppPreferencesProvider>
          <AppShell>{children}</AppShell>
        </AppPreferencesProvider>
      </body>
    </html>
  );
}
