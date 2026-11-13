/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  Globe,
  HeartPulse,
  HelpCircle,
  Home,
  Landmark,
  MessageCircle,
  Moon,
  Phone,
  Search,
  ShieldCheck,
  Sun,
  Vote,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  CENTER_CONFIG,
  GENERAL_FAQS,
  INITIAL_SERVICES,
  Language,
  ServiceItem,
} from './data/servicesData';
import { TRANSLATIONS } from './data/translations';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import heroBannerImg from './assets/images/esuvidha_civic_center_hero_1794578346379.jpg';

const HERO_IMAGE_PATH = heroBannerImg || '/hero-center.jpg';

const SERVICE_ICONS: Record<ServiceItem['iconName'], React.ComponentType<{ className?: string }>> = {
  Landmark,
  CreditCard,
  Vote,
  FileCheck2,
  Fingerprint,
  HeartPulse,
  ShieldCheck,
  FileSpreadsheet,
  Briefcase,
};

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  // Theme state (synced with document.documentElement.classList)
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Language state (English, Hindi, Odia)
  const [lang, setLang] = useState<Language>('en');
  const t = TRANSLATIONS[lang];

  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  // Navbar shrink on scroll + Back to top visibility
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'services' | 'faq' | 'contact'>(
    'home'
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Typewriter headline state
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState(t.hero.typewriterWords[0]);

  useEffect(() => {
    const words = t.hero.typewriterWords;
    if (prefersReducedMotion) {
      setTypedText(words[0]);
      return;
    }

    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        charIdx++;
        setTypedText(currentWord.slice(0, charIdx));
        if (charIdx === currentWord.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 2200);
          return;
        }
        timeoutId = setTimeout(tick, 55);
      } else {
        charIdx--;
        setTypedText(currentWord.slice(0, charIdx));
        if (charIdx === 0) {
          isDeleting = false;
          setWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
        timeoutId = setTimeout(tick, 28);
      }
    };

    timeoutId = setTimeout(tick, 80);
    return () => clearTimeout(timeoutId);
  }, [wordIndex, lang, prefersReducedMotion, t.hero.typewriterWords]);

  // Service category filter & search
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [serviceSearch, setServiceSearch] = useState<string>('');

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
      const q = serviceSearch.trim().toLowerCase();
      if (!q) return matchesCat;
      const matchesQuery =
        s.title.en.toLowerCase().includes(q) ||
        s.title[lang].toLowerCase().includes(q) ||
        s.shortDesc.en.toLowerCase().includes(q) ||
        s.subServices.some((sub) => sub.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [services, selectedCategory, serviceSearch, lang]);

  // Service Detail Modal state
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);

  // FAQ Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Contact Inquiry Form state
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactService, setContactService] = useState('EPFO & PF Claim Services');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrorText, setContactErrorText] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim().length < 2) {
      setContactErrorText('Please enter your name.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(contactMobile.trim())) {
      setContactErrorText('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setContactErrorText('');
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 md:pb-0">
      <OfflineIndicator />

      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract: Brand — 5 Nav Links — 1 CTA)
      ===================================================================== */}
      <header
        className={`relative md:sticky md:top-0 z-40 transition-colors duration-200 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md ${
          isScrolled ? 'md:py-3 shadow-xs' : 'py-3.5 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B2A5B] dark:text-white whitespace-nowrap shrink-0"
          >
            eSuvidha
          </a>

          {/* Zone 2: 5 Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#home"
              className="hover:text-[#0B2A5B] dark:hover:text-[#FF9933] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.home}
            </a>
            <a
              href="#services"
              className="hover:text-[#0B2A5B] dark:hover:text-[#FF9933] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#0B2A5B] dark:hover:text-[#FF9933] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#faq"
              className="hover:text-[#0B2A5B] dark:hover:text-[#FF9933] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.faq}
            </a>
            <a
              href="#contact"
              className="hover:text-[#0B2A5B] dark:hover:text-[#FF9933] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Primary Action Button (WhatsApp Us) */}
          <div className="flex items-center shrink-0">
            <a
              href={`https://wa.me/${CENTER_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello eSuvidha, I need assistance with a government document service.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#138808] hover:bg-[#0f6f06] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.whatsappCta}</span>
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          CLEAN UTILITY BAR (Language Toggle & Theme Toggle)
      ===================================================================== */}
      <div className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200/70 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Working Hours */}
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span>{CENTER_CONFIG.workingHours}</span>
          </div>

          {/* Right: Language Switcher & Theme Toggle */}
          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center p-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 shrink-0" />
              {(
                [
                  { code: 'en', label: 'EN' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'or', label: 'ଓଡ଼ିଆ' },
                ] as { code: Language; label: string }[]
              ).map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  className={`min-h-[32px] px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === item.code
                      ? 'bg-[#0B2A5B] text-white dark:bg-[#FF9933] dark:text-slate-950 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="min-h-[36px] min-w-[36px] px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#0B2A5B] transition-colors flex items-center justify-center cursor-pointer shrink-0"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#FF9933]" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          HERO SECTION
      ===================================================================== */}
      <main id="home" className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/70 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-14 lg:py-16 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="text-xs sm:text-sm font-medium text-[#0B2A5B] dark:text-[#FF9933] tracking-wide">
                  {t.hero.kicker}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-2xl">
                  <span>{t.hero.headlineStatic} </span>
                  <span className="text-[#0B2A5B] dark:text-[#FF9933] block sm:inline mt-1 sm:mt-0">
                    {typedText}
                    <span className="inline-block w-0.5 h-7 sm:h-9 bg-[#FF9933] ml-1 align-middle" />
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {t.hero.subtext}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <a
                    href={`https://wa.me/${CENTER_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      'Hello eSuvidha, I need assistance with a government document service.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-[#138808] hover:bg-[#0f6f06] text-white font-semibold text-sm sm:text-base shadow-sm transition-transform active:scale-[0.99] flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.hero.primaryCta}</span>
                  </a>

                  <a
                    href="#services"
                    className="min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-[#0B2A5B] text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>{t.hero.secondaryCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Unboxed Service Highlights */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#138808] shrink-0" />
                    <span>{t.hero.trust1}</span>
                  </span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                    ·
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#FF9933] shrink-0" />
                    <span>{t.hero.trust2}</span>
                  </span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                    ·
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0B2A5B] dark:text-sky-400 shrink-0" />
                    <span>{t.hero.trust3}</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Visual */}
              <div className="lg:col-span-5 relative flex flex-col justify-center">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0B2A5B] shadow-xl aspect-16/10 lg:aspect-auto lg:h-full min-h-[280px]">
                  <img
                    src={HERO_IMAGE_PATH}
                    alt="eSuvidha Citizen Services & Documentation Center"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (!e.currentTarget.src.endsWith('/hero-center.jpg')) {
                        e.currentTarget.src = '/hero-center.jpg';
                      } else {
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <div>
                      <div className="text-xs text-amber-300 font-medium">
                        Government Services &amp; Documentation Desk
                      </div>
                      <div className="text-sm sm:text-base font-semibold mt-0.5">
                        EPFO · PAN · Voter ID · Certificates · Aadhaar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SERVICES DIRECTORY SECTION
        ===================================================================== */}
        <section id="services" className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {t.sections.servicesTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
                {t.sections.servicesSubtitle}
              </p>
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search PAN, PF, Income, Voter..."
                aria-label="Search citizen services"
                className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2">
            {[
              'All',
              'Social Security & Finance',
              'Identity & Tax',
              'Civic Certificates',
              'Exams & Utilities',
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2A5B] text-white dark:bg-[#FF9933] dark:text-slate-950 font-semibold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {cat === 'All' ? 'All Services' : cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => {
              const IconComponent = SERVICE_ICONS[service.iconName] || FileText;
              const serviceWhatsappUrl = `https://wa.me/${CENTER_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Hello eSuvidha, I need assistance with ${service.title.en}.`
              )}`;

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.04, 0.2) }}
                  className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0B2A5B] dark:hover:border-[#FF9933]/70 p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#0B2A5B]/8 dark:bg-slate-800 text-[#0B2A5B] dark:text-[#FF9933] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        <span>{service.indexNumber}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{service.category}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">
                      {service.title[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {service.shortDesc[lang]}
                    </p>

                    <ul className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {service.subServices.slice(0, 3).map((sub) => (
                        <li key={sub} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#138808] shrink-0 mt-0.5" />
                          <span className="truncate">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <Clock className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                      <span className="truncate">{service.processingTime}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setDetailService(service)}
                        className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Documents List
                      </button>
                      <a
                        href={serviceWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-3 py-2 rounded-xl bg-[#138808] hover:bg-[#0f6f06] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t.nav.whatsappCta}</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            HOW IT WORKS SECTION (4 Steps)
        ===================================================================== */}
        <section
          id="how-it-works"
          className="py-14 lg:py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {t.sections.howItWorksTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                {t.sections.howItWorksSubtitle}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: t.howSteps.step1Title,
                  desc: t.howSteps.step1Desc,
                },
                {
                  title: t.howSteps.step2Title,
                  desc: t.howSteps.step2Desc,
                },
                {
                  title: t.howSteps.step3Title,
                  desc: t.howSteps.step3Desc,
                },
                {
                  title: t.howSteps.step4Title,
                  desc: t.howSteps.step4Desc,
                },
              ].map((stepItem, i) => (
                <div
                  key={stepItem.title}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-xs text-slate-500">
                    <span>Step {i + 1} of 4</span>
                    <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            FAQ SECTION
        ===================================================================== */}
        <section id="faq" className="py-14 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center">
            {t.sections.faqTitle}
          </h2>

          <div className="mt-8 space-y-3">
            {GENERAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full min-h-[54px] px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0B2A5B] dark:text-[#FF9933]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            CONTACT SECTION
        ===================================================================== */}
        <section
          id="contact"
          className="py-14 lg:py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {t.sections.contactTitle}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Reach out directly via phone or WhatsApp for quick document verification and form submission.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#138808] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Helpline Number
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 tabular-nums">
                      <a href="tel:+917609068783" className="hover:underline">
                        {CENTER_CONFIG.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#138808] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      WhatsApp Mobile Number
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 tabular-nums">
                      <a
                        href={`https://wa.me/${CENTER_CONFIG.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        7609068783
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FF9933] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Working Hours
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {CENTER_CONFIG.workingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Inquiry / WhatsApp Connect Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Send a Service Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fill in your details below to connect with our desk on WhatsApp.
                </p>

                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                  {contactErrorText && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-300">
                      {contactErrorText}
                    </div>
                  )}

                  {contactSubmitted && (
                    <div className="p-4 rounded-xl bg-[#138808]/10 border border-[#138808]/30 text-xs sm:text-sm text-[#138808] dark:text-emerald-400 flex items-center justify-between gap-3">
                      <span>
                        Details ready for +91 {contactMobile}. Click to open WhatsApp:
                      </span>
                      <a
                        href={`https://wa.me/${CENTER_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                          `Hello eSuvidha, my name is ${contactName} (${contactMobile}). I need assistance with ${contactService}. ${contactMessage}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-[#138808] text-white font-semibold whitespace-nowrap shrink-0"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-mobile"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      >
                        10-Digit Mobile Number *
                      </label>
                      <input
                        id="contact-mobile"
                        type="tel"
                        maxLength={10}
                        value={contactMobile}
                        onChange={(e) =>
                          setContactMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        placeholder="10-digit mobile number"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono tabular-nums text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={contactService}
                      onChange={(e) => setContactService(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title.en}>
                          {s.title.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-msg"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Write your query..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0B2A5B] hover:bg-[#0B2A5B]/90 dark:bg-[#FF9933] dark:text-slate-950 text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          FOOTER
      ===================================================================== */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xl font-bold text-white">eSuvidha</div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Government Services &amp; Documentation Center
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <a href="#services" className="hover:text-white">
                Services
              </a>
              <a href="#how-it-works" className="hover:text-white">
                How It Works
              </a>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <p>{t.disclaimer}</p>
            <p>© {new Date().getFullYear()} eSuvidha. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING WHATSAPP & BACK-TO-TOP BUTTONS
      ===================================================================== */}
      <div className="fixed bottom-18 md:bottom-6 right-4 z-30 flex flex-col items-end gap-2.5 no-print">
        {isScrolled && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className="min-h-[44px] min-w-[44px] rounded-full bg-slate-900/90 dark:bg-slate-800 text-white shadow-lg border border-slate-700 flex items-center justify-center hover:bg-[#0B2A5B] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={`https://wa.me/${CENTER_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'Hello eSuvidha, I need help with a government service application.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with eSuvidha on WhatsApp"
          className="min-h-[48px] px-4 py-2.5 rounded-full bg-[#138808] hover:bg-[#0f6f06] text-white shadow-xl flex items-center gap-2 text-xs sm:text-sm font-semibold transition-transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">{t.nav.whatsappCta}</span>
        </a>
      </div>

      {/* =====================================================================
          MOBILE BOTTOM NAVIGATION BAR
      ===================================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-4 items-center no-print"
      >
        {[
          { id: 'home', label: t.nav.home, href: '#home', icon: Home },
          { id: 'services', label: t.nav.services, href: '#services', icon: Building2 },
          { id: 'faq', label: t.nav.faq, href: '#faq', icon: HelpCircle },
          { id: 'contact', label: t.nav.contact, href: '#contact', icon: Phone },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeMobileTab === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={() =>
                setActiveMobileTab(tab.id as 'home' | 'services' | 'faq' | 'contact')
              }
              className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
                isActive
                  ? 'text-[#0B2A5B] dark:text-[#FF9933] font-semibold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <TabIcon className="w-5 h-5" />
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[72px]">
                {tab.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* =====================================================================
          SERVICE DETAILS MODAL (Documents Checklist)
      ===================================================================== */}
      <ServiceDetailModal
        service={detailService}
        lang={lang}
        onClose={() => setDetailService(null)}
      />
    </div>
  );
}
