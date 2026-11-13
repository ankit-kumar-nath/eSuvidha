import { Language } from './servicesData';

export interface UITranslations {
  nav: {
    home: string;
    services: string;
    howItWorks: string;
    faq: string;
    contact: string;
    whatsappCta: string;
  };
  hero: {
    kicker: string;
    headlineStatic: string;
    typewriterWords: string[];
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  sections: {
    servicesTitle: string;
    servicesSubtitle: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    faqTitle: string;
    contactTitle: string;
  };
  howSteps: {
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  disclaimer: string;
}

export const TRANSLATIONS: Record<Language, UITranslations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      howItWorks: 'How It Works',
      faq: 'FAQ',
      contact: 'Contact',
      whatsappCta: 'WhatsApp Us',
    },
    hero: {
      kicker: 'eSuvidha · Government Services & Documentation Center',
      headlineStatic: 'Your Government Work, Done Right —',
      typewriterWords: [
        'Fast, Safe & Hassle-Free.',
        'EPFO Claims & PF KYC.',
        'PAN, Voter ID & Aadhaar.',
        'Income & Resident Certificates.',
      ],
      subtext:
        'One-stop documentation and form-filling assistance for EPFO claims, PAN Card, Voter ID, Aadhaar updates, Revenue Certificates, Ayushman Bharat, LIC premium payment, and government forms.',
      primaryCta: 'WhatsApp Us',
      secondaryCta: 'View Services',
      trust1: '100% Secure Documentation',
      trust2: 'Fast Same-Day Filing',
      trust3: 'Direct WhatsApp Support',
    },
    sections: {
      servicesTitle: 'Our Services',
      servicesSubtitle:
        'Select any service below to check the required documents checklist or message us on WhatsApp.',
      howItWorksTitle: 'How It Works',
      howItWorksSubtitle:
        'Get your documentation completed in 4 simple steps without standing in queues.',
      faqTitle: 'Frequently Asked Questions',
      contactTitle: 'Contact & WhatsApp Assistance',
    },
    howSteps: {
      step1Title: '01. Choose Service',
      step1Desc: 'Select your required service and check the required documents list.',
      step2Title: '02. Share Documents on WhatsApp',
      step2Desc: 'Send clear photos or PDFs of the required documents directly on WhatsApp.',
      step3Title: '03. Application Processing',
      step3Desc: 'We verify your details, format documents accurately, and submit on the portal.',
      step4Title: '04. Get Receipt & Certificate',
      step4Desc: 'Receive your official acknowledgment receipt and final certificate on WhatsApp.',
    },
    disclaimer:
      'We are a private facilitation service and are not affiliated with any government department.',
  },
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      howItWorks: 'प्रक्रिया',
      faq: 'प्रश्न (FAQ)',
      contact: 'संपर्क',
      whatsappCta: 'व्हाट्सएप करें',
    },
    hero: {
      kicker: 'ई-सुविधा · सरकारी सेवाएं एवं दस्तावेज़ केंद्र',
      headlineStatic: 'आपका हर सरकारी काम, सही और सुरक्षित —',
      typewriterWords: [
        'तेज़, सुरक्षित और बिना परेशानी।',
        'ईपीएफओ पीएफ क्लेम व केवाईसी।',
        'पैन, वोटर आईडी व आधार अपडेट।',
        'आय, निवास और जाति प्रमाण पत्र।',
      ],
      subtext:
        'पीएफ क्लेम, पैन कार्ड, वोटर आईडी, आधार अपडेट, आय/निवास/जाति प्रमाण पत्र, आयुष्मान कार्ड, एलआईसी प्रीमियम और सभी सरकारी फॉर्म के लिए विश्वसनीय सेवा।',
      primaryCta: 'व्हाट्सएप करें',
      secondaryCta: 'सेवाएं देखें',
      trust1: '100% सुरक्षित दस्तावेज़',
      trust2: 'उसी दिन पोर्टल सबमिशन',
      trust3: 'सीधा व्हाट्सएप सहयोग',
    },
    sections: {
      servicesTitle: 'हमारी सेवाएं',
      servicesSubtitle:
        'आवश्यक दस्तावेज़ों की सूची देखने या व्हाट्सएप पर संपर्क करने के लिए किसी भी सेवा का चयन करें।',
      howItWorksTitle: 'यह कैसे काम करता है',
      howItWorksSubtitle: 'बिना कतार में लगे 4 आसान चरणों में अपना दस्तावेज़ कार्य पूरा करें।',
      faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
      contactTitle: 'संपर्क एवं व्हाट्सएप सहायता',
    },
    howSteps: {
      step1Title: '01. सेवा चुनें',
      step1Desc: 'सूची से अपनी आवश्यक सेवा चुनें और दस्तावेज़ों की जांच करें।',
      step2Title: '02. व्हाट्सएप पर दस्तावेज़ भेजें',
      step2Desc: 'आवश्यक दस्तावेज़ों की साफ फोटो या पीडीएफ सीधे व्हाट्सएप पर भेजें।',
      step3Title: '03. आवेदन प्रोसेसिंग',
      step3Desc: 'हम विवरणों की जांच कर आधिकारिक पोर्टल पर सटीक आवेदन जमा करते हैं।',
      step4Title: '04. रसीद व प्रमाण पत्र पाएं',
      step4Desc: 'व्हाट्सएप पर तुरंत पावती रसीद और तैयार प्रमाण पत्र प्राप्त करें।',
    },
    disclaimer:
      'हम एक निजी सुविधा सेवा हैं और किसी भी सरकारी विभाग से संबद्ध नहीं हैं।',
  },
  or: {
    nav: {
      home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
      services: 'ସେବାସମୂହ',
      howItWorks: 'ପ୍ରକ୍ରିୟା',
      faq: 'ପ୍ରଶ୍ନ (FAQ)',
      contact: 'ଯୋଗାଯୋଗ',
      whatsappCta: 'ହ୍ୱାଟ୍ସଆପ୍ କରନ୍ତୁ',
    },
    hero: {
      kicker: 'ଇ-ସୁବିଧା · ସରକାରୀ ସେବା ଓ ଡକ୍ୟୁମେଣ୍ଟେସନ୍ କେନ୍ଦ୍ର',
      headlineStatic: 'ଆପଣଙ୍କ ସରକାରୀ କାର୍ଯ୍ୟ, ସଠିକ୍ ଓ ସୁରକ୍ଷିତ —',
      typewriterWords: [
        'ଦ୍ରୁତ, ସୁରକ୍ଷିତ ଏବଂ ସହଜରେ।',
        'EPFO ପିଏଫ୍ କ୍ଲେମ୍ ଓ KYC ସେବା।',
        'ପ୍ୟାନ୍, ଭୋଟର କାର୍ଡ ଓ ଆଧାର ଅପଡେଟ୍।',
        'ଆୟ, ବାସିନ୍ଦା ଓ ଜାତି ପ୍ରମାଣ ପତ୍ର।',
      ],
      subtext:
        'EPFO କ୍ଲେମ୍, ପ୍ୟାନ୍ କାର୍ଡ, ଭୋଟର ଆଇଡି, ଆଧାର ଅପଡେଟ୍, ଆୟ/ବାସିନ୍ଦା/ଜାତି ପ୍ରମାଣ ପତ୍ର, ଆୟୁଷ୍ମାନ କାର୍ଡ, LIC ପ୍ରିମିୟମ୍ ଏବଂ ସରକାରୀ ଫର୍ମ ପାଇଁ ସହଜ ସେବା।',
      primaryCta: 'ହ୍ୱାଟ୍ସଆପ୍ କରନ୍ତୁ',
      secondaryCta: 'ସେବା ଦେଖନ୍ତୁ',
      trust1: '100% ସୁରକ୍ଷିତ ସେବା',
      trust2: 'ଦ୍ରୁତ ଅନଲାଇନ୍ ଆବେଦନ',
      trust3: 'ସିଧାସଳଖ ହ୍ୱାଟ୍ସଆପ୍ ସହାୟତା',
    },
    sections: {
      servicesTitle: 'ଆମର ସେବାସମୂହ',
      servicesSubtitle:
        'ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟ ତାଲିକା ଦେଖିବା କିମ୍ବା ହ୍ୱାଟ୍ସଆପ୍ କରିବା ପାଇଁ ଯେକୌଣସି ସେବା ବାଛନ୍ତୁ।',
      howItWorksTitle: 'କିପରି କାର୍ଯ୍ୟ କରେ',
      howItWorksSubtitle: '4 ଟି ସହଜ ପଦକ୍ଷେପରେ ଆପଣଙ୍କ ଡକ୍ୟୁମେଣ୍ଟେସନ୍ କାର୍ଯ୍ୟ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ।',
      faqTitle: 'ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ',
      contactTitle: 'ଯୋଗାଯୋଗ ଓ ହ୍ୱାଟ୍ସଆପ୍ ସହାୟତା',
    },
    howSteps: {
      step1Title: '01. ସେବା ବାଛନ୍ତୁ',
      step1Desc: 'ତାଲିକାରୁ ଆବଶ୍ୟକ ସେବା ବାଛନ୍ତୁ ଏବଂ ଡକ୍ୟୁମେଣ୍ଟ ତାଲିକା ଦେଖନ୍ତୁ।',
      step2Title: '02. ହ୍ୱାଟ୍ସଆପ୍ ରେ ଡକ୍ୟୁମେଣ୍ଟ ପଠାନ୍ତୁ',
      step2Desc: 'ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟର ଫଟୋ କିମ୍ବା PDF ସିଧାସଳଖ ହ୍ୱାଟ୍ସଆପ୍ ରେ ପଠାନ୍ତୁ।',
      step3Title: '03. ଆବେଦନ ପ୍ରକ୍ରିୟା',
      step3Desc: 'ଆମେ ତଥ୍ୟ ଯାଞ୍ଚ କରି ସଠିକ୍ ଭାବରେ ପୋର୍ଟାଲରେ ଆବେଦନ ଦାଖଲ କରୁ।',
      step4Title: '04. ରସିଦ ଓ ସାର୍ଟିଫିକେଟ୍',
      step4Desc: 'ହ୍ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ ରସିଦ ଏବଂ ପ୍ରସ୍ତୁତ ସାର୍ଟିଫିକେଟ୍ ପାଆନ୍ତୁ।',
    },
    disclaimer:
      'ଆମେ ଏକ ବେସରକାରୀ ସୁବିଧା କେନ୍ଦ୍ର ଏବଂ କୌଣସି ସରକାରୀ ବିଭାଗ ସହିତ ଅନୁବନ୍ଧିତ ନୋହୁଁ।',
  },
};
