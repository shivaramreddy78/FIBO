const fs = require('fs');
const path = require('path');

const en = {
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "submit": "Submit",
    "cancel": "Cancel",
    "continue": "Continue",
    "save": "Save"
  },
  "navbar": {
    "dashboard": "Dashboard",
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Logout",
    "login": "Login",
    "register": "Register",
    "home": "Home",
    "features": "Features",
    "pricing": "Pricing",
    "language": "Language"
  },
  "dashboard": {
    "altCreditScore": "Alternative Credit Score",
    "financialHealth": "Financial Health",
    "riskLevel": "Risk Level",
    "loanRecommendation": "Loan Recommendation",
    "repaymentProbability": "Repayment Probability",
    "monthlyIncome": "Monthly Income",
    "monthlyExpenses": "Monthly Expenses",
    "savings": "Savings",
    "cashFlow": "Cash Flow",
    "aiInsights": "AI Insights",
    "reports": "Reports",
    "uploadDocuments": "Upload Documents"
  },
  "forms": {
    "email": "Email",
    "password": "Password",
    "emailPlaceholder": "Enter your email",
    "passwordPlaceholder": "Enter your password",
    "validationRequired": "This field is required",
    "successMessage": "Operation successful"
  },
  "landing": {
    "heroTitle": "Financial Inclusion for All",
    "heroSubtitle": "AI-powered credit assessment for the next billion users.",
    "getStarted": "Get Started"
  }
};

const hi = {
  "common": {
    "loading": "लोड हो रहा है...",
    "error": "एक त्रुटि हुई",
    "submit": "जमा करें",
    "cancel": "रद्द करें",
    "continue": "जारी रखें",
    "save": "सहेजें"
  },
  "navbar": {
    "dashboard": "डैशबोर्ड",
    "profile": "प्रोफ़ाइल",
    "settings": "सेटिंग्स",
    "logout": "लॉग आउट",
    "login": "लॉग इन",
    "register": "पंजीकरण",
    "home": "होम",
    "features": "विशेषताएं",
    "pricing": "मूल्य निर्धारण",
    "language": "भाषा"
  },
  "dashboard": {
    "altCreditScore": "वैकल्पिक क्रेडिट स्कोर",
    "financialHealth": "वित्तीय स्वास्थ्य",
    "riskLevel": "जोखिम स्तर",
    "loanRecommendation": "ऋण सिफारिश",
    "repaymentProbability": "चुकौती संभावना",
    "monthlyIncome": "मासिक आय",
    "monthlyExpenses": "मासिक व्यय",
    "savings": "बचत",
    "cashFlow": "नकदी प्रवाह",
    "aiInsights": "एआई अंतर्दृष्टि",
    "reports": "रिपोर्ट",
    "uploadDocuments": "दस्तावेज़ अपलोड करें"
  },
  "forms": {
    "email": "ईमेल",
    "password": "पासवर्ड",
    "emailPlaceholder": "अपना ईमेल दर्ज करें",
    "passwordPlaceholder": "अपना पासवर्ड दर्ज करें",
    "validationRequired": "यह क्षेत्र आवश्यक है",
    "successMessage": "ऑपरेशन सफल"
  },
  "landing": {
    "heroTitle": "सभी के लिए वित्तीय समावेशन",
    "heroSubtitle": "अगले अरब उपयोगकर्ताओं के लिए एआई-संचालित क्रेडिट मूल्यांकन।",
    "getStarted": "शुरू करें"
  }
};

const te = {
  "common": {
    "loading": "లోడ్ అవుతోంది...",
    "error": "ఒక లోపం ఏర్పడింది",
    "submit": "సమర్పించు",
    "cancel": "రద్దు చేయి",
    "continue": "కొనసాగించు",
    "save": "సేవ్ చేయి"
  },
  "navbar": {
    "dashboard": "డ్యాష్‌బోర్డ్",
    "profile": "ప్రొఫైల్",
    "settings": "సెట్టింగులు",
    "logout": "లాగ్ అవుట్",
    "login": "లాగిన్",
    "register": "నమోదు",
    "home": "హోమ్",
    "features": "లక్షణాలు",
    "pricing": "ధరలు",
    "language": "భాష"
  },
  "dashboard": {
    "altCreditScore": "ప్రత్యామ్నాయ క్రెడిట్ స్కోర్",
    "financialHealth": "ఆర్థిక ఆరోగ్యం",
    "riskLevel": "ప్రమాద స్థాయి",
    "loanRecommendation": "రుణ సిఫార్సు",
    "repaymentProbability": "తిరిగి చెల్లించే సంభావ్యత",
    "monthlyIncome": "నెలసరి ఆదాయం",
    "monthlyExpenses": "నెలవారీ ఖర్చులు",
    "savings": "పొదుపు",
    "cashFlow": "నగదు ప్రవాహం",
    "aiInsights": "AI అంతర్దృష్టులు",
    "reports": "నివేదికలు",
    "uploadDocuments": "పత్రాలను అప్‌లోడ్ చేయండి"
  },
  "forms": {
    "email": "ఇమెయిల్",
    "password": "పాస్వర్డ్",
    "emailPlaceholder": "మీ ఇమెయిల్ నమోదు చేయండి",
    "passwordPlaceholder": "మీ పాస్‌వర్డ్ నమోదు చేయండి",
    "validationRequired": "ఈ ఫీల్డ్ అవసరం",
    "successMessage": "ఆపరేషన్ విజయవంతమైంది"
  },
  "landing": {
    "heroTitle": "అందరికీ ఆర్థిక చేరిక",
    "heroSubtitle": "తదుపరి బిలియన్ వినియోగదారుల కోసం AI-ఆధారిత క్రెడిట్ అంచనా.",
    "getStarted": "ప్రారంభించండి"
  }
};

const ta = {
  "common": {
    "loading": "ஏற்றுகிறது...",
    "error": "ஒரு பிழை ஏற்பட்டது",
    "submit": "சமர்ப்பி",
    "cancel": "ரத்துசெய்",
    "continue": "தொடரவும்",
    "save": "சேமி"
  },
  "navbar": {
    "dashboard": "டாஷ்போர்டு",
    "profile": "சுயவிவரம்",
    "settings": "அமைப்புகள்",
    "logout": "வெளியேறு",
    "login": "உள்நுழை",
    "register": "பதிவு",
    "home": "முகப்பு",
    "features": "அம்சங்கள்",
    "pricing": "விலை",
    "language": "மொழி"
  },
  "dashboard": {
    "altCreditScore": "மாற்று கடன் மதிப்பெண்",
    "financialHealth": "நிதி ஆரோக்கியம்",
    "riskLevel": "ஆபத்து நிலை",
    "loanRecommendation": "கடன் பரிந்துரை",
    "repaymentProbability": "திருப்பிச் செலுத்தும் நிகழ்தகவு",
    "monthlyIncome": "மாதாந்திர வருமானம்",
    "monthlyExpenses": "மாதாந்திர செலவுகள்",
    "savings": "சேமிப்பு",
    "cashFlow": "பணப்புழக்கம்",
    "aiInsights": "AI நுண்ணறிவு",
    "reports": "அறிக்கைகள்",
    "uploadDocuments": "ஆவணங்களை பதிவேற்றவும்"
  },
  "forms": {
    "email": "மின்னஞ்சல்",
    "password": "கடவுச்சொல்",
    "emailPlaceholder": "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
    "passwordPlaceholder": "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    "validationRequired": "இந்த புலம் தேவை",
    "successMessage": "செயல்பாடு வெற்றிகரமாக முடிந்தது"
  },
  "landing": {
    "heroTitle": "அனைவருக்கும் நிதி உள்ளடக்கம்",
    "heroSubtitle": "அடுத்த பில்லியன் பயனர்களுக்கான AI-ஆதரவு கடன் மதிப்பீடு.",
    "getStarted": "தொடங்குங்கள்"
  }
};

const kn = {
  "common": {
    "loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    "error": "ಒಂದು ದೋಷ ಸಂಭವಿಸಿದೆ",
    "submit": "ಸಲ್ಲಿಸಿ",
    "cancel": "ರದ್ದುಗೊಳಿಸಿ",
    "continue": "ಮುಂದುವರಿಸಿ",
    "save": "ಉಳಿಸಿ"
  },
  "navbar": {
    "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "profile": "ಪ್ರೊಫೈಲ್",
    "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "logout": "ಲಾಗ್ ಔಟ್",
    "login": "ಲಾಗ್ ಇನ್",
    "register": "ನೋಂದಣಿ",
    "home": "ಮುಖಪುಟ",
    "features": "ವೈಶಿಷ್ಟ್ಯಗಳು",
    "pricing": "ಬೆಲೆ",
    "language": "ಭಾಷೆ"
  },
  "dashboard": {
    "altCreditScore": "ಪರ್ಯಾಯ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್",
    "financialHealth": "ಹಣಕಾಸು ಆರೋಗ್ಯ",
    "riskLevel": "ಅಪಾಯದ ಮಟ್ಟ",
    "loanRecommendation": "ಸಾಲದ ಶಿಫಾರಸು",
    "repaymentProbability": "ಮರುಪಾವತಿ ಸಾಧ್ಯತೆ",
    "monthlyIncome": "ಮಾಸಿಕ ಆದಾಯ",
    "monthlyExpenses": "ಮಾಸಿಕ ವೆಚ್ಚಗಳು",
    "savings": "ಉಳಿತಾಯ",
    "cashFlow": "ನಗದು ಹರಿವು",
    "aiInsights": "AI ಒಳನೋಟಗಳು",
    "reports": "ವರದಿಗಳು",
    "uploadDocuments": "ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
  },
  "forms": {
    "email": "ಇಮೇಲ್",
    "password": "ಪಾಸ್ವರ್ಡ್",
    "emailPlaceholder": "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ",
    "passwordPlaceholder": "ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ",
    "validationRequired": "ಈ ಕ್ಷೇತ್ರ ಅಗತ್ಯವಿದೆ",
    "successMessage": "ಕಾರ್ಯಾಚರಣೆ ಯಶಸ್ವಿಯಾಗಿದೆ"
  },
  "landing": {
    "heroTitle": "ಎಲ್ಲರಿಗೂ ಆರ್ಥಿಕ ಸೇರ್ಪಡೆ",
    "heroSubtitle": "ಮುಂದಿನ ಶತಕೋಟಿ ಬಳಕೆದಾರರಿಗೆ AI-ಚಾಲಿತ ಕ್ರೆಡಿಟ್ ಮೌಲ್ಯಮಾಪನ.",
    "getStarted": "ಪ್ರಾರಂಭಿಸಿ"
  }
};

const ml = {
  "common": {
    "loading": "ലോഡുചെയ്യുന്നു...",
    "error": "ഒരു പിശക് സംഭവിച്ചു",
    "submit": "സമർപ്പിക്കുക",
    "cancel": "റദ്ദാക്കുക",
    "continue": "തുടരുക",
    "save": "സംരക്ഷിക്കുക"
  },
  "navbar": {
    "dashboard": "ഡാഷ്‌ബോർഡ്",
    "profile": "പ്രൊഫൈൽ",
    "settings": "ക്രമീകരണങ്ങൾ",
    "logout": "ലോഗ് ഔട്ട്",
    "login": "ലോഗിൻ",
    "register": "രജിസ്റ്റർ ചെയ്യുക",
    "home": "ഹോം",
    "features": "സവിശേഷതകൾ",
    "pricing": "വില",
    "language": "ഭാഷ"
  },
  "dashboard": {
    "altCreditScore": "ബദൽ ക്രെഡിറ്റ് സ്കോർ",
    "financialHealth": "സാമ്പത്തിക ആരോഗ്യം",
    "riskLevel": "അപകടസാധ്യത നില",
    "loanRecommendation": "ലോൺ ശുപാർശ",
    "repaymentProbability": "തിരിച്ചടയ്ക്കാനുള്ള സാധ്യത",
    "monthlyIncome": "പ്രതിമാസ വരുമാനം",
    "monthlyExpenses": "പ്രതിമാസ ചെലവുകൾ",
    "savings": "സമ്പാദ്യം",
    "cashFlow": "പണമൊഴുക്ക്",
    "aiInsights": "AI സ്ഥിതിവിവരക്കണക്കുകൾ",
    "reports": "റിപ്പോർട്ടുകൾ",
    "uploadDocuments": "രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക"
  },
  "forms": {
    "email": "ഇമെയിൽ",
    "password": "പാസ്‌വേഡ്",
    "emailPlaceholder": "നിങ്ങളുടെ ഇമെയിൽ നൽകുക",
    "passwordPlaceholder": "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക",
    "validationRequired": "ഈ ഫീൽഡ് നിർബന്ധമാണ്",
    "successMessage": "പ്രവർത്തനം വിജയകരമാണ്"
  },
  "landing": {
    "heroTitle": "എല്ലാവർക്കും സാമ്പത്തിക ഉൾപ്പെടുത്തൽ",
    "heroSubtitle": "അടുത്ത ബില്യൺ ഉപയോക്താക്കൾക്കായി AI അടിസ്ഥാനമാക്കിയുള്ള ക്രെഡിറ്റ് വിലയിരുത്തൽ.",
    "getStarted": "ആരംഭിക്കുക"
  }
};

const mr = {
  "common": {
    "loading": "लोड करत आहे...",
    "error": "एक त्रुटी आली",
    "submit": "सबमिट करा",
    "cancel": "रद्द करा",
    "continue": "सुरू ठेवा",
    "save": "जतन करा"
  },
  "navbar": {
    "dashboard": "डॅशबोर्ड",
    "profile": "प्रोफाइल",
    "settings": "सेटिंग्ज",
    "logout": "लॉग आउट",
    "login": "लॉग इन",
    "register": "नोंदणी करा",
    "home": "मुख्यपृष्ठ",
    "features": "वैशिष्ट्ये",
    "pricing": "किंमत",
    "language": "भाषा"
  },
  "dashboard": {
    "altCreditScore": "पर्यायी क्रेडिट स्कोअर",
    "financialHealth": "आर्थिक आरोग्य",
    "riskLevel": "धोक्याची पातळी",
    "loanRecommendation": "कर्ज शिफारस",
    "repaymentProbability": "परतफेडीची शक्यता",
    "monthlyIncome": "मासिक उत्पन्न",
    "monthlyExpenses": "मासिक खर्च",
    "savings": "बचत",
    "cashFlow": "रोख प्रवाह",
    "aiInsights": "AI अंतर्दृष्टी",
    "reports": "अहवाल",
    "uploadDocuments": "कागदपत्रे अपलोड करा"
  },
  "forms": {
    "email": "ईमेल",
    "password": "पासवर्ड",
    "emailPlaceholder": "तुमचा ईमेल प्रविष्ट करा",
    "passwordPlaceholder": "तुमचा पासवर्ड प्रविष्ट करा",
    "validationRequired": "हे क्षेत्र आवश्यक आहे",
    "successMessage": "ऑपरेशन यशस्वी"
  },
  "landing": {
    "heroTitle": "सर्वांसाठी आर्थिक समावेशन",
    "heroSubtitle": "पुढील अब्ज वापरकर्त्यांसाठी एआय-सक्षम क्रेडिट मूल्यांकन.",
    "getStarted": "सुरुवात करा"
  }
};

const bn = {
  "common": {
    "loading": "লোড হচ্ছে...",
    "error": "একটি ত্রুটি ঘটেছে",
    "submit": "জমা দিন",
    "cancel": "বাতিল করুন",
    "continue": "চালিয়ে যান",
    "save": "সংরক্ষণ করুন"
  },
  "navbar": {
    "dashboard": "ড্যাশবোর্ড",
    "profile": "প্রোফাইল",
    "settings": "সেটিংস",
    "logout": "লগ আউট",
    "login": "লগ ইন",
    "register": "নিবন্ধন করুন",
    "home": "হোম",
    "features": "বৈশিষ্ট্য",
    "pricing": "মূল্য নির্ধারণ",
    "language": "ভাষা"
  },
  "dashboard": {
    "altCreditScore": "বিকল্প ক্রেডিট স্কোর",
    "financialHealth": "আর্থিক স্বাস্থ্য",
    "riskLevel": "ঝুঁকির স্তর",
    "loanRecommendation": "ঋণ সুপারিশ",
    "repaymentProbability": "পরিশোধের সম্ভাবনা",
    "monthlyIncome": "মাসিক আয়",
    "monthlyExpenses": "মাসিক ব্যয়",
    "savings": "সঞ্চয়",
    "cashFlow": "নগদ প্রবাহ",
    "aiInsights": "এআই অন্তর্দৃষ্টি",
    "reports": "প্রতিবেদন",
    "uploadDocuments": "নথিপত্র আপলোড করুন"
  },
  "forms": {
    "email": "ইমেইল",
    "password": "পাসওয়ার্ড",
    "emailPlaceholder": "আপনার ইমেইল লিখুন",
    "passwordPlaceholder": "আপনার পাসওয়ার্ড লিখুন",
    "validationRequired": "এই ক্ষেত্রটি প্রয়োজন",
    "successMessage": "অপারেশন সফল"
  },
  "landing": {
    "heroTitle": "সবার জন্য আর্থিক অন্তর্ভুক্তি",
    "heroSubtitle": "পরবর্তী বিলিয়ন ব্যবহারকারীদের জন্য এআই-চালিত ক্রেডিট মূল্যায়ন।",
    "getStarted": "শুরু করুন"
  }
};

const localesDir = path.join(__dirname, 'src', 'locales');
if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(en, null, 2));
fs.writeFileSync(path.join(localesDir, 'hi.json'), JSON.stringify(hi, null, 2));
fs.writeFileSync(path.join(localesDir, 'te.json'), JSON.stringify(te, null, 2));
fs.writeFileSync(path.join(localesDir, 'ta.json'), JSON.stringify(ta, null, 2));
fs.writeFileSync(path.join(localesDir, 'kn.json'), JSON.stringify(kn, null, 2));
fs.writeFileSync(path.join(localesDir, 'ml.json'), JSON.stringify(ml, null, 2));
fs.writeFileSync(path.join(localesDir, 'mr.json'), JSON.stringify(mr, null, 2));
fs.writeFileSync(path.join(localesDir, 'bn.json'), JSON.stringify(bn, null, 2));

console.log('Locales generated successfully.');
