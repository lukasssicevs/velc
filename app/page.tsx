"use client";

// Content is sourced from the Notion working doc. Update both places if copy changes.
// See CLAUDE.md for context and how to extend this file.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  LightbulbIcon,
  PaletteIcon,
  CodeIcon,
  RocketIcon,
  LifebuoyIcon,
  GlobeIcon,
  AppStoreLogoIcon,
  GooglePlayLogoIcon,
  GoogleChromeLogoIcon,
  PackageIcon,
  ArrowsClockwiseIcon,
  CompassIcon,
} from "@phosphor-icons/react";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#build", label: "What we build" },
  { href: "#together", label: "Working together" },
  { href: "#contact", label: "Contact" },
];

function getLinkIcon(label: string) {
  if (label.includes("App Store")) return AppStoreLogoIcon;
  if (label.includes("Google Play")) return GooglePlayLogoIcon;
  if (label.includes("Chrome extension")) return GoogleChromeLogoIcon;
  if (label.includes("Web app")) return GlobeIcon;
  return null;
}

export default function Home() {
  return (
    <main className="min-h-screen pt-[81px]">
      <Header />
      <Hero />
      <WhatWeBuild />
      <SelectedWork />
      <WorkingTogether />
      <WhoWeAreAndContact />
      <Footer />
    </main>
  );
}

function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      const scrollingDown = delta > 5;
      const scrollingUp = delta < -5;
      const pastHeaderHeight = y > 80;

      if (scrollingDown && pastHeaderHeight) {
        setHidden(true);
      } else if (scrollingUp || y <= 80) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b hairline bg-bg transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-page px-6 py-5 flex items-center justify-center sm:justify-between">
        <span className="font-logo italic font-medium text-ink text-4xl tracking-tight">
          VELC
        </span>
        <nav className="hidden sm:flex gap-6 eyebrow">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link-underline">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-page px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <p className="eyebrow mb-5 flex items-center justify-center sm:justify-start gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        Currently taking on new projects
      </p>
      <h1 className="font-display font-semibold text-ink text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-3xl text-center sm:text-left">
        We design, build, and ship whole products.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed text-center sm:text-left mx-auto sm:mx-0">
        Two people. No layers. One builds, one runs the client side.
        You work directly with both of us.
      </p>

      <Schematic />
    </section>
  );
}

// Signature element: the "two people, no layers" claim drawn as an actual
// system diagram rather than described. Idea -> Build -> Ship -> Client -> Support.
function Schematic() {
  const nodes = [
    { label: "IDEA", icon: LightbulbIcon },
    { label: "DESIGN", icon: PaletteIcon },
    { label: "BUILD", icon: CodeIcon },
    { label: "DEPLOY", icon: RocketIcon },
    { label: "SUPPORT", icon: LifebuoyIcon },
  ];

  return (
    <div className="mt-16">
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:min-w-[760px] lg:pb-2">
        {nodes.map((node, i) => (
          <div
            key={node.label}
            className="flex flex-col items-center lg:flex-row lg:items-start"
          >
            <div className="flex flex-col items-center w-24 shrink-0">
              <div
                className="h-11 w-11 rounded-full border border-accent flex items-center justify-center [animation-name:node-pulse]"
                style={{
                  animationDuration: "12s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${i * 2}s`,
                }}
              >
                <node.icon className="h-5 w-5 text-accent" weight="regular" />
              </div>
              <span className="mt-3 eyebrow text-ink/80 text-center">
                {node.label}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <div className="relative w-px h-8 lg:w-14 lg:h-px my-2 lg:my-0 lg:mx-2 lg:mt-[22px]">
                <div
                  className="absolute inset-0 bg-hairline [animation-name:line-pulse]"
                  style={{
                    animationDuration: "12s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "ease-in-out",
                    animationDelay: `${i * 2 + 0.6}s`,
                  }}
                />
                <span
                  className="absolute h-1.5 w-1.5 rounded-full bg-ink opacity-0 top-0 left-1/2 -translate-x-1/2 lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:translate-x-0 [animation-name:dot-travel-v] lg:[animation-name:dot-travel-h]"
                  style={{
                    animationDuration: "12s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "ease-in-out",
                    animationDelay: `${i * 2 + 0.6}s`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatWeBuild() {
  return (
    <section id="build" className="border-t hairline">
      <div className="mx-auto max-w-page px-6 py-16 sm:py-20">
        <p className="eyebrow !text-sm mb-10 text-center sm:text-left">What we build</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-8 mb-10">
          <div className="flex items-center gap-3">
            <GlobeIcon className="h-7 w-7 text-ink" weight="light" />
            <span className="text-base text-ink/80">Web</span>
          </div>
          <div className="flex items-center gap-3">
            <AppStoreLogoIcon className="h-7 w-7 text-ink" weight="light" />
            <span className="text-base text-ink/80">iOS</span>
          </div>
          <div className="flex items-center gap-3">
            <GooglePlayLogoIcon className="h-7 w-7 text-ink" weight="light" />
            <span className="text-base text-ink/80">Android</span>
          </div>
        </div>
        <div className="space-y-6 text-muted leading-relaxed max-w-2xl">
          <p>
            Whole products, taken from an idea to something real people use.
            Design, web, mobile, and backend, all in-house, whether it is for
            your customers (B2C), other businesses (B2B), or your own team.
          </p>
          <p>
            That covers web platforms and dashboards, iOS and Android apps,
            SaaS tools, and AI built into a product that actually works
            rather than a demo. And once it is live, we can stay on to keep
            building.
          </p>
        </div>
      </div>
    </section>
  );
}

type Project = {
  name: string;
  description: string;
  links: { label: string; href: string }[];
  icons?: { src: string; alt: string }[];
  screenshots?: { src: string; alt: string }[];
};

const projects: Project[] = [
  {
    name: "Drippler",
    description:
      "AI fashion app, built solo and shipped. Outfit try-on with AI, look building, trend discovery, and a cross-store wishlist. Design, mobile app, web app, browser extension, and backend, all one person.",
    icons: [{ src: "/work/drippler-icon.png", alt: "Drippler app icon" }],
    screenshots: [
      { src: "/work/screenshots/drippler-1.png", alt: "Drippler screenshot 1" },
      { src: "/work/screenshots/drippler-2.png", alt: "Drippler screenshot 2" },
      { src: "/work/screenshots/drippler-3.png", alt: "Drippler screenshot 3" },
      { src: "/work/screenshots/drippler-4.png", alt: "Drippler screenshot 4" },
      { src: "/work/screenshots/drippler-5.png", alt: "Drippler screenshot 5" },
      { src: "/work/screenshots/drippler-6.png", alt: "Drippler screenshot 6" },
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/drippler-ai-outfit-try-on/id6753986864" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.lukasssicevs.drippler" },
      { label: "Chrome extension", href: "https://chromewebstore.google.com/detail/drippler-extension/gefbchjonjigmadmmfppgckjimhepapj" },
    ],
  },
  {
    name: "Moneliq",
    description:
      "Global payments neobank across web and mobile. Built the web platform, the iOS and Android apps, and the internal dashboard used to run the bank. Later led a small dev team on it.",
    icons: [{ src: "/work/moneliq-icon.png", alt: "Moneliq app icon" }],
    screenshots: [
      { src: "/work/screenshots/moneliq-1.png", alt: "Moneliq screenshot 1" },
      { src: "/work/screenshots/moneliq-2.png", alt: "Moneliq screenshot 2" },
      { src: "/work/screenshots/moneliq-3.png", alt: "Moneliq screenshot 3" },
      { src: "/work/screenshots/moneliq-4.png", alt: "Moneliq screenshot 4" },
      { src: "/work/screenshots/moneliq-5.png", alt: "Moneliq screenshot 5" },
    ],
    links: [
      { label: "Web app", href: "https://app.moneliq.com/" },
      { label: "App Store", href: "https://apps.apple.com/se/app/moneliq-global-payments/id6753301690" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.moneliq.android" },
    ],
  },
  {
    name: "FinMercado",
    description:
      "AI financial companion for Latin America, taken from nothing to live product. Users talk to an AI assistant that helps them understand their money, make borrowing decisions, and access credit and cards. iOS and Android.",
    icons: [{ src: "/work/finmercado-icon.png", alt: "FinMercado app icon" }],
    screenshots: [
      { src: "/work/screenshots/finmercado-1.png", alt: "FinMercado screenshot 1" },
      { src: "/work/screenshots/finmercado-2.png", alt: "FinMercado screenshot 2" },
      { src: "/work/screenshots/finmercado-3.png", alt: "FinMercado screenshot 3" },
      { src: "/work/screenshots/finmercado-4.png", alt: "FinMercado screenshot 4" },
      { src: "/work/screenshots/finmercado-5.png", alt: "FinMercado screenshot 5" },
      { src: "/work/screenshots/finmercado-6.png", alt: "FinMercado screenshot 6" },
      { src: "/work/screenshots/finmercado-7.png", alt: "FinMercado screenshot 7" },
      { src: "/work/screenshots/finmercado-8.png", alt: "FinMercado screenshot 8" },
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/mx/app/pr%C3%A9stamos-y-tarjeta-de-cr%C3%A9dito/id6756575860?l=en-GB" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=mx.finmercado" },
    ],
  },
  {
    name: "White label mobile system",
    description:
      "One codebase running multiple separately branded apps, each with its own brand and market, without rebuilding from scratch. Live across several countries, with attribution and analytics wired in for every brand. The point: launch into new markets, or run the same product under different packaging, without multiplying the build cost.",
    icons: [
      { src: "/work/loanonline-icon.png", alt: "LoanOnline app icon" },
      { src: "/work/paisa247-icon.png", alt: "Paisa247 app icon" },
      { src: "/work/jeff-icon.png", alt: "Jeff app icon" },
      { src: "/work/finmercadoco-icon.png", alt: "Finmercado (Colombia) app icon" },
    ],
    screenshots: [
      { src: "/work/screenshots/loanonline-1.png", alt: "LoanOnline screenshot 1" },
      { src: "/work/screenshots/loanonline-2.png", alt: "LoanOnline screenshot 2" },
      { src: "/work/screenshots/loanonline-3.png", alt: "LoanOnline screenshot 3" },
      { src: "/work/screenshots/loanonline-4.png", alt: "LoanOnline screenshot 4" },
      { src: "/work/screenshots/paisa247-1.png", alt: "Paisa247 screenshot 1" },
      { src: "/work/screenshots/paisa247-2.png", alt: "Paisa247 screenshot 2" },
      { src: "/work/screenshots/paisa247-3.png", alt: "Paisa247 screenshot 3" },
      { src: "/work/screenshots/paisa247-4.png", alt: "Paisa247 screenshot 4" },
      { src: "/work/screenshots/paisa247-5.png", alt: "Paisa247 screenshot 5" },
      { src: "/work/screenshots/jeff-1.png", alt: "Jeff screenshot 1" },
      { src: "/work/screenshots/jeff-2.png", alt: "Jeff screenshot 2" },
      { src: "/work/screenshots/jeff-3.png", alt: "Jeff screenshot 3" },
      { src: "/work/screenshots/jeff-4.png", alt: "Jeff screenshot 4" },
      { src: "/work/screenshots/jeff-5.png", alt: "Jeff screenshot 5" },
      { src: "/work/screenshots/finmercadoco-1.png", alt: "Finmercado (Colombia) screenshot 1" },
      { src: "/work/screenshots/finmercadoco-2.png", alt: "Finmercado (Colombia) screenshot 2" },
      { src: "/work/screenshots/finmercadoco-3.png", alt: "Finmercado (Colombia) screenshot 3" },
      { src: "/work/screenshots/finmercadoco-4.png", alt: "Finmercado (Colombia) screenshot 4" },
    ],
    links: [
      { label: "LoanOnline (App Store)", href: "https://apps.apple.com/ph/app/loanonline-peso-loan-online/id6751632738" },
      { label: "LoanOnline (Google Play)", href: "https://play.google.com/store/apps/details?id=ph.loanonline" },
      { label: "Paisa247 (App Store)", href: "https://apps.apple.com/in/app/paisa247-personal-loan-app/id6751623280" },
      { label: "Paisa247 (Google Play)", href: "https://play.google.com/store/apps/details?id=in.paisa247" },
      { label: "Jeff (Google Play)", href: "https://play.google.com/store/apps/details?id=com.jeff.app" },
      { label: "Finmercado CO (App Store)", href: "https://apps.apple.com/co/app/finmercado/id6751941717" },
    ],
  },
  {
    name: "Enterprise Web Solutions",
    description:
      "Production e-commerce for large international brands, Puma, Läderach, and Cervera among them.",
    links: [],
  },
];

function SelectedWork() {
  return (
    <section id="work" className="border-t hairline">
      <div className="mx-auto max-w-page px-6 py-16 sm:py-20">
        <p className="eyebrow !text-sm mb-10 text-center sm:text-left">Selected work</p>
        <div className="space-y-14">
          {projects.map((p, i) => (
            <article key={p.name} className="grid sm:grid-cols-[220px_1fr] gap-4 sm:gap-10">
              <div className="flex flex-col items-center sm:items-start">
                {p.icons && p.icons.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {p.icons.map((icon) => (
                      <Image
                        key={icon.src}
                        src={icon.src}
                        alt={icon.alt}
                        width={48}
                        height={48}
                        className="rounded-xl border hairline"
                      />
                    ))}
                  </div>
                )}
                <h3 className="font-display font-semibold text-ink text-xl text-center sm:text-left">
                  {p.name}
                </h3>
              </div>
              <div className="min-w-0">
                <p className="text-muted leading-relaxed max-w-2xl">
                  {p.description}
                </p>
                {p.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {p.links.map((l) => {
                      const LinkIcon = getLinkIcon(l.label);
                      return (
                        <a
                          key={l.href}
                          href={l.href}
                          className="link-underline text-sm text-ink/80 inline-flex items-center gap-1"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {LinkIcon && (
                            <LinkIcon className="h-4 w-4" weight="regular" />
                          )}
                          {l.label} ↗
                        </a>
                      );
                    })}
                  </div>
                )}
                {p.screenshots && p.screenshots.length > 0 && (
                  <div className="mt-5 overflow-hidden">
                    <div
                      className={`marquee-track flex w-max gap-3${i % 2 === 1 ? " marquee-track--reverse" : ""}`}
                      style={
                        {
                          "--marquee-duration": `${p.screenshots.length * (2 + (i % 3) * 0.6)}s`,
                        } as CSSProperties
                      }
                    >
                      {[...p.screenshots, ...p.screenshots].map((shot, si) => (
                        <Image
                          key={`${shot.src}-${si}`}
                          src={shot.src}
                          alt={shot.alt}
                          width={140}
                          height={303}
                          className="rounded-lg border hairline shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const packages = [
  {
    name: "Build",
    description: "Fixed scope, fixed timeline, flat fee. Idea to shipped product.",
    bestFor: "You have an idea and need it built",
    icon: PackageIcon,
  },
  {
    name: "Ongoing",
    description: "Monthly retainer for continued work after launch.",
    bestFor: "You've shipped and need to keep building",
    icon: ArrowsClockwiseIcon,
  },
  {
    name: "Audit and roadmap",
    description:
      "A smaller engagement if you already have something and want a clear view of what to do next.",
    bestFor: "You have something and need direction",
    icon: CompassIcon,
  },
];

function WorkingTogether() {
  return (
    <section id="together" className="border-t hairline">
      <div className="mx-auto max-w-page px-6 py-16 sm:py-20">
        <p className="eyebrow !text-sm mb-3 text-center sm:text-left">Working together</p>
        <p className="text-muted mb-10 max-w-xl text-center sm:text-left mx-auto sm:mx-0">
          Fixed price, no open-ended hourly billing. Three ways to work with
          us:
        </p>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-hairline">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col items-center sm:items-start sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="h-11 w-11 rounded-full border border-accent flex items-center justify-center mb-5">
                <pkg.icon className="h-5 w-5 text-accent" weight="regular" />
              </div>
              <h3 className="font-display font-semibold text-ink mb-2 text-center sm:text-left">
                {pkg.name}
              </h3>
              <p className="text-sm text-muted leading-relaxed text-center sm:text-left">
                {pkg.description}
              </p>
              <div className="mt-auto pt-6 text-center sm:text-left">
                <p className="eyebrow text-[0.7rem] mb-1">Best for</p>
                <p className="text-sm text-ink/80">{pkg.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full border hairline bg-bg text-ink text-sm px-3 py-2.5 rounded-md focus-visible:outline-none focus-visible:border-ink";

function WhoWeAreAndContact() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [buildType, setBuildType] = useState("");
  const [platform, setPlatform] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, buildType, platform, timeframe, budget, details }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-t hairline">
      <div className="mx-auto max-w-page px-6 py-16 sm:py-20">
        <p className="eyebrow !text-sm mb-10 text-center sm:text-left">Who you&apos;re working with</p>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-2">
              <Image
                src="/team/lukass.jpg"
                alt="Lukass"
                width={56}
                height={56}
                className="rounded-full border hairline object-cover"
              />
              <h3 className="font-display font-semibold text-ink text-xl">
                Lukass
              </h3>
            </div>
            <p className="text-muted leading-relaxed">
              Leads the build. Years taking products from zero to one, from
              his own apps built solo to company products where he owned the
              architecture and led the team, across web, mobile, and backend.
              Built fast with modern, AI-powered tooling, but engineered to
              last, not thrown together.
            </p>
            <a
              href="https://www.linkedin.com/in/lukass-sicevs/"
              className="link-underline text-sm text-muted block w-fit mx-auto sm:mx-0 mt-3"
            >
              LinkedIn ↗
            </a>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-2">
              <Image
                src="/team/daniels.jpg"
                alt="Daniels"
                width={56}
                height={56}
                className="rounded-full border hairline object-cover"
              />
              <h3 className="font-display font-semibold text-ink text-xl">
                Daniels
              </h3>
            </div>
            <p className="text-muted leading-relaxed">
              Runs the client side: scoping, commercials, and the
              relationship from first call to delivery and beyond. A tech
              and data background combined with years in sales, negotiation,
              and client management.
            </p>
            <a
              href="https://www.linkedin.com/in/danielskalnins/"
              className="link-underline text-sm text-muted block w-fit mx-auto sm:mx-0 mt-3"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="mt-20 pt-16 sm:pt-20 border-t hairline text-center sm:text-left">
          <p className="eyebrow !text-sm mb-3">Get in touch</p>
          <h2 className="font-display font-semibold text-ink text-3xl sm:text-4xl tracking-tight max-w-xl mx-auto sm:mx-0">
            Have something you want built?
          </h2>
          <p className="mt-4 max-w-xl text-muted leading-relaxed mx-auto sm:mx-0">
            Tell us what you&apos;re working on. Whether you have an idea, an
            existing product, or a business problem that software could
            solve, tell us what you&apos;re trying to do.
          </p>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="mt-8 inline-flex items-center gap-2 bg-ink text-bg px-6 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Start a conversation ↗
            </button>
          ) : status === "sent" ? (
            <div className="mt-8 max-w-xl mx-auto sm:mx-0">
              <p className="text-ink font-display font-semibold text-lg">
                Message sent.
              </p>
              <p className="mt-2 text-muted leading-relaxed">
                Thanks — we&apos;ll get back to you shortly.
              </p>
            </div>
          ) : (
            <div className="mt-8 max-w-xl mx-auto sm:mx-0 text-left space-y-5">
              <div>
                <label className="eyebrow text-[0.7rem] block mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="eyebrow text-[0.7rem] block mb-2">
                    What are you trying to build?
                  </label>
                  <select
                    value={buildType}
                    onChange={(e) => setBuildType(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select one</option>
                    <option>New product</option>
                    <option>Existing product</option>
                    <option>Internal tool</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow text-[0.7rem] block mb-2">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select one</option>
                    <option>Web</option>
                    <option>Mobile</option>
                    <option>Both</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow text-[0.7rem] block mb-2">
                    Timeframe
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2-3 months"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="eyebrow text-[0.7rem] block mb-2">
                    Approximate budget
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $20-40k"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="eyebrow text-[0.7rem] block mb-2">
                  Tell us more
                </label>
                <textarea
                  rows={4}
                  placeholder="What are you trying to do?"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className={inputClass}
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={status === "submitting" || !email}
                className="inline-flex items-center gap-2 bg-ink text-bg px-6 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Send ↗"}
              </button>
            </div>
          )}

          <p className="mt-8 text-sm text-muted">
            <a
              href="mailto:dan.kalnins@gmail.com"
              className="link-underline text-ink/80"
            >
              Daniels
            </a>
            {" · "}
            <a
              href="mailto:lukass.sicevs@gmail.com"
              className="link-underline text-ink/80"
            >
              Lukass
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-page px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-center sm:text-left eyebrow">
        <span>© {new Date().getFullYear()} VELC Agency</span>
        <span>Dubai, UAE</span>
      </div>
    </footer>
  );
}
