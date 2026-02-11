import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";


import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import ScrollReset from "@/components/ScrollReset";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
/* -------------------------------------
   SEO METADATA
------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "Ashwin Sheth | Immersive Experience",
    template: "%s | Ashwin Sheth",
  },

  description: "A cinematic, luxury-grade scroll experience powered by Ashwin Sheth.",

  applicationName: "Ashwin Sheth",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    "Ashwin Sheth",
    "Luxury Website",
    "GSAP Scroll Experience",
    "Cinematic UI",
    "Next.js Premium Website",
  ],

  authors: [{ name: "Ashwin Sheth Studio", url: "https://your-domain.com" }],
  creator: "Ashwin Sheth Studio",
  publisher: "Ashwin Sheth Studio",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://your-domain.com",
    siteName: "Ashwin Sheth",
    title: "Ashwin Sheth | Immersive Experience",
    description: "A cinematic scroll journey with premium motion design.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashwin Sheth – Immersive Experience",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ashwin Sheth | Immersive Experience",
    description: "A cinematic scroll journey with premium motion design.",
    images: ["/og-image.jpg"],
  },
};

/* -------------------------------------
   VIEWPORT
------------------------------------- */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0B" },
  ],
};

/* -------------------------------------
   ROOT LAYOUT
------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased bg-black text-white pointer-events-auto`}>
        {/* <SmoothScroll>
          <Loader />
          <Header /> */}
           <ScrollReset />
          <main>{children}</main>
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}



// import { Montserrat } from "next/font/google";
// import "./globals.css";
// import type { Metadata } from "next";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   display: "swap",
//   variable: "--font-montserrat",
// });

// export const metadata: Metadata = {
//   title: "Antigravity | Immersive Experience",
//   description: "A cinematic scroll journey.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={montserrat.variable}>
//       <body>{children}</body>
//     </html>
//   );
// }

