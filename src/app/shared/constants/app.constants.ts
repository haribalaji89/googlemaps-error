 export const countryInformation = {    
  my: {
    currencyCodeHome: 'RM',
    country: 'Malaysia',
    countryCode: 'my',
    callingCode: '+60',
    langCode: 'en',
    currencyCode: 'RM',
    minPaymentAmt: '20',
    cicNumber:'tel:1800883000',
    // tslint:disable-next-line:max-line-length
    disclaimer: 'Disclaimer: Some images are for advertisement. The appearance and equipment may differ from the actual vehicle. Please contact your nearest BMW authorized dealer for more information. 7% VAT included. | Company reserves the right to change prices and equipment without prior notice. Price with BSI STANDARD package; 3 years of maintenance or 60,000 km. (whichever comes first) and 3 years unlimited mileage warranty. Monthly installments are calculated from price with BSI STANDARD package according to the Hire Purchase with Balloon agreement, with a 35% down payment for a period of 60 months and a final 30-35% Balloon payment of the retail price (depending on the car model). Details about Hire Purchase with Balloon, down payments, monthly installments and interest rates are subject to BMW Financial Services criteria. The privilege to purchase BSI package up to 5 years unlimited mileage warranty and 5 years of maintenance or 100,000 km. (whichever comes first) plus 5 years membership of BMW Mobility Service. Terms and conditions apply. | BMW Financial Services reserves the right to change terms and conditions without prior notice. | BMW Thailand reserves the right to change all information, specifications and illustrations without prior notice and is not responsible for typographical errors.',
    registration: {
        pincodeDigit: 5,
        phoneNumberDigitMin:9,
        phoneNumberDigit: 10,
        termsOfUsesLink: '#/user-terms'
    },
    profileUpdate: {
        gender: [
            {key: 'Male', value : 'Male' },
            {key: 'Female', value : 'Female' }
        ],
        primaryCar: [
            {key: 'True', value : 'Yes' },
            {key: 'False', value : 'No' }
        ],
        maritalStatus: [
            {key: 'Single', value : 'Single' },
            {key: 'Married', value : 'Married' },
            {key: 'Divorced', value : 'Divorced' },
            {key: 'Widowed', value : 'Widowed' },
            {key: 'With Partner', value : 'With Partner' }
        ],
        salutations: [
            {key: 'Mr.', value : 'Mr.' },
            {key: 'Mrs.', value : 'Mrs.' },
            {key: 'Ms.', value : 'Ms.' },
            {key: 'Dr.', value : 'Dr.' },
        ]
    },
    footer: {
        socialSites: [
            { title: 'Facebook', link: 'https://www.facebook.com/BMW.Malaysia', iconClass: 'fab fa-facebook-f logos' },
            { title: 'Instagram', link: 'https://www.instagram.com/bmwmalaysia/', iconClass: 'fab fa-instagram logos' },
            { title: 'Youtube', link: 'https://www.youtube.com/c/bmwmalaysia/', iconClass: 'fab fa-youtube logos' },
            { title: 'Linkedin', link: 'https://www.linkedin.com/company/bmwgroupmalaysia/', iconClass: 'fab fa-linkedin-in logos' },
        ],
        copyright: '© BMW THAILAND',
        contact: {
            tel: 'Tel: 1401-269-269 or 1800-269-269',
            timing: 'Monday - Friday 8:00 AM - 5:00 PM',
            mail: 'Email: callcenter@bmw.co.th'
        },
        legalLinks: {
            title: 'Legal Information',
            links: [

                {
                    title: 'Cookies',
                    link: 'https://www.bmw.com.my/en/footer/footer-section/cookie-policy.html',
                    liveLink: true
                },
                {
                    title: 'Legal Disclaimer',
                    link: 'https://www.bmw.com.my/en/footer/footer-section/legal-notice.html',
                    liveLink: true
                },
                {
                    title: 'footer.customerPortal.policy',
                    link: 'https://www.bmw.com.my/en/footer/footer-section/privacy-policy.html',
                    liveLink: true
                },
                {
                    title: 'footer.customerPortal.financingPrivacypolicy',
                    link: 'https://www.bmw.com.my/content/dam/bmw/marketMY/bmw_com_my/ownership/bmw-financial-services/202005013%20BMW%20CREDIT%20AND%20LEASE%20PRIVACY%20POLICY_latest2020.pdf',
                    liveLink: true
                }
            ]
        }
    },
    feedbackMsgs: {
        lessLikelyLabel: 'Less likely',
        moreLikelyLabel: 'More likely'
    },
    feedbackInputs: {
        commentMaxLength: 1000
    },
    usedCars:{
        UAT:'https://uat.bmwpremiumselection.com.my/',
        PROD:'https://bmwpremiumselection.com.my/',
    },
    tracyApiError: 'api error',
    tinyPodVariantNameLength: 17,
    tinyPodDealerTextLength: 28
  },

};
