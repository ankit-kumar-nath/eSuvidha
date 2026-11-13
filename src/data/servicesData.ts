export type Language = 'en' | 'hi' | 'or';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  indexNumber: string;
  category: 'Identity & Tax' | 'Social Security & Finance' | 'Civic Certificates' | 'Exams & Utilities';
  title: {
    en: string;
    hi: string;
    or: string;
  };
  shortDesc: {
    en: string;
    hi: string;
    or: string;
  };
  overview: string;
  subServices: string[];
  documentsRequired: string[];
  processingTime: string;
  iconName: 'Landmark' | 'CreditCard' | 'Vote' | 'FileCheck2' | 'Fingerprint' | 'HeartPulse' | 'ShieldCheck' | 'FileSpreadsheet' | 'Briefcase';
  faqs: ServiceFAQ[];
}

export type ApplicationStatusStage = 'Received' | 'Processing' | 'Submitted' | 'Completed';

export interface ApplicationRecord {
  id: string;
  applicantName: string;
  mobile: string;
  email: string;
  aadhaarLast4: string;
  serviceId: string;
  serviceName: string;
  subService: string;
  submittedAt: string;
  updatedAt: string;
  status: ApplicationStatusStage;
  remarks: string;
  uploadedFiles: string[];
}

export const CENTER_CONFIG = {
  brandName: 'eSuvidha',
  tagline: 'Government Services & Documentation Center',
  phone: '+91 76090 68783',
  whatsappNumber: '917609068783',
  workingHours: 'Mon – Sat: 9:00 AM – 8:00 PM',
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'epfo',
    indexNumber: '01',
    category: 'Social Security & Finance',
    title: {
      en: 'EPFO & PF Claim Services',
      hi: 'ईपीएफओ और पीएफ क्लेम सेवाएं',
      or: 'ଇପିଏଫଓ ଏବଂ ପିଏଫ କ୍ଲେମ୍ ସେବା',
    },
    shortDesc: {
      en: 'PF Form 19/10C settlement, Form 31 advance withdrawal, UAN activation, and bank/PAN KYC update.',
      hi: 'पीएफ फॉर्म 19/10C फाइनल सेटलमेंट, एडवांस निकासी, UAN एक्टिवेशन और बैंक KYC अपडेट।',
      or: 'ପିଏଫ ଫର୍ମ 19/10C ସେଟଲମେଣ୍ଟ, ଆଡଭାନ୍ସ ଉଠାଣ, UAN ଆକ୍ଟିଭେସନ୍ ଏବଂ ବ୍ୟାଙ୍କ KYC ଅପଡେଟ୍।',
    },
    overview:
      'Complete assistance for Employees Provident Fund (EPFO) subscribers including PF claim filing, advance withdrawal, UAN activation, KYC bank/PAN seeding, e-nomination, and joint declaration corrections.',
    subServices: [
      'PF Final Settlement (Form 19) & Pension Withdrawal (Form 10C)',
      'PF Advance Withdrawal (Form 31 – Medical, Housing, Marriage, Education)',
      'UAN Activation & Mobile Number Linking',
      'Bank Account, IFSC & PAN KYC Seeding',
      'Previous Member ID Merger (One Member – One EPF Account)',
      'E-Nomination Filing & Profile Correction',
    ],
    documentsRequired: [
      '12-digit UAN (Universal Account Number)',
      'Aadhaar Card linked with active mobile number',
      'PAN Card copy',
      'Cancelled Cheque or clear Bank Passbook front page with Name & IFSC',
      'Passport-size photograph (for E-Nomination)',
    ],
    processingTime: 'Same-day filing · Portal settlement in 5–12 working days',
    iconName: 'Landmark',
    faqs: [
      {
        question: 'Can I withdraw PF while still employed?',
        answer:
          'Yes, under Form 31 you can apply for an advance withdrawal for medical treatment, housing, marriage, or education while employed.',
      },
    ],
  },
  {
    id: 'pan',
    indexNumber: '02',
    category: 'Identity & Tax',
    title: {
      en: 'PAN Card Application & Correction',
      hi: 'पैन कार्ड नया आवेदन एवं सुधार',
      or: 'ପ୍ୟାନ୍ କାର୍ଡ ନୂତନ ଆବେଦନ ଓ ସଂଶୋଧନ',
    },
    shortDesc: {
      en: 'New PAN Card application (Form 49A), Name/DOB correction, damaged PVC card reprint, and Aadhaar–PAN linking.',
      hi: 'नया पैन कार्ड (फॉर्म 49A), नाम/जन्मतिथि सुधार, डुप्लीकेट पीवीसी रिप्रिंट और आधार-पैन लिंक।',
      or: 'ନୂତନ ପ୍ୟାନ୍ କାର୍ଡ, ନାମ କିମ୍ବା ଜନ୍ମ ତାରିଖ ସଂଶୋଧନ, ପିଭିସି କାର୍ଡ ରିପ୍ରିଣ୍ଟ ଏବଂ ଆଧାର-ପ୍ୟାନ୍ ଲିଙ୍କ୍।',
    },
    overview:
      'NSDL & UTIITSL PAN card documentation support for new individual/minor applications, demographic corrections, photo/signature updates, and PVC card reprints.',
    subServices: [
      'New PAN Card Application – Individual / Minor (Form 49A)',
      'PAN Card Correction – Name, Father Name, DOB, Signature or Photo',
      'Lost / Damaged PAN Card PVC Reprint',
      'Minor to Major PAN Photo & Signature Updation',
      'Aadhaar–PAN Linkage Assistance',
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Two recent color passport-size photographs',
      'Existing PAN copy or number (for correction or reprint)',
      'Birth Certificate or 10th Certificate (for DOB correction)',
    ],
    processingTime: 'e-PAN in 3–5 days · Physical card by post in 10–14 days',
    iconName: 'CreditCard',
    faqs: [
      {
        question: 'Can I update my signature and photo on my existing PAN card?',
        answer:
          'Yes, we file a PAN CSF correction application to update your latest photograph and signature while retaining your existing 10-character PAN number.',
      },
    ],
  },
  {
    id: 'voter',
    indexNumber: '03',
    category: 'Identity & Tax',
    title: {
      en: 'Voter ID (EPIC) Services',
      hi: 'वोटर आईडी (EPIC) पंजीकरण व सुधार',
      or: 'ଭୋଟର ପରିଚୟ ପତ୍ର (EPIC) ସେବା',
    },
    shortDesc: {
      en: 'New Voter ID registration (Form 6), correction, address change (Form 8), and digital e-EPIC PDF download.',
      hi: 'नया मतदाता पंजीकरण (फॉर्म 6), नाम/पता सुधार (फॉर्म 8) और डिजिटल ई-ईपिक डाउनलोड।',
      or: 'ନୂତନ ଭୋଟର ପଞ୍ଜୀକରଣ (ଫର୍ମ 6), ନାମ/ଠିକଣା ସଂଶୋଧନ (ଫର୍ମ 8) ଏବଂ ଡିଜିଟାଲ୍ e-EPIC ଡାଉନଲୋଡ୍।',
    },
    overview:
      'Voters Service Portal assistance for new voter registration (18+ years), name/address correction, constituency transfer, and digital e-EPIC download.',
    subServices: [
      'New Voter ID Registration (Form 6)',
      'Correction of Name, Relative Name, Age, or Gender (Form 8)',
      'Address Change / Constituency Transfer (Form 8)',
      'Mobile Number Linking & Digital e-EPIC PDF Download',
      'Replacement PVC Voter Card Order',
    ],
    documentsRequired: [
      'Recent passport-size color photograph',
      'Age Proof: Aadhaar, Birth Certificate, PAN, or 10th Marksheet',
      'Address Proof: Aadhaar, Electricity/Water Bill, or Bank Passbook',
      'Existing EPIC Number (for correction or address transfer)',
    ],
    processingTime: 'Same-day online submission',
    iconName: 'Vote',
    faqs: [
      {
        question: 'Can I download my Voter ID PDF online?',
        answer:
          'Yes, once your mobile number is linked with your EPIC record, your official digital e-EPIC PDF can be downloaded immediately.',
      },
    ],
  },
  {
    id: 'certificates',
    indexNumber: '04',
    category: 'Civic Certificates',
    title: {
      en: 'Income, Resident, Caste & Birth/Death Certificates',
      hi: 'आय, निवास, जाति एवं जन्म/मृत्यु प्रमाण पत्र',
      or: 'ଆୟ, ବାସିନ୍ଦା, ଜାତି ଏବଂ ଜନ୍ମ/ମୃତ୍ୟୁ ପ୍ରମାଣ ପତ୍ର',
    },
    shortDesc: {
      en: 'Online applications for Income, Resident (Domicile), Caste (SC/ST/OBC/SEBC), Legal Heir, Birth, and Death certificates.',
      hi: 'आय, मूल निवास (डोमिसाइल), जाति, कानूनी वारिस और जन्म/मृत्यु प्रमाण पत्र आवेदन।',
      or: 'ଆୟ, ସ୍ଥାୟୀ ବାସିନ୍ଦା, ଜାତି, ଉତ୍ତରାଧିକାରୀ ଏବଂ ଜନ୍ମ/ମୃତ୍ୟୁ ପ୍ରମାଣ ପତ୍ର ଆବେଦନ।',
    },
    overview:
      'Complete documentation and online portal submission for Resident (Domicile), Income, Caste, EWS, Legal Heir, Birth, and Death certificates.',
    subServices: [
      'Income Certificate Application',
      'Resident / Nativity (Domicile) Certificate',
      'Caste Certificate – SC / ST / OBC / SEBC',
      'Birth & Death Certificate Registration & Download',
      'Legal Heir & EWS Certificate Documentation',
    ],
    documentsRequired: [
      'Applicant Aadhaar Card & Passport Photo',
      'Land Record (RoR / Patta) or Holding Tax / Electricity Bill',
      'Income proof or self-declaration as applicable',
      'Hospital Discharge Slip (for Birth Registration)',
    ],
    processingTime: '7–15 working days',
    iconName: 'FileCheck2',
    faqs: [
      {
        question: 'How will I receive the approved certificate?',
        answer:
          'Once digitally approved on the portal, we share the verifiable PDF copy directly on your WhatsApp or provide a high-quality printout.',
      },
    ],
  },
  {
    id: 'aadhaar',
    indexNumber: '05',
    category: 'Identity & Tax',
    title: {
      en: 'Aadhaar Correction & Download',
      hi: 'आधार सुधार, पता अपडेट एवं डाउनलोड',
      or: 'ଆଧାର ସଂଶୋଧନ, ଠିକଣା ଅପଡେଟ୍ ଓ ଡାଉନଲୋଡ୍',
    },
    shortDesc: {
      en: 'Online address update, document update, biometric slot booking for Name/DOB/Mobile, e-Aadhaar download, and PVC card order.',
      hi: 'ऑनलाइन पता सुधार, दस्तावेज़ अपडेट, स्लॉट बुकिंग, ई-आधार डाउनलोड और पीवीसी कार्ड ऑर्डर।',
      or: 'ଅନଲାଇନ୍ ଠିକଣା ପରିବର୍ତ୍ତନ, ଡକ୍ୟୁମେଣ୍ଟ ଅପଡେଟ୍, ସ୍ଲଟ୍ ବୁକିଂ ଏବଂ ପିଭିସି କାର୍ଡ ଅର୍ଡର।',
    },
    overview:
      'UIDAI myAadhaar portal facilitation for address updates, Head-of-Family based updates, mandatory 10-year document uploads, PVC card orders, and appointment booking.',
    subServices: [
      'Online Address Change (Direct Proof or Head-of-Family Based)',
      '10-Year Identity & Address Document Update',
      'Official PVC Aadhaar Card Order',
      'e-Aadhaar PDF Download',
      'Appointment Slot Booking for Name / DOB / Mobile Update',
    ],
    documentsRequired: [
      'Aadhaar Number or Enrolment ID',
      'Active linked mobile number for OTP (for online services)',
      'Valid Address Proof: Voter ID, Passport, Bank Passbook, Electricity Bill, or Marriage Certificate',
    ],
    processingTime: 'Instant download · Updates in 4–7 working days',
    iconName: 'Fingerprint',
    faqs: [
      {
        question: 'How can an address be updated after marriage without bills in the applicant’s name?',
        answer:
          'We process the Head-of-Family (HoF) based online update using the spouse’s Aadhaar and marriage/relationship proof.',
      },
    ],
  },
  {
    id: 'ayushman',
    indexNumber: '06',
    category: 'Social Security & Finance',
    title: {
      en: 'Ayushman Bharat Health Card',
      hi: 'आयुष्मान भारत स्वास्थ्य कार्ड',
      or: 'ଆୟୁଷ୍ମାନ ଭାରତ ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ',
    },
    shortDesc: {
      en: 'PM-JAY & Senior Citizen (70+ Years) Ayushman card registration, e-KYC verification, and card download.',
      hi: 'पीएम-जेएवाई और 70+ वरिष्ठ नागरिक आयुष्मान स्वास्थ्य कार्ड ई-केवाईसी व डाउनलोड।',
      or: 'ଆୟୁଷ୍ମାନ ଭାରତ ଏବଂ 70+ ବରିଷ୍ଠ ନାଗରିକ ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ e-KYC ଓ ଡାଉନଲୋଡ୍।',
    },
    overview:
      'Registration, e-KYC, and card download for Ayushman Bharat PM-JAY and the Senior Citizen 70+ Ayushman Vay Vandana Card.',
    subServices: [
      'Senior Citizen (70+ Years) Ayushman Card Registration',
      'Family Eligibility Lookup & e-KYC Verification',
      'New Family Member Addition',
      'Ayushman Card PDF Download',
    ],
    documentsRequired: [
      'Aadhaar Card of the beneficiary (linked with mobile number)',
      'Ration Card / Family ID (not required for 70+ Senior Citizens)',
    ],
    processingTime: 'Same-day e-KYC & card download',
    iconName: 'HeartPulse',
    faqs: [
      {
        question: 'Who is eligible for the 70+ Senior Citizen Ayushman Card?',
        answer:
          'Every citizen aged 70 years or above as per Aadhaar is eligible regardless of income.',
      },
    ],
  },
  {
    id: 'lic',
    indexNumber: '07',
    category: 'Social Security & Finance',
    title: {
      en: 'LIC Premium Payment & Life Certificate',
      hi: 'एलआईसी प्रीमियम भुगतान व जीवन प्रमाण',
      or: 'LIC ପ୍ରିମିୟମ୍ ପେମେଣ୍ଟ ଏବଂ ଜୀବନ ପ୍ରମାଣ',
    },
    shortDesc: {
      en: 'LIC renewal premium payment with instant official receipt, policy status statement, and Jeevan Pramaan for pensioners.',
      hi: 'एलआईसी प्रीमियम भुगतान रसीद, पॉलिसी स्टेटस और पेंशनभोगियों के लिए डिजिटल जीवन प्रमाण।',
      or: 'LIC ପ୍ରିମିୟମ୍ ପେମେଣ୍ଟ ରସିଦ, ପଲିସି ଷ୍ଟାଟସ୍ ଏବଂ ପେନସନଭୋଗୀଙ୍କ ପାଇଁ ଜୀବନ ପ୍ରମାଣ ପତ୍ର।',
    },
    overview:
      'Quick LIC renewal premium payment with official receipt generation and Digital Life Certificate (Jeevan Pramaan) assistance for pensioners.',
    subServices: [
      'LIC Renewal Premium Payment with Instant Receipt',
      'Jeevan Pramaan (Digital Life Certificate for Pensioners)',
      'LIC Policy Status & Statement Download',
    ],
    documentsRequired: [
      'LIC Policy Number & Date of Birth',
      'Registered Mobile Number',
      'PPO Number & Aadhaar (for Pensioner Jeevan Pramaan)',
    ],
    processingTime: 'Instant transaction & receipt in 5 minutes',
    iconName: 'ShieldCheck',
    faqs: [],
  },
  {
    id: 'forms',
    indexNumber: '08',
    category: 'Exams & Utilities',
    title: {
      en: 'Online Govt Job, Exam & Scholarship Forms',
      hi: 'सरकारी नौकरी, परीक्षा एवं छात्रवृत्ति फॉर्म',
      or: 'ସରକାରୀ ଚାକିରି, ପରୀକ୍ଷା ଏବଂ ସ୍କଲାରସିପ୍ ଫର୍ମ',
    },
    shortDesc: {
      en: 'Accurate photo/signature formatting, OTR registration, and online form filling for all central/state jobs, entrance exams, and scholarships.',
      hi: 'सभी सरकारी नौकरी, प्रवेश परीक्षा और छात्रवृत्ति पोर्टल का सटीक ऑनलाइन फॉर्म।',
      or: 'ସମସ୍ତ ସରକାରୀ ଚାକିରି, ପ୍ରବେଶିକା ପରୀକ୍ଷା ଏବଂ ସ୍କଲାରସିପ୍ ଅନଲାଇନ୍ ଫର୍ମ ଆବେଦନ।',
    },
    overview:
      'Error-free online form filling with exact photo/signature resizing, document compression, and OTR registration for government recruitments, college admissions, and scholarships.',
    subServices: [
      'Central & State Government Recruitment Forms (SSC, Railway, Banking, State PSC, Police)',
      'Entrance Exams (NEET, JEE, CUET, OJEE, B.Ed, ITI, Diploma)',
      'Pre-Matric, Post-Matric & National/State Scholarship Portals',
      'School & College Admission Forms',
    ],
    documentsRequired: [
      'Educational Marksheets & Certificates',
      'Recent Passport Photo & Signature on White Paper',
      'Caste, Resident, or Income Certificate (if applicable)',
      'Aadhaar Card, Mobile Number & Email ID',
      'Bank Passbook copy (for Scholarship forms)',
    ],
    processingTime: 'Completed within 20–30 minutes',
    iconName: 'FileSpreadsheet',
    faqs: [],
  },
  {
    id: 'other',
    indexNumber: '09',
    category: 'Exams & Utilities',
    title: {
      en: 'Passport, Driving Licence, Ration Card & MSME',
      hi: 'पासपोर्ट, ड्राइविंग लाइसेंस, राशन कार्ड व उद्यम',
      or: 'ପାସପୋର୍ଟ, ଡ୍ରାଇଭିଂ ଲାଇସେନ୍ସ, ରାସନ କାର୍ଡ ଓ ଉଦ୍ୟମ',
    },
    shortDesc: {
      en: 'Passport Seva application, Parivahan Learner/Driving Licence, Ration Card services, and MSME Udyam registration.',
      hi: 'पासपोर्ट सेवा आवेदन, सारथी ड्राइविंग लाइसेंस, राशन कार्ड और एमएसएमई उद्यम पंजीकरण।',
      or: 'ପାସପୋର୍ଟ ସେବା ଆବେଦନ, ସାରଥୀ ଡ୍ରାଇଭିଂ ଲାଇସେନ୍ସ, ରାସନ କାର୍ଡ ଏବଂ MSME ଉଦ୍ୟମ ପଞ୍ଜୀକରଣ।',
    },
    overview:
      'Online application support for Passport Seva appointments, Parivahan Sarathi Learner/Permanent Driving Licence, Ration Card additions, and MSME Udyam registration.',
    subServices: [
      'Fresh & Re-issue Passport Application & Appointment Booking',
      'Parivahan Sarathi: Learner Licence, Permanent DL, Renewal & Address Change',
      'Ration Card: New Application, Member Addition & e-KYC',
      'MSME Udyam Registration Certificate',
      'FSSAI Basic Registration & Police Verification (PCC) Application',
    ],
    documentsRequired: [
      'Aadhaar Card & PAN Card',
      '10th Certificate / Birth Proof',
      'Passport-size photograph & signature',
      'Bank Account Details (for MSME Udyam)',
    ],
    processingTime: 'Same-day online submission',
    iconName: 'Briefcase',
    faqs: [],
  },
];

export const GENERAL_FAQS: ServiceFAQ[] = [
  {
    question: 'Can I apply for services completely online from home?',
    answer:
      'Yes. You can submit your request through our 4-step online form or send your documents directly on WhatsApp (+91 76090 68783). We process your application and send the official portal acknowledgment receipt to your phone.',
  },
  {
    question: 'How is my personal data protected?',
    answer:
      'Our online form only asks for the last 4 digits of your Aadhaar for reference. Uploaded files are used strictly to file your application on the official portal and are never stored publicly.',
  },
  {
    question: 'How can I track my application status?',
    answer:
      'When you submit an application online, you immediately receive a unique Application ID. Enter your Application ID or 10-digit mobile number in the Track Status section to check real-time progress.',
  },
];
