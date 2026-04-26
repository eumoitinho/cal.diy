import { headers } from "next/headers";
import { Inter, Playfair_Display, Space_Grotesk, Space_Mono } from "next/font/google";

import "../../styles/booking-portfolio.css";

import PageWrapper from "@components/PageWrapperAppDir";
import { PortfolioChrome } from "@components/PortfolioChrome";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfairFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const spaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const spaceMonoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const portfolioFontVars = `${interFont.variable} ${playfairFont.variable} ${spaceGroteskFont.variable} ${spaceMonoFont.variable}`;

export default async function BookingPageWrapperLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const nonce = h.get("x-csp-nonce") ?? undefined;

  return (
    <div className={`portfolio-theme ${portfolioFontVars}`}>
      <PageWrapper isBookingPage={true} requiresLicense={false} nonce={nonce}>
        <PortfolioChrome>{children}</PortfolioChrome>
      </PageWrapper>
    </div>
  );
}
