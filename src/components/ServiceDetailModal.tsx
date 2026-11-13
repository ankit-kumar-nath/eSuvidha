import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  FileText,
  HelpCircle,
  MessageCircle,
  Printer,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CENTER_CONFIG, Language, ServiceItem } from '../data/servicesData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  lang: Language;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  lang,
  onClose,
}) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [selectedSub, setSelectedSub] = useState<string>('');

  if (!service) return null;

  const toggleDoc = (idx: number) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleDownloadChecklist = () => {
    const content = [
      `====================================================================`,
      `eSUVIDHA – GOVERNMENT SERVICES & DOCUMENTATION CENTER`,
      `REQUIRED DOCUMENTS CHECKLIST`,
      `====================================================================`,
      ``,
      `Service: ${service.title.en}`,
      `Category: ${service.category}`,
      `Estimated Turnaround: ${service.processingTime}`,
      ``,
      `SUB-SERVICES COVERED:`,
      ...service.subServices.map((s, i) => `  ${i + 1}. ${s}`),
      ``,
      `REQUIRED DOCUMENTS CHECKLIST:`,
      ...service.documentsRequired.map((d, i) => `  [ ] ${i + 1}. ${d}`),
      ``,
      `HELPLINE & WHATSAPP:`,
      `Phone / WhatsApp: ${CENTER_CONFIG.phone}`,
      `Working Hours: ${CENTER_CONFIG.workingHours}`,
      `====================================================================`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eSuvidha_${service.id}_Document_Checklist.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintChecklist = () => {
    window.print();
  };

  const whatsappUrl = `https://wa.me/${CENTER_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello eSuvidha, I need assistance with ${service.title.en}${selectedSub ? ` (${selectedSub})` : ''}.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-heading"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="px-6 py-5 bg-[#0B2A5B] text-white flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-amber-300 font-medium">
              {service.indexNumber} · {service.category}
            </div>
            <h2 id="service-detail-heading" className="text-xl sm:text-2xl font-bold mt-1">
              {service.title[lang]}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close service details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>Processing Time</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {service.processingTime}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B2A5B] dark:text-sky-400" />
                <span>Verification Mode</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Official Portal Receipt Provided
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Service Overview
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {service.overview}
            </p>
          </div>

          {/* Interactive Sub-Services Selector */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Services Covered
            </h3>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.subServices.map((sub) => {
                const isSelected = selectedSub === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSub(isSelected ? '' : sub)}
                    className={`min-h-[44px] text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-[#0B2A5B] bg-[#0B2A5B]/5 dark:border-[#FF9933] dark:bg-[#FF9933]/10 text-[#0B2A5B] dark:text-[#FF9933]'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span>{sub}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#138808]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Document Checklist + Downloader */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/60 dark:bg-slate-800/30">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF9933]" />
                  <span>Required Documents Checklist</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tick items below to check your documents
                </p>
              </div>
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={handleDownloadChecklist}
                  className="min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#0B2A5B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>Download Checklist</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintChecklist}
                  className="min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#0B2A5B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {service.documentsRequired.map((doc, idx) => {
                const isChecked = !!checkedDocs[idx];
                return (
                  <label
                    key={doc}
                    onClick={() => toggleDoc(idx)}
                    className="min-h-[44px] px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 rounded accent-[#138808]"
                    />
                    <span
                      className={`text-xs sm:text-sm ${
                        isChecked
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {doc}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Service-Specific FAQs */}
          {service.faqs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0B2A5B] dark:text-sky-400" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="mt-2.5 space-y-2.5">
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {faq.question}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3 shrink-0 no-print">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#138808] hover:bg-[#0f6f06] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};
