import type { ReactNode } from "react";

const PORTFOLIO_URL = "https://moitinho.dev";
const EMAIL = "joao@moitinho.dev";

const navLinks = [
  { href: `${PORTFOLIO_URL}/work`, label: "Work" },
  { href: `${PORTFOLIO_URL}/bio`, label: "Bio" },
  { href: `${PORTFOLIO_URL}/info`, label: "Info" },
];

const socials = [
  { href: "https://github.com/eumoitinho", label: "GitHub" },
  { href: "https://www.linkedin.com/in/eumoitinho", label: "LinkedIn" },
  { href: "https://www.behance.net/joaomoitinh1", label: "Behance" },
];

export function PortfolioChrome({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div className="portfolio-chrome">
      <header className="portfolio-header">
        <div className="portfolio-header-inner">
          <a href={PORTFOLIO_URL} className="portfolio-brand">
            @eumoitinho
          </a>
          <nav className="portfolio-nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="portfolio-nav-link">
                {link.label}
              </a>
            ))}
            <span className="portfolio-nav-link portfolio-nav-link-active" aria-current="page">
              Contato
            </span>
          </nav>
        </div>
      </header>

      <main className="portfolio-main">{children}</main>

      <footer className="portfolio-footer">
        <div className="portfolio-footer-inner">
          <div className="portfolio-footer-headline">
            <h2 className="portfolio-footer-title">
              Let&apos;s work
              <br />
              together.
            </h2>
            <a href={`mailto:${EMAIL}`} className="portfolio-footer-email">
              {EMAIL}
            </a>
          </div>

          <div className="portfolio-footer-bottom">
            <div className="portfolio-footer-copy">
              &copy; {year} João Vitor Moitinho.
              <br />
              All rights reserved.
            </div>
            <div className="portfolio-footer-socials">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-footer-social">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
