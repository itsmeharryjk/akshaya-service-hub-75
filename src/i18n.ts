import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    resources: {
      en: {
        translation: {
          // Navigation
          home: "Home",
          documents: "Documents",
          payments: "Payments",
          processedDocuments: "Processed Documents",
          account: "Account",
          
          // Common
          loading: "Loading...",
          save: "Save",
          cancel: "Cancel",
          delete: "Delete",
          edit: "Edit",
          view: "View",
          download: "Download",
          upload: "Upload",
          back: "Back",
          next: "Next",
          submit: "Submit",
          close: "Close",
          
          // Auth
          welcome: "Welcome to Akshaya E-Services",
          signIn: "Sign in to access government services",
          phoneNumber: "Phone Number",
          enterPhone: "Enter your phone number",
          getOTP: "Get OTP",
          enterOTP: "Enter OTP sent to +91",
          didntReceive: "Didn't receive?",
          resendOTP: "Resend OTP",
          verifyLogin: "Verify & Login",
          changePhone: "Change Phone Number",
          logout: "Logout",
          
          // Home
          welcomeMessage: "Welcome to Akshaya E-Services",
          homeDescription: "Access government services easily from your mobile device. Apply for certificates, documents, and more.",
          availableServices: "Available Services",
          searchServices: "Search services...",
          noServicesFound: "No services found matching",
          cantFind: "Can't find what you're looking for?",
          callSupport: "Call Akshaya Support",
          aboutTitle: "About Akshaya E-Services",
          aboutDescription: "Akshaya E-Services is a government initiative to provide easy access to various services through mobile devices. Apply for documents, certificates, and make payments from the comfort of your home.",
          
          // Services
          rationCard: "Ration Card",
          birthCertificate: "Birth Certificate",
          incomeCertificate: "Income Certificate",
          residenceCertificate: "Residence Certificate",
          pensionScheme: "Pension Scheme",
          casteCertificate: "Caste Certificate",
          landRecords: "Land Records",
          drivingLicense: "Driving License",
          vehicleRegistration: "Vehicle Registration",
          incomeTax: "Income Tax",
          landTax: "Land Tax",
          propertyTax: "Property Tax",
          
          // Documents
          myDocuments: "My Documents",
          documentsDescription: "This is where all your scanned documents are stored. You can view, send to Akshaya services, or delete your documents. Use the scan button below to add new documents.",
          noDocuments: "No Documents",
          noDocumentsDescription: "You haven't scanned or uploaded any documents yet.",
          scanFirstDocument: "Scan Your First Document",
          sendToAkshaya: "Send to Akshaya",
          documentScanner: "Document Scanner",
          scanDocument: "Scan Document",
          positionDocument: "Position your document within the frame and take a clear photo",
          openCamera: "Open Camera",
          uploadImage: "Upload Image",
          retake: "Retake",
          saveDocument: "Save Document",
          documentName: "Document Name",
          enterDocumentName: "Enter document name",
          
          // Payments
          paymentHistory: "Payment History",
          paymentMethods: "Payment Methods",
          payNow: "Pay Now",
          transactionHistory: "Transaction History",
          paymentHistoryDescription: "View your payment history for all services. Track when and how much you paid for each government service.",
          paymentMethodsDescription: "Manage your saved payment options for quick and easy transactions. Add UPI IDs or card details for secure payments.",
          makePaymentDescription: "Complete payments for government services quickly and securely. Use your saved payment methods or add a new one.",
          noTransactions: "No transactions yet",
          yourSavings: "Your Savings with Akshaya",
          timeSaved: "Time Saved",
          moneySaved: "Money Saved",
          visitsAvoided: "Visits Avoided",
          noPaymentMethods: "No payment methods",
          addPaymentMethod: "Add a payment method to enable faster checkout",
          addNewPaymentMethod: "Add New Payment Method",
          selectPaymentMethod: "Select Payment Method",
          savedMethods: "Saved Methods",
          upiGooglePay: "UPI / Google Pay",
          creditDebitCard: "Credit/Debit Card",
          upiId: "UPI ID / Google Pay Number",
          cardNumber: "Card Number",
          expiryDate: "Expiry Date",
          cvv: "CVV",
          nameOnCard: "Name on Card",
          processing: "Processing...",
          pay: "Pay",
          securedBy: "Secured by Akshaya Payment Gateway",
          
          // Processed Documents
          processedDocuments: "Processed Documents",
          processedDocumentsDescription: "Track the status of your service applications and download completed documents. You'll receive notifications when your documents are ready for collection or download.",
          noProcessedDocuments: "No Processed Documents",
          noProcessedDocumentsDescription: "Your completed service applications will appear here once they are processed.",
          browseServices: "Browse Services",
          completed: "Completed",
          readyForPickup: "Ready for Pickup",
          processing: "Processing",
          rejected: "Rejected",
          applied: "Applied",
          processed: "Processed",
          remarks: "Remarks",
          reapply: "Reapply",
          needHelp: "Need Help?",
          needHelpDescription: "If you have questions about your application status or need assistance with document collection, contact your nearest Akshaya center.",
          contactSupport: "Contact Support",
          
          // Account
          myAccount: "My Account",
          editProfile: "Edit Profile",
          fullName: "Full Name",
          emailAddress: "Email Address",
          phoneNumberNote: "Phone number cannot be changed",
          saveChanges: "Save Changes",
          myDocumentsMenu: "My Documents",
          privacySecurity: "Privacy & Security",
          appSettings: "App Settings",
          helpSupport: "Help & Support",
          
          // Service Details
          requiredDocuments: "Required Documents",
          fee: "Fee",
          proceedToPayment: "Proceed to Payment",
          uploadAllRequired: "Please upload all required documents to proceed",
          uploaded: "Uploaded",
          scan: "Scan",
          rescan: "Re-scan",
          
          // Notifications
          notifications: "Notifications",
          noNotifications: "No new notifications",
          stayUpdated: "Stay updated with important alerts about your applications and government announcements",
          
          // Payment Success
          paymentSuccessful: "Payment Successful!",
          transactionCompleted: "Your transaction has been completed successfully.",
          transactionId: "Transaction ID",
          date: "Date",
          time: "Time",
          downloadReceipt: "Download Receipt",
          backToHome: "Back to Home",
          confirmationSent: "A confirmation has been sent to your registered email and mobile number.",
          
          // Errors
          pageNotFound: "Page Not Found",
          pageNotFoundDescription: "The page you are looking for doesn't exist or has been moved.",
          goToHome: "Go to Home",
        }
      },
      ml: {
        translation: {
          // Navigation
          home: "ഹോം",
          documents: "രേഖകൾ",
          payments: "പേയ്‌മെന്റുകൾ",
          processedDocuments: "പ്രോസസ്സ് ചെയ്ത രേഖകൾ",
          account: "അക്കൗണ്ട്",
          
          // Common
          loading: "ലോഡ് ചെയ്യുന്നു...",
          save: "സേവ് ചെയ്യുക",
          cancel: "റദ്ദാക്കുക",
          delete: "ഇല്ലാതാക്കുക",
          edit: "എഡിറ്റ് ചെയ്യുക",
          view: "കാണുക",
          download: "ഡൗൺലോഡ് ചെയ്യുക",
          upload: "അപ്‌ലോഡ് ചെയ്യുക",
          back: "തിരികെ",
          next: "അടുത്തത്",
          submit: "സമർപ്പിക്കുക",
          close: "അടയ്ക്കുക",
          
          // Auth
          welcome: "അക്ഷയ ഇ-സേവനങ്ങളിലേക്ക് സ്വാഗതം",
          signIn: "സർക്കാർ സേവനങ്ങൾ ആക്സസ് ചെയ്യാൻ സൈൻ ഇൻ ചെയ്യുക",
          phoneNumber: "ഫോൺ നമ്പർ",
          enterPhone: "നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക",
          getOTP: "OTP നേടുക",
          enterOTP: "+91 ലേക്ക് അയച്ച OTP നൽകുക",
          didntReceive: "ലഭിച്ചില്ലേ?",
          resendOTP: "OTP വീണ്ടും അയയ്ക്കുക",
          verifyLogin: "സ്ഥിരീകരിച്ച് ലോഗിൻ ചെയ്യുക",
          changePhone: "ഫോൺ നമ്പർ മാറ്റുക",
          logout: "ലോഗൗട്ട്",
          
          // Home
          welcomeMessage: "അക്ഷയ ഇ-സേവനങ്ങളിലേക്ക് സ്വാഗതം",
          homeDescription: "നിങ്ങളുടെ മൊബൈൽ ഉപകരണത്തിൽ നിന്ന് സർക്കാർ സേവനങ്ങൾ എളുപ്പത്തിൽ ആക്സസ് ചെയ്യുക. സർട്ടിഫിക്കറ്റുകൾ, രേഖകൾ എന്നിവയ്ക്കായി അപേക്ഷിക്കുക.",
          availableServices: "ലഭ്യമായ സേവനങ്ങൾ",
          searchServices: "സേവനങ്ങൾ തിരയുക...",
          noServicesFound: "പൊരുത്തപ്പെടുന്ന സേവനങ്ങൾ കണ്ടെത്തിയില്ല",
          cantFind: "നിങ്ങൾ തിരയുന്നത് കണ്ടെത്താൻ കഴിയുന്നില്ലേ?",
          callSupport: "അക്ഷയ സപ്പോർട്ടിനെ വിളിക്കുക",
          aboutTitle: "അക്ഷയ ഇ-സേവനങ്ങളെ കുറിച്ച്",
          aboutDescription: "മൊബൈൽ ഉപകരണങ്ങളിലൂടെ വിവിധ സേവനങ്ങളിലേക്ക് എളുപ്പത്തിൽ പ്രവേശനം നൽകുന്നതിനുള്ള ഒരു സർക്കാർ സംരംഭമാണ് അക്ഷയ ഇ-സേവനങ്ങൾ.",
          
          // Services
          rationCard: "റേഷൻ കാർഡ്",
          birthCertificate: "ജനന സർട്ടിഫിക്കറ്റ്",
          incomeCertificate: "വരുമാന സർട്ടിഫിക്കറ്റ്",
          residenceCertificate: "താമസ സർട്ടിഫിക്കറ്റ്",
          pensionScheme: "പെൻഷൻ പദ്ധതി",
          casteCertificate: "ജാതി സർട്ടിഫിക്കറ്റ്",
          landRecords: "ഭൂമി രേഖകൾ",
          drivingLicense: "ഡ്രൈവിംഗ് ലൈസൻസ്",
          vehicleRegistration: "വാഹന രജിസ്ട്രേഷൻ",
          incomeTax: "ആദായ നികുതി",
          landTax: "ഭൂമി നികുതി",
          propertyTax: "സ്വത്ത് നികുതി",
          
          // Documents
          myDocuments: "എന്റെ രേഖകൾ",
          documentsDescription: "നിങ്ങളുടെ എല്ലാ സ്കാൻ ചെയ്ത രേഖകളും ഇവിടെ സംഭരിച്ചിരിക്കുന്നു. നിങ്ങൾക്ക് കാണാനും അക്ഷയ സേവനങ്ങളിലേക്ക് അയയ്ക്കാനും അല്ലെങ്കിൽ നിങ്ങളുടെ രേഖകൾ ഇല്ലാതാക്കാനും കഴിയും.",
          noDocuments: "രേഖകളില്ല",
          noDocumentsDescription: "നിങ്ങൾ ഇതുവരെ രേഖകൾ സ്കാൻ ചെയ്യുകയോ അപ്‌ലോഡ് ചെയ്യുകയോ ചെയ്തിട്ടില്ല.",
          scanFirstDocument: "നിങ്ങളുടെ ആദ്യ രേഖ സ്കാൻ ചെയ്യുക",
          sendToAkshaya: "അക്ഷയയിലേക്ക് അയയ്ക്കുക",
          documentScanner: "രേഖ സ്കാനർ",
          scanDocument: "രേഖ സ്കാൻ ചെയ്യുക",
          positionDocument: "നിങ്ങളുടെ രേഖ ഫ്രെയിമിനുള്ളിൽ സ്ഥാപിച്ച് വ്യക്തമായ ഫോട്ടോ എടുക്കുക",
          openCamera: "ക്യാമറ തുറക്കുക",
          uploadImage: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
          retake: "വീണ്ടും എടുക്കുക",
          saveDocument: "രേഖ സേവ് ചെയ്യുക",
          documentName: "രേഖയുടെ പേര്",
          enterDocumentName: "രേഖയുടെ പേര് നൽകുക",
          
          // Payments
          paymentHistory: "പേയ്‌മെന്റ് ചരിത്രം",
          paymentMethods: "പേയ്‌മെന്റ് രീതികൾ",
          payNow: "ഇപ്പോൾ പണമടയ്ക്കുക",
          transactionHistory: "ഇടപാട് ചരിത്രം",
          paymentHistoryDescription: "എല്ലാ സേവനങ്ങൾക്കുമുള്ള നിങ്ങളുടെ പേയ്‌മെന്റ് ചരിത്രം കാണുക. ഓരോ സർക്കാർ സേവനത്തിനും എപ്പോൾ എത്ര പണം നൽകി എന്ന് ട്രാക്ക് ചെയ്യുക.",
          paymentMethodsDescription: "വേഗത്തിലുള്ളതും എളുപ്പമുള്ളതുമായ ഇടപാടുകൾക്കായി നിങ്ങളുടെ സേവ് ചെയ്ത പേയ്‌മെന്റ് ഓപ്ഷനുകൾ മാനേജ് ചെയ്യുക.",
          makePaymentDescription: "സുരക്ഷിതമായ പേയ്‌മെന്റുകൾക്കായി നിങ്ങളുടെ സേവ് ചെയ്ത പേയ്‌മെന്റ് രീതികൾ ഉപയോഗിക്കുക അല്ലെങ്കിൽ പുതിയത് ചേർക്കുക.",
          noTransactions: "ഇടപാടുകളില്ല",
          yourSavings: "അക്ഷയയിലൂടെ നിങ്ങളുടെ ലാഭം",
          timeSaved: "സമയം ലാഭിച്ചു",
          moneySaved: "പണം ലാഭിച്ചു",
          visitsAvoided: "സന്ദർശനങ്ങൾ ഒഴിവാക്കി",
          noPaymentMethods: "പേയ്‌മെന്റ് രീതികളില്ല",
          addPaymentMethod: "വേഗത്തിലുള്ള ചെക്കൗട്ട് പ്രാപ്തമാക്കാൻ ഒരു പേയ്‌മെന്റ് രീതി ചേർക്കുക",
          addNewPaymentMethod: "പുതിയ പേയ്‌മെന്റ് രീതി ചേർക്കുക",
          selectPaymentMethod: "പേയ്‌മെന്റ് രീതി തിരഞ്ഞെടുക്കുക",
          savedMethods: "സേവ് ചെയ്ത രീതികൾ",
          upiGooglePay: "UPI / Google Pay",
          creditDebitCard: "ക്രെഡിറ്റ്/ഡെബിറ്റ് കാർഡ്",
          upiId: "UPI ID / Google Pay നമ്പർ",
          cardNumber: "കാർഡ് നമ്പർ",
          expiryDate: "കാലാവധി തീയതി",
          cvv: "CVV",
          nameOnCard: "കാർഡിലെ പേര്",
          processing: "പ്രോസസ്സിംഗ്...",
          pay: "പണമടയ്ക്കുക",
          securedBy: "അക്ഷയ പേയ്‌മെന്റ് ഗേറ്റ്‌വേ സുരക്ഷിതമാക്കിയത്",
          
          // Processed Documents
          processedDocuments: "പ്രോസസ്സ് ചെയ്ത രേഖകൾ",
          processedDocumentsDescription: "നിങ്ങളുടെ സേവന അപേക്ഷകളുടെ സ്ഥിതി ട്രാക്ക് ചെയ്യുകയും പൂർത്തിയായ രേഖകൾ ഡൗൺലോഡ് ചെയ്യുകയും ചെയ്യുക.",
          noProcessedDocuments: "പ്രോസസ്സ് ചെയ്ത രേഖകളില്ല",
          noProcessedDocumentsDescription: "നിങ്ങളുടെ പൂർത്തിയായ സേവന അപേക്ഷകൾ പ്രോസസ്സ് ചെയ്തുകഴിഞ്ഞാൽ ഇവിടെ ദൃശ്യമാകും.",
          browseServices: "സേവനങ്ങൾ ബ്രൗസ് ചെയ്യുക",
          completed: "പൂർത്തിയായി",
          readyForPickup: "എടുക്കാൻ തയ്യാർ",
          processing: "പ്രോസസ്സിംഗ്",
          rejected: "നിരസിച്ചു",
          applied: "അപേക്ഷിച്ചു",
          processed: "പ്രോസസ്സ് ചെയ്തു",
          remarks: "അഭിപ്രായങ്ങൾ",
          reapply: "വീണ്ടും അപേക്ഷിക്കുക",
          needHelp: "സഹായം വേണോ?",
          needHelpDescription: "നിങ്ങളുടെ അപേക്ഷയുടെ സ്ഥിതിയെക്കുറിച്ച് ചോദ്യങ്ങളുണ്ടെങ്കിൽ അല്ലെങ്കിൽ രേഖ ശേഖരണത്തിൽ സഹായം ആവശ്യമുണ്ടെങ്കിൽ, നിങ്ങളുടെ അടുത്തുള്ള അക്ഷയ കേന്ദ്രത്തെ ബന്ധപ്പെടുക.",
          contactSupport: "സപ്പോർട്ടുമായി ബന്ധപ്പെടുക",
          
          // Account
          myAccount: "എന്റെ അക്കൗണ്ട്",
          editProfile: "പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക",
          fullName: "പൂർണ്ണ നാമം",
          emailAddress: "ഇമെയിൽ വിലാസം",
          phoneNumberNote: "ഫോൺ നമ്പർ മാറ്റാൻ കഴിയില്ല",
          saveChanges: "മാറ്റങ്ങൾ സേവ് ചെയ്യുക",
          myDocumentsMenu: "എന്റെ രേഖകൾ",
          privacySecurity: "സ്വകാര്യതയും സുരക്ഷയും",
          appSettings: "ആപ്പ് ക്രമീകരണങ്ങൾ",
          helpSupport: "സഹായവും പിന്തുണയും",
          
          // Service Details
          requiredDocuments: "ആവശ്യമായ രേഖകൾ",
          fee: "ഫീസ്",
          proceedToPayment: "പേയ്‌മെന്റിലേക്ക് പോകുക",
          uploadAllRequired: "തുടരാൻ ആവശ്യമായ എല്ലാ രേഖകളും അപ്‌ലോഡ് ചെയ്യുക",
          uploaded: "അപ്‌ലോഡ് ചെയ്തു",
          scan: "സ്കാൻ",
          rescan: "വീണ്ടും സ്കാൻ ചെയ്യുക",
          
          // Notifications
          notifications: "അറിയിപ്പുകൾ",
          noNotifications: "പുതിയ അറിയിപ്പുകളില്ല",
          stayUpdated: "നിങ്ങളുടെ അപേക്ഷകളെക്കുറിച്ചുള്ള പരിപ്രായ അലേർട്ടുകളും സർക്കാർ പ്രഖ്യാപനങ്ങളും അപ്‌ഡേറ്റ് ചെയ്യുക",
          
          // Payment Success
          paymentSuccessful: "പേയ്‌മെന്റ് വിജയകരം!",
          transactionCompleted: "നിങ്ങളുടെ ഇടപാട് വിജയകരമായി പൂർത്തിയായി.",
          transactionId: "ഇടപാട് ID",
          date: "തീയതി",
          time: "സമയം",
          downloadReceipt: "രസീത് ഡൗൺലോഡ് ചെയ്യുക",
          backToHome: "ഹോമിലേക്ക് തിരികെ",
          confirmationSent: "നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത ഇമെയിലിലേക്കും മൊബൈൽ നമ്പറിലേക്കും ഒരു സ്ഥിരീകരണം അയച്ചിട്ടുണ്ട്.",
          
          // Errors
          pageNotFound: "പേജ് കണ്ടെത്തിയില്ല",
          pageNotFoundDescription: "നിങ്ങൾ തിരയുന്ന പേജ് നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്തിരിക്കുന്നു.",
          goToHome: "ഹോമിലേക്ക് പോകുക",
        }
      }
    }
  });

export default i18n;