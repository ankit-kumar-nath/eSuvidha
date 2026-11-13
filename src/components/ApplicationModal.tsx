import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileCheck,
  Lock,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ApplicationRecord,
  CENTER_CONFIG,
  Language,
  ServiceItem,
} from '../data/servicesData';

interface ApplicationModalProps {
  isOpen: boolean;
  services: ServiceItem[];
  initialServiceId?: string;
  initialSubService?: string;
  lang: Language;
  onClose: () => void;
  onApplicationSubmitted: (newApp: ApplicationRecord) => void;
  onTrackApplicationId: (appId: string) => void;
}

interface UploadedFilePreview {
  name: string;
  sizeLabel: string;
  type: string;
  previewUrl?: string;
}

function sanitizeText(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  services,
  initialServiceId,
  initialSubService,
  lang,
  onClose,
  onApplicationSubmitted,
  onTrackApplicationId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || services[0]?.id || 'epfo'
  );
  const currentService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const [selectedSubService, setSelectedSubService] = useState<string>(
    initialSubService || currentService?.subServices[0] || ''
  );

  // Step 2: Personal Details (never store full Aadhaar or PAN)
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaarLast4, setAadhaarLast4] = useState('');
  const [notes, setNotes] = useState('');

  // Step 3: Documents Upload
  const [files, setFiles] = useState<UploadedFilePreview[]>([]);
  const [deliveryPreference, setDeliveryPreference] = useState<'online' | 'visit'>('online');

  // Step 4: Consent & Submission
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<ApplicationRecord | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      const targetId = initialServiceId || services[0]?.id || 'epfo';
      setSelectedServiceId(targetId);
      const found = services.find((s) => s.id === targetId) || services[0];
      setSelectedSubService(initialSubService || found?.subServices[0] || '');
      setStep(1);
      setErrorMsg(null);
      setSubmittedRecord(null);
    }
  }, [isOpen, initialServiceId, initialSubService, services]);

  if (!isOpen) return null;

  const handleServiceChange = (id: string) => {
    setSelectedServiceId(id);
    const svc = services.find((s) => s.id === id);
    if (svc && svc.subServices.length > 0) {
      setSelectedSubService(svc.subServices[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;
    const added: UploadedFilePreview[] = [];
    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      const kb = Math.max(1, Math.round(file.size / 1024));
      const previewUrl = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined;
      added.push({
        name: sanitizeText(file.name),
        sizeLabel: `${kb} KB`,
        type: file.type || 'application/octet-stream',
        previewUrl,
      });
    }
    setFiles((prev) => [...prev, ...added]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep2 = (): boolean => {
    const cleanName = sanitizeText(fullName);
    if (cleanName.length < 3) {
      setErrorMsg('Please enter the applicant’s full name (minimum 3 characters).');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return false;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address or leave it blank.');
      return false;
    }
    if (!/^\d{4}$/.test(aadhaarLast4.trim())) {
      setErrorMsg('For security, please enter strictly the LAST 4 digits of your Aadhaar card.');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const validateStep3 = (): boolean => {
    if (deliveryPreference === 'online' && files.length === 0) {
      setErrorMsg(
        'Please attach at least one supporting document scan/photo, or switch to "Send Documents via WhatsApp".'
      );
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) {
      setErrorMsg('Please confirm the data privacy & authorization consent checkbox before submitting.');
      return;
    }
    setErrorMsg(null);

    const timestampDigits = Date.now().toString().slice(-5);
    const appId = `ESU-${timestampDigits}`;
    const nowStr = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newRecord: ApplicationRecord = {
      id: appId,
      applicantName: sanitizeText(fullName),
      mobile: mobile.trim(),
      email: sanitizeText(email) || 'Not provided',
      aadhaarLast4: aadhaarLast4.trim(),
      serviceId: currentService.id,
      serviceName: currentService.title.en,
      subService: selectedSubService || currentService.subServices[0],
      submittedAt: nowStr,
      updatedAt: nowStr,
      status: 'Received',
      remarks:
        deliveryPreference === 'online'
          ? 'Application and documents received. Verification in progress.'
          : 'Application registered. Please send your supporting documents on WhatsApp (+91 76090 68783).',
      uploadedFiles:
        files.length > 0
          ? files.map((f) => f.name)
          : ['To be shared via WhatsApp'],
    };

    onApplicationSubmitted(newRecord);
    setSubmittedRecord(newRecord);
    setStep(5);
  };

  const handleDownloadReceipt = () => {
    if (!submittedRecord) return;
    const text = [
      `====================================================================`,
      `eSUVIDHA – GOVERNMENT SERVICES & DOCUMENTATION CENTER`,
      `APPLICATION ACKNOWLEDGMENT SLIP`,
      `====================================================================`,
      `Application ID       : ${submittedRecord.id}`,
      `Submission Timestamp : ${submittedRecord.submittedAt}`,
      `Current Status       : ${submittedRecord.status}`,
      `--------------------------------------------------------------------`,
      `Applicant Name       : ${submittedRecord.applicantName}`,
      `Registered Mobile    : +91 ${submittedRecord.mobile}`,
      `Email Address        : ${submittedRecord.email}`,
      `Aadhaar Reference    : XXXX-XXXX-${submittedRecord.aadhaarLast4}`,
      `--------------------------------------------------------------------`,
      `Selected Service     : ${submittedRecord.serviceName}`,
      `Specific Task        : ${submittedRecord.subService}`,
      `Documents Logged     : ${submittedRecord.uploadedFiles.join(', ')}`,
      `--------------------------------------------------------------------`,
      `Track your live application status using Application ID: ${submittedRecord.id}`,
      `WhatsApp / Helpline  : ${CENTER_CONFIG.phone}`,
      `====================================================================`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${submittedRecord.id}_Acknowledgment_Receipt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="online-app-modal-title"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2A5B] text-white flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure Online Application</span>
            </div>
            <h2 id="online-app-modal-title" className="text-lg sm:text-xl font-bold mt-0.5">
              {step === 5 ? 'Application Submitted' : 'Online Service Application'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close application form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: 1, label: '1. Service' },
                { num: 2, label: '2. Details' },
                { num: 3, label: '3. Documents' },
                { num: 4, label: '4. Submit' },
              ].map((item) => {
                const isActive = step === item.num;
                const isDone = step > item.num;
                return (
                  <div key={item.num} className="flex flex-col">
                    <div
                      className={`h-1.5 rounded-full transition-colors ${
                        isDone
                          ? 'bg-[#138808]'
                          : isActive
                          ? 'bg-[#FF9933]'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                    <span
                      className={`text-[11px] font-medium mt-1.5 truncate ${
                        isActive
                          ? 'text-[#0B2A5B] dark:text-[#FF9933] font-semibold'
                          : isDone
                          ? 'text-[#138808]'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: CHOOSE SERVICE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="service-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Select Service Category *
                  </label>
                  <select
                    id="service-select"
                    value={selectedServiceId}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.indexNumber}. {s.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subservice-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Select Specific Application Type *
                  </label>
                  <select
                    id="subservice-select"
                    value={selectedSubService}
                    onChange={(e) => setSelectedSubService(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
                  >
                    {currentService.subServices.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Estimated Turnaround:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currentService.processingTime}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      Required Documents:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc pl-4">
                      {currentService.documentsRequired.map((doc) => (
                        <li key={doc}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PERSONAL DETAILS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="app-fullname"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Applicant Full Name (as on Aadhaar) *
                  </label>
                  <input
                    id="app-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="app-mobile"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                    >
                      10-Digit Mobile Number (WhatsApp Active) *
                    </label>
                    <input
                      id="app-mobile"
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white tabular-nums focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="app-aadhaar4"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Aadhaar Last 4 Digits ONLY *
                    </label>
                    <div className="flex items-center">
                      <span className="min-h-[44px] px-3 flex items-center bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-300 dark:border-slate-700 rounded-l-xl text-xs font-mono text-slate-500">
                        XXXX-XXXX-
                      </span>
                      <input
                        id="app-aadhaar4"
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={aadhaarLast4}
                        onChange={(e) =>
                          setAadhaarLast4(e.target.value.replace(/\D/g, '').slice(0, 4))
                        }
                        placeholder="0000"
                        className="w-full min-h-[44px] px-3 py-2 rounded-r-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-white tabular-nums focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="app-email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="app-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="app-notes"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="app-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific details for your request..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B2A5B] dark:focus:border-[#FF9933]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#138808] shrink-0" />
                  <span>
                    For your privacy, only the last 4 digits of Aadhaar are collected here.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: UPLOAD DOCUMENTS */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryPreference('online')}
                    className={`min-h-[48px] p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      deliveryPreference === 'online'
                        ? 'border-[#0B2A5B] bg-[#0B2A5B]/5 dark:border-[#FF9933] dark:bg-[#FF9933]/10'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      Upload Supporting Scans Now
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Attach PDF, JPG, or PNG files
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryPreference('visit');
                      setErrorMsg(null);
                    }}
                    className={`min-h-[48px] p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      deliveryPreference === 'visit'
                        ? 'border-[#0B2A5B] bg-[#0B2A5B]/5 dark:border-[#FF9933] dark:bg-[#FF9933]/10'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      Send Documents via WhatsApp
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Generate Application ID &amp; share on WhatsApp
                    </div>
                  </button>
                </div>

                {deliveryPreference === 'online' && (
                  <div>
                    <label
                      htmlFor="doc-upload-input"
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 hover:border-[#0B2A5B] dark:hover:border-[#FF9933] transition-colors cursor-pointer text-center"
                    >
                      <Upload className="w-7 h-7 text-[#FF9933] mb-2" />
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        Select or Drag &amp; Drop Documents
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Supports JPG, PNG, or PDF
                      </span>
                      <input
                        id="doc-upload-input"
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Attached Documents ({files.length})
                        </div>
                        {files.map((file, idx) => (
                          <div
                            key={`${file.name}-${idx}`}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {file.previewUrl ? (
                                <img
                                  src={file.previewUrl}
                                  alt={file.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                  <FileCheck className="w-5 h-5 text-[#0B2A5B] dark:text-[#FF9933]" />
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                                  {file.name}
                                </div>
                                <div className="text-[11px] text-slate-500 tabular-nums">
                                  {file.sizeLabel}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="min-h-[36px] min-w-[36px] rounded-lg text-slate-400 hover:text-red-600 flex items-center justify-center cursor-pointer"
                              aria-label={`Remove ${file.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: REVIEW & CONSENT */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400">Selected Service:</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">
                      {currentService.title.en}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400">Specific Task:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                      {selectedSubService}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400">Applicant Name:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {sanitizeText(fullName)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400">Mobile &amp; Aadhaar Ref:</span>
                    <span className="font-mono text-slate-900 dark:text-white tabular-nums">
                      +91 {mobile} · XXXX-{aadhaarLast4}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400">Documents:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {files.length > 0 ? `${files.length} file(s) attached` : 'Via WhatsApp'}
                    </span>
                  </div>
                </div>

                <label className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-[#0B2A5B]"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    I authorize <strong>eSuvidha</strong> to assist with preparing and filing my application on the official portal. I understand that eSuvidha is a private facilitation service.
                  </span>
                </label>
              </motion.div>
            )}

            {/* STEP 5: SUCCESS CONFIRMATION */}
            {step === 5 && submittedRecord && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-center py-3 space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#138808]/10 text-[#138808] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#138808] dark:text-emerald-400">
                    Application Registered
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Thank you, {submittedRecord.applicantName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
                    Your Application ID has been generated. Click below to send your application details directly to our WhatsApp desk (+91 76090 68783) for immediate processing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Application ID:</span>
                    <span className="text-base font-bold font-mono text-[#0B2A5B] dark:text-[#FF9933] tabular-nums">
                      {submittedRecord.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {submittedRecord.serviceName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Mobile:</span>
                    <span className="font-mono font-medium text-slate-900 dark:text-white tabular-nums">
                      +91 {submittedRecord.mobile}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${CENTER_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hello eSuvidha, I have submitted an online application.\nApplication ID: ${submittedRecord.id}\nName: ${submittedRecord.applicantName}\nService: ${submittedRecord.serviceName} (${submittedRecord.subService})\nMobile: ${submittedRecord.mobile}${notes ? `\nNotes: ${notes}` : ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#138808] hover:bg-[#0f6f06] text-white text-xs sm:text-sm font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send to WhatsApp (7609068783)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleDownloadReceipt}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#FF9933]" />
                    <span>Download Slip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onTrackApplicationId(submittedRecord.id);
                      onClose();
                    }}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0B2A5B] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <SearchCheck className="w-4 h-4 text-[#FF9933]" />
                    <span>View Status</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Controls for Steps 1-4 */}
        {step < 5 && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Step 1 of 4
              </div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1) {
                    setErrorMsg(null);
                    setStep(2);
                  } else if (step === 2 && validateStep2()) {
                    setStep(3);
                  } else if (step === 3 && validateStep3()) {
                    setStep(4);
                  }
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0B2A5B] hover:bg-[#0B2A5B]/90 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#FF9933] hover:bg-[#e88724] text-slate-950 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Application</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
