const products = [
  {
    id: 1,
    added: 0,
    name: 'Product 1',
    price: 100,
    image: 'https://picsum.photos/200/300?random=1',
    description: 'A unique gadget tailored for efficiency and comfort.',
  },
  {
    id: 2,
    added: 0,
    name: 'Product 2',
    price: 200,
    image: 'https://picsum.photos/200/300?random=2',
    description: 'An advanced tool designed to enhance your productivity.',
  },
  {
    id: 3,
    added: 0,
    name: 'Product 3',
    price: 300,
    image: 'https://picsum.photos/200/300?random=3',
    description:
      'A state-of-the-art appliance that combines style and functionality.',
  },
  {
    id: 4,
    added: 0,
    name: 'Product 4',
    price: 400,
    image: 'https://picsum.photos/200/300?random=4',
    description: 'The perfect solution for your high-tech lifestyle needs.',
  },
  {
    id: 5,
    added: 0,
    name: 'Product 5',
    price: 500,
    image: 'https://picsum.photos/200/300?random=2',
    description: 'A revolutionary new product that redefines the way you live.',
  },
  {
    id: 6,
    added: 0,
    name: 'Product 6',
    price: 100,
    image: 'https://picsum.photos/200/300?random=5',
    description: 'Compact and reliable, ideal for everyday use.',
  },
  {
    id: 7,
    added: 0,
    name: 'Product 7',
    price: 200,
    image: 'https://picsum.photos/200/300?random=19',
    description: 'Elegant and powerful, ensures top performance.',
  },
  {
    id: 8,
    added: 0,
    name: 'Product 8',
    price: 300,
    image: 'https://picsum.photos/200/300?random=6',
    description: 'A blend of classic design and modern technology.',
  },
  {
    id: 9,
    added: 0,
    name: 'Product 9',
    price: 400,
    image: 'https://picsum.photos/200/300?random=2',
    description: 'Innovative and sleek, crafted for optimal user experience.',
  },
  {
    id: 10,
    added: 0,
    name: 'Product 10',
    price: 500,
    image: 'https://picsum.photos/200/300?random=13',
    description: 'Luxury and performance combined in one must-have device.',
  },
  {
    id: 11,
    added: 0,
    name: 'Product 11',
    price: 100,
    image: 'https://picsum.photos/200/300?random=7',
    description: 'A reliable everyday item with improved features.',
  },
  {
    id: 12,
    added: 0,
    name: 'Product 12',
    price: 200,
    image: 'https://picsum.photos/200/300?random=8',
    description: 'An essential tool for professionals and hobbyists alike.',
  },
  {
    id: 13,
    added: 0,
    name: 'Product 13',
    price: 300,
    image: 'https://picsum.photos/200/300?random=9',
    description:
      'Bringing you closer to the future with cutting-edge technology.',
  },
  {
    id: 14,
    added: 0,
    name: 'Product 14',
    price: 400,
    image: 'https://picsum.photos/200/300?random=10',
    description: 'The ultimate product for enthusiasts and early adopters.',
  },
  {
    id: 15,
    added: 0,
    name: 'Product 15',
    price: 500,
    image: 'https://picsum.photos/200/300?random=11',
    description:
      'Defines luxury with exquisite design and impeccable performance.',
  },
];

const FAQ_DATA = {
  title: '340B Frequently Asked Questions',
  description:
    'These frequently asked questions (FAQs) are provided by HRSA to address common 340B Program compliance questions.',
  description2:
    'Additional FAQs may be available to address specific circumstances by contacting Apexus Answers. The removal of an FAQ from the website does not imply that the FAQ is no longer supported by HRSA. Contact Apexus Answers for any FAQ-related questions.',
  faq: [
    {
      id: 1,
      category: '340B Eligibility/Registration',
      questions: [
        {
          id: 1356,
          question:
            'We are a 340B covered entity hospital that qualifies as more than one covered entity type. What process should we follow to change our status and ensure no interruption in our 340B services?',
          answer:
            'Contact the HRSA 340B Program Operations Branch at 340bcompliance@hrsa.gov to initiate the process. Ensure that all program requirements are met during the transition period and follow the standard registration process for the new entity type.',
          lastModified: '04/12/2024',
        },
        {
          id: 1190,
          question:
            'Do clinics/departments/services located within the four walls of a registered 340B hospital have to be registered in 340B OPAIS?',
          answer:
            'No, outpatient clinics within the same physical mailing address of the parent hospital do not need separate registration. However, offsite clinics must be registered separately as child sites.',
          lastModified: '05/12/2023',
        },
        {
          id: 1295,
          question:
            'How should a hospital covered entity determine if an offsite outpatient facility is eligible for the 340B Program as a child site and should be registered on 340B OPAIS?',
          answer:
            'An offsite hospital outpatient facility must be listed as reimbursable on the parent hospital’s most recent Medicare cost report. If the facility submits its own cost reports under a different Medicare provider number, it is not eligible.',
          lastModified: '09/28/2022',
        },
        {
          id: 2436,
          question:
            'What are HRSA’s expectations regarding hospital eligibility and a contract with State or local government?',
          answer:
            'A private non-profit hospital must have a written contract with a state or local government to provide care to low-income individuals. The hospital must provide documentation proving its non-profit status and the existence of the contract.',
          lastModified: '09/28/2022',
        },
        {
          id: 1193,
          question:
            'May an outpatient facility that is reimbursed by CMS as a provider-based facility, but not included on the most recently filed Medicare cost report, participate in the 340B Program?',
          answer:
            'No, the facility must be both reimbursable and included in the hospital’s most recently filed Medicare cost report with associated outpatient costs and charges to access the 340B Program.',
          lastModified: '08/02/2022',
        },
        {
          id: 1319,
          question:
            "Our hospital has a clinic (within the four walls of the parent) that does not appear on the hospital's most recently filed Medicare cost report. Is this an eligible 340B area?",
          answer:
            'Only hospital outpatient facilities that appear as reimbursable outpatient cost centers on the hospital’s most recently filed Medicare cost report are eligible to be listed and participate in the 340B Program.',
          lastModified: '08/02/2022',
        },
        {
          id: 1687,
          question:
            'Must an entity remove a child site as soon as it knows it will not be on the next filed cost report, or should an entity remove a child site upon the date that the next cost report will be filed?',
          answer:
            'The child site must be removed from the 340B OPAIS when the hospital files its next Medicare cost report if the site will no longer be reimbursable on the cost report.',
          lastModified: '08/02/2022',
        },
        {
          id: 1364,
          question: 'When does a pharmacy qualify as an entity-owned pharmacy?',
          answer:
            'An entity-owned pharmacy is legally part of the 340B entity and is typically listed as a shipping address of the entity.',
          lastModified: '08/31/2021',
        },
        {
          id: 1230,
          question:
            'If an entity is funded under more than one grant program that is eligible to participate in the 340B program, must the entity register all programs with the OPA?',
          answer:
            'Eligible entities can register more than one grantee type, but they must follow the specific program requirements for each grant. Regular quarterly registration timelines apply.',
          lastModified: '09/30/2020',
        },
        {
          id: 1220,
          question:
            'A clinic is located within the four walls of the parent but has a separate physical address. What is meant by "within the four walls?"',
          answer:
            '"Within the four walls" refers to sharing the parent hospital\'s physical address, even if the clinic has a different suite address.',
          lastModified: '09/14/2020',
        },
        {
          id: 4308,
          question:
            'What are HRSA’s expectations for providing hospital classification documentation to support eligibility of hospitals in the 340B Program?',
          answer:
            "HRSA requires hospitals to upload supporting documentation for their classification at the time of registration. This includes proof of the hospital's relationship with a unit of state or local government.",
          lastModified: '07/23/2020',
        },
        {
          id: 1184,
          question:
            'How must we register our in-house pharmacy that is a separate legal entity under our 340B covered entity?',
          answer:
            'An in-house pharmacy that is a separate legal entity must be registered as a contract pharmacy in the 340B Program and cannot register as a child site.',
          lastModified: '05/29/2020',
        },
        {
          id: 1213,
          question:
            'As a grantee, if I need to add a new site to our existing 340B entity, what actions should I take?',
          answer:
            'All new sites must be registered with the 340B Program before participating. The Office of Pharmacy Affairs will verify eligibility with the appropriate granting agency.',
          lastModified: '05/29/2020',
        },
        {
          id: 1240,
          question:
            'If a covered entity has physician clinics, do they need to be registered as child sites?',
          answer:
            'Only hospital outpatient facilities listed as reimbursable outpatient cost centers on the most recent Medicare cost report are eligible to be registered as child sites in the 340B Program.',
          lastModified: '05/29/2020',
        },
        {
          id: 1241,
          question:
            'Can wholesalers / manufacturers refuse to ship to addresses listed in 340B OPAIS?',
          answer:
            'No, billing and shipping addresses listed in 340B OPAIS provide manufacturers and wholesalers assurance that the site is eligible to obtain 340B drugs. Entities must keep this information up to date.',
          lastModified: '05/29/2020',
        },
        {
          id: 1303,
          question:
            'Can a covered entity list an in-house pharmacy as a child site?',
          answer:
            'Pharmacies cannot be listed as child sites within 340B OPAIS. They can only be listed as a shipping address.',
          lastModified: '05/29/2020',
        },
        {
          id: 1373,
          question:
            'What actions does HRSA expect an entity to take if it loses 340B Program eligibility?',
          answer:
            'The entity must immediately stop purchasing 340B drugs, submit a termination request on 340B OPAIS, and work with manufacturers to handle the remaining inventory.',
          lastModified: '05/28/2020',
        },
        {
          id: 1431,
          question:
            'Can the 340B OPAIS registration accommodate simultaneous online covered entity and contract pharmacy registrations?',
          answer:
            'Yes, simultaneous online registration for covered entities and contract pharmacies is supported in 340B OPAIS. For more information, consult the user guide in the Help section.',
          lastModified: '05/27/2020',
        },
        {
          id: 1577,
          question:
            'Is a covered entity required to list a pharmacy that is part of the covered entity (i.e., entity-owned pharmacy) on 340B OPAIS?',
          answer:
            'Yes, if the entity wants to ship 340B drugs directly to an entity-owned pharmacy, the pharmacy address must be listed on 340B OPAIS as a shipping address.',
          lastModified: '05/27/2020',
        },
        {
          id: 1637,
          question: 'When does a pharmacy qualify as a contract pharmacy?',
          answer:
            'A pharmacy qualifies as a contract pharmacy when it has a written agreement with a 340B covered entity to provide services, and it must be registered in 340B OPAIS during an open registration period.',
          lastModified: '05/27/2020',
        },
      ],
    },
    {
      id: 2,
      category: '340B Recertification',
      questions: [
        {
          id: 4292,
          question: 'How should a covered entity prepare for recertification?',
          answer:
            'The Authorizing Official (AO) and Primary Contact (PC) should review the covered entity’s 340B OPAIS record to ensure it is accurate. Any inaccurate information should be corrected by submitting an online change request.',
          lastModified: '03/25/2020',
        },
        {
          id: 1634,
          question:
            'Once a covered entity submits a change request form, must the covered entity do anything else to recertify?',
          answer:
            'Yes. The change request only updates 340B OPAIS information. Recertification requires the Authorizing Official to update 340B OPAIS information and certify compliance with 340B Program requirements.',
          lastModified: '01/24/2020',
        },
        {
          id: 1463,
          question:
            'How is the HRSA Electronic Handbook system used in the 340B recertification process?',
          answer:
            'Section 330 health center grantee and FQHC look-alike site names and addresses will be updated to match HRSA’s Electronic Handbooks system. Authorizing officials can review changes before they are effective.',
          lastModified: '12/23/2019',
        },
        {
          id: 1394,
          question:
            'Must a covered entity complete a change request form for recertification if 340B OPAIS is correct?',
          answer:
            'No change request form is required if all the information in 340B OPAIS is accurate.',
          lastModified: '11/01/2019',
        },
        {
          id: 1468,
          question:
            'Why are the changes not listed on 340B OPAIS after the Authorizing Official has certified and updated the 340B OPAIS record?',
          answer:
            'HRSA reviews all information for completeness and compliance with 340B program requirements. Changes will be reflected in 340B OPAIS once HRSA approves them.',
          lastModified: '11/01/2019',
        },
        {
          id: 1693,
          question:
            'We received recertification materials from HRSA, but no longer plan to participate in the 340B Program. How should a covered entity notify HRSA it does not want its recertification to be processed?',
          answer:
            'If the recertification period has not started, the PC/AO can prepare an online termination request. If it has started, a decertification request can be made during recertification.',
          lastModified: '11/27/2017',
        },
        {
          id: 1434,
          question:
            'Our entity is not prepared to recertify. What can we expect regarding 340B Program eligibility/termination?',
          answer:
            'Failure to recertify results in termination from the 340B Program, effective the first day of the next quarter.',
          lastModified: '08/14/2014',
        },
      ],
    },
    {
      id: 3,
      category: '340B OPAIS Technical Assistance',
      questions: [
        {
          id: 2572,
          question:
            'Can a Manufacturer or multiple labeler codes submit one file for all its labeler codes?',
          answer:
            'Yes, if the Authorizing Official (AO) or Primary Contact (PC) has approved accounts for multiple labeler codes, they can submit one file to cover all codes.',
          lastModified: '11/01/2019',
        },
        {
          id: 2573,
          question:
            'Can the Authorizing Official or Primary Contact for an inactive or terminated labeler code see 340B OPAIS pricing data?',
          answer:
            'No, only officials and contacts for active 340B labeler codes or covered entities can access pricing information.',
          lastModified: '11/01/2019',
        },
        {
          id: 2576,
          question:
            'Can manufacturers who voluntarily participate in the 340B program submit pricing data?',
          answer:
            'No, 340B OPAIS currently does not allow voluntary manufacturers to upload pricing data.',
          lastModified: '11/01/2019',
        },
        {
          id: 2579,
          question: 'How long will manufacturers have to load pricing data?',
          answer:
            'Manufacturers have approximately two weeks each quarter to upload pricing data.',
          lastModified: '11/01/2019',
        },
        {
          id: 2580,
          question:
            'Does a manufacturer have to perform the pricing load all in one session?',
          answer:
            'No, they can log in and out of the 340B OPAIS Pricing system multiple times during the upload period.',
          lastModified: '11/01/2019',
        },
      ],
    },
    {
      id: 4,
      category: '340B Pricing/Covered Outpatient Drugs',
      questions: [
        {
          id: 1657,
          question:
            'Are 340B prices available when purchasing inpatient drugs?',
          answer: 'No, 340B pricing only applies to covered outpatient drugs.',
          lastModified: '01/24/2020',
        },
        {
          id: 2338,
          question:
            'When was the submission of the PPA Addendum required previously?',
          answer: 'The PPA Addendum was due to HRSA by December 31, 2016.',
          lastModified: '11/01/2019',
        },
        {
          id: 2347,
          question:
            'Can manufacturers and HRSA OPA digitally sign the PPA Addendum?',
          answer:
            'Yes, and for new labeler registrations, a digital signature is required.',
          lastModified: '11/01/2019',
        },
      ],
    },
    {
      id: 5,
      category: '340B Patient Definition',
      questions: [
        {
          id: 1307,
          question:
            'Does STD testing satisfy the 340B Program’s health care services requirement?',
          answer:
            'Yes, STD testing may satisfy the 340B Program’s health care services requirement. HRSA advises entities to document meeting all aspects of the 340B patient definition.',
          lastModified: '09/30/2020',
        },
        {
          id: 1372,
          question:
            'Must hospitals be able to tie the use of anesthesia gases to a patient if they are purchased under the 340B Drug Pricing Program?',
          answer:
            'Yes, hospitals must document the use of anesthesia gases for eligible patients and ensure compliance through auditable records or separate inventory.',
          lastModified: '09/30/2020',
        },
        {
          id: 1384,
          question:
            'If a 340B covered entity is part of an umbrella company structure, can providers from another company prescribe 340B drugs?',
          answer:
            'Yes, if the provider is employed or contracted with the entity, and responsibility for care remains with the covered entity.',
          lastModified: '09/30/2020',
        },
      ],
    },
    {
      id: 6,
      category: '340B Purchasing/Inventory/Reimbursement',
      questions: [
        {
          id: 1196,
          question:
            'Can a wholesaler load a GPO Private Label product in the WAC account at a WAC price?',
          answer:
            'No, GPO private label products are not permitted to be loaded into Non-GPO WAC or 340B accounts.',
          lastModified: '04/10/2017',
        },
        {
          id: 1335,
          question:
            'When a product is purchased by a new manufacturer, the NDC changes. May we replenish the old NDC with the new NDC?',
          answer:
            'No, new products with a different NDC require a new replenishment and cannot be used to replenish an old NDC.',
          lastModified: '11/19/2014',
        },
        {
          id: 1186,
          question:
            'Can a 340B covered entity purchase a final 340B replenishment order after the date it loses eligibility?',
          answer:
            'No, once a covered entity loses 340B eligibility, it can no longer place orders for 340B drugs.',
          lastModified: '11/10/2014',
        },
      ],
    },
    {
      id: 7,
      category: 'Contract Pharmacy',
      questions: [
        {
          id: 1410,
          question: 'How can we find out our contract pharmacy effective date?',
          answer:
            'HRSA Office of Pharmacy Affairs sends an email notification to both the covered entity and the contract pharmacy with the effective date, which is also displayed on 340B OPAIS. The submission date is not the effective date.',
          lastModified: '12/26/2019',
        },
        {
          id: 1459,
          question: 'What pharmacy locations should I register on 340B OPAIS?',
          answer:
            'Covered entities must register all pharmacy locations with which they have a written contract in place to dispense drugs or provide services to patients under the contract.',
          lastModified: '11/01/2019',
        },
      ],
    },
    {
      id: 8,
      category: 'Medicaid/Duplicate Discounts',
      questions: [
        {
          id: 4312,
          question:
            "We do not bill Medicaid FFS at all. We do, however, use 340B for these patients; does HRSA expect us to answer 'yes' to its Medicaid billing question?",
          answer:
            "No, the entity should answer 'no' to the question, 'At this site, will the covered entity bill Medicaid fee-for-service for drugs purchased at 340B prices?'",
          lastModified: '07/31/2020',
        },
        {
          id: 1520,
          question:
            'A covered entity site carves in for some state Medicaid agencies and carves out for other state Medicaid agencies. How should the covered entity site reflect this on the Medicaid Exclusion File?',
          answer:
            'The covered entity should list only the states and associated billing numbers it carves in on the Medicaid Exclusion File.',
          lastModified: '07/23/2020',
        },
      ],
    },
    {
      id: 9,
      category: '340B GPO Prohibition',
      questions: [
        {
          id: 1177,
          question:
            'A DSH with an in-house pharmacy would like to serve 340B and non-340B eligible patients. May we use a GPO to purchase drugs for our non-340B eligible patients that receive services at sites registered on the 340B OPAIS?',
          answer: 'No.',
          lastModified: '01/24/2020',
        },
        {
          id: 1210,
          question:
            'Our hospital isn’t subject to the GPO prohibition. Does the GPO Policy Release impact our hospital?',
          answer:
            'The GPO prohibition applies to all disproportionate share hospitals, children’s hospitals, and freestanding cancer hospitals enrolled in 340B. The GPO Policy Release does not apply to other covered entities.',
          lastModified: '01/24/2020',
        },
      ],
    },
    {
      id: 10,
      category: '340B Compliance/Audits',
      questions: [
        {
          id: 1504,
          question:
            'To what extent is a registered 340B covered entity (parent) responsible for outpatient facilities (child) it has registered?',
          answer:
            "The covered entity is fully responsible for its registered outpatient facilities' compliance with 340B Program requirements. This includes responsibility for contract pharmacies listed on 340B OPAIS.",
          lastModified: '11/01/2019',
        },
        {
          id: 1429,
          question:
            'What is an acceptable way to calculate the amount owed to a drug manufacturer?',
          answer:
            'HRSA recommends that both parties work together in good faith to resolve the matter.',
          lastModified: '01/24/2020',
        },
      ],
    },
    {
      id: 11,
      category: '340B Prime Vendor Program',
      questions: [
        {
          id: 1650,
          question: 'When is the next 340B University session?',
          answer:
            "Upcoming 340B University live sessions can be found on 340Bpvp.com under the '340B Education' section.",
          lastModified: '09/09/2020',
        },
        {
          id: 1685,
          question:
            'Is there a minimum order quantity when purchasing vaccines via the 340B PVP?',
          answer:
            'Except for flu vaccines, there are no minimum purchase quantities for vaccines ordered through the 340B PVP. Flu vaccine suppliers are listed on the PVP secure website.',
          lastModified: '05/09/2014',
        },
      ],
    },
    {
      id: 12,
      category: 'Orphan Drugs',
      questions: [
        {
          id: 2211,
          question:
            'Our rural hospital participates in the 340B program and carves-in Medicaid. How should we handle orphan drugs, which are not covered outpatient drugs for us, but Medicaid still views them as such?',
          answer:
            'Covered entities and states should work together in good faith to ensure duplicate discounts do not occur.',
          lastModified: '10/16/2015',
        },
        {
          id: 2209,
          question: 'Is the orphan drug list from FDA dosage form-specific?',
          answer:
            'No, FDA provides orphan drug designations and marketing approval based on condition, not dosage form. Multiple NDCs may be tied to one orphan designation.',
          lastModified: '10/16/2015',
        },
      ],
    },
  ],
};

type faqProps = {
  title: string;
  description: string;
  faq: {
    id: number;
    category: string;
    questions: {
      id: number;
      question: string;
      answer: string;
      lastModified: string;
    }[];
  }[];
};

type productsProps = {
  id: number;
  added: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export { products, productsProps, faqProps, FAQ_DATA };
