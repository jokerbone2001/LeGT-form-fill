import { ZodString } from 'zod';

import * as z from "zod"

type Selection = {
    value: string;
    label: string;
  };
  
  
type FieldConfig = {
    label: string;
    placeholder?: string;
    validation: ZodString | z.ZodOptional<ZodString>;
    options?: string;
    isHide?: boolean;
    selections?: Selection[];
  };
  
  export const fieldsConfig: Record<string, FieldConfig> = {
    email: {
      label: 'Email *',
      placeholder: 'Email',
      validation: z.string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' }),
    },
    givenName: {
      label: 'Given Name *',
      placeholder: 'Given Name',
      validation: z.string().min(1, { message: 'Given Name is required' }),
    },
    familyName: {
      label: 'Family Name *',
      placeholder: 'Family Name',
      validation: z.string().min(1, { message: 'Family Name is required' }),
    },
    middleName: {
      label: 'Middle Name',
      placeholder: 'Middle Name',
      validation: z.string().optional(),
    },
    usAddress: {
      label: 'US Address *',
      placeholder: 'US Address',
      validation: z.string().min(1, { message: 'US Address is required' }),
    },
    city: {
      label: 'City *',
      placeholder: 'City',
      validation: z.string().min(1, { message: 'City is required' }),
    },
    state: {
      label: 'State *',
      placeholder: 'State',
      validation: z.string().min(1, { message: 'State is required' }),
    },
    zipCode: {
      label: 'Zip Code *',
      placeholder: 'Zip Code',
      validation: z.string()
        .min(1, { message: 'Zip Code is required' })
        .max(5, { message: 'Zip Code cannot exceed 5 characters' }),
    },
    province: {
      label: 'Province',
      placeholder: 'Province',
      validation: z.string().min(1, { message: 'Province is required' }),
    },
    phoneNumber: {
      label: 'Phone Number *',
      placeholder: 'Phone Number',
      validation: z.string().min(1, { message: 'Phone Number is required' }),
    },
    ssn: {
      label: 'SSN *',
      placeholder: 'SSN',
      validation: z.string()
      .min(1, { message: 'SSN is required' })
      .max(9, { message: 'ssn cannot exceed 9 characters' }),
  
    },
    country: {
      label: 'Country *',
      placeholder: 'Country',
      validation: z.string().min(1, { message: 'Country is required' }),
    },
    companyName:{
      label: 'Company or Organization Name',
      placeholder: 'Company Name*',
      validation: z.string().min(1, { message: 'Company Name is required' }),
    },
    irs_tax_num:{
      label: 'Individual IRS Tax Number',
      placeholder: 'IRS Tax Number 9',
      validation: z.string()
        .min(1, { message: 'Individual IRS Tax Number is required' })
        .max(9, { message: 'Individual IRS Tax Number cannot exceed 9 characters' }),
    },
    fein:{
      label: 'Federal Employer Identification Number (FEIN)',
      placeholder: 'FEIN',
      validation: z.string()
        .min(1, { message: 'FEIN is required' })
    },
    basisClassification:{
      label: 'Basis for Classification',
      selections: [
      { value: 'A1', label: 'New employment' },
      { value: 'B1', label: 'Continuation of previously approved employment without change with the same employer' },
      { value: 'C1', label: 'Change in previously approved employment' },
      { value: 'D1', label: 'Concurrent employment' },
      { value: 'E1', label: 'Change of employer' },
      { value: 'F1', label: 'Amended petition' },
      ],
      validation: z.string({
        required_error: "Please select an email to display.",
      }),
    },
    requestedAction:{
      label: 'Requested Action',
      selections: [
        { value: 'ANotifyTheOfficeInPart4SoEachBeneficiaryCanObtainAVisaOrBeAdmittedNoteAPetitionIsNotRequiredFor', label: 'Notify the office in Part 4 so each beneficiary can obtain a visa or be admitted. (NOTE: A petition is not required for E-1, E-2, E-3, H-1B1 Chile/Singapore, or TN visa beneficiaries.)' },
        { value: 'BChangeTheStatusAndExtendTheStayOfEachBeneficiaryBecauseTheBeneficiaryIesIsAreNowInTheUnitedStatesInAnotherStatusSeeInstructionsForLimitationsThisIsAvailableOnlyWhenYouCheckNewEmploymentInItemNumber2Above', label: 'Change the status and extend the stay of each beneficiary because the beneficiary(ies) is/are now in the United States in another status (see instructions for limitations). This is available only when you check "New Employment" in Item Number 2, above.' },
        { value: 'CExtendTheStayOfEachBeneficiaryBecauseTheBeneficiaryIesNowHoldSThisStatus', label: 'Extend the stay of each beneficiary because the beneficiary(ies) now hold(s) this status.' },
        { value: 'DAmendTheStayOfEachBeneficiaryBecauseTheBeneficiaryIesNowHoldSThisStatus', label: 'Amend the stay of each beneficiary because the beneficiary(ies) now hold(s) this status.' },
        { value: 'EExtendTheStatusOfANonimmigrantClassificationBasedOnAFreeTradeAgreementSeeTradeAgreementSupplementToForm', label: 'Extend the status of a nonimmigrant classification based on a free trade agreement. (See Trade Agreement Supplement to Form I-129 for TN and H-1B1.)' },
        { value: 'FChangeStatusToANonimmigrantClassificationBasedOnAFreeTradeAgreementSeeTradeAgreementSupplementToForm', label: 'Change status to a nonimmigrant classification based on a free trade agreement. (See Trade Agreement Supplement to Form I-129 for TN and H-1B1.)' },
      ],
      validation: z.string({
        required_error: "Please select a requested action.",
      }),
    },
    totalWorkers:{
      label: 'Total number of workers included in this petition. (See instructions relating to when more than one worker can be included.)',
      placeholder: 'number of workers',
      validation: z.string()
        .min(1, { message: 'Total Workers Requested is required' })
    },
    dateOfBirth:{
      label: 'Date of birth',
      placeholder: 'mm/dd/yyyy',
      validation: z.string()
        .min(1, { message: 'Date of Birth is required' })
        .max(10, { message: 'Date of Birth cannot exceed 10 characters' })
    },
  
    gender_beneficiary:{
      label: 'Gender',
      selections: [
        { value: 'Male', label: 'Male' },
        { value: 'Female1', label: 'Female'},
        
      ],
      validation: z.string({
        required_error: "Please select a gender.",
      }),
    },
    USSocialSecurityNumber:{
      label: 'U.S. Social Security Number (if any)',
      placeholder: '',
      validation: z.string()
        .max(9, { message: 'Social Security Number cannot exceed 9 characters' })
    },
    //newadd
    alienRegistrationNum:{
        label: 'Alien Registration Number (A-Number)',
        placeholder: '',
        validation: z.string()
            .max(9, { message: 'Alien Registration Number cannot exceed 9 characters' })
    },
    countryOfBirth:{
        label: 'Country of Birth',
        placeholder: '',
        validation: z.string()
            .min(1, { message: 'Country of Birth is required' })
    },
    provinceOfBirth: {
        label: 'Province of Birth',
        placeholder: '',
        validation: z.string()
          .min(1, { message: 'Province of Birth is required' })
      },
      countryOfCitizenship: {
        label: 'Country of Citizenship or Nationality',
        placeholder: '',
        validation: z.string()
          .min(1, { message: 'Country of Citizenship or Nationality is required' })
      },
      dateOfLastArrival: {
        label: 'Date of Last Arrival (mm/dd/yyyy)',
        placeholder: 'mm/dd/yyyy',
        validation: z.string()
        .min(1, { message: 'Date of Birth is required' })
        .max(10, { message: 'Date of Birth cannot exceed 10 characters' })
      },
      i94RecordNumber: {
        label: 'I-94 Arrival-Departure Record Number',
        placeholder: '',
        validation: z.string()
        .max(11, { message: 'I-94 Arrival-Departure Record Number cannot exceed 11 characters' })
      },
      passportNumber: {
        label: 'Passport or Travel Document Number',
        placeholder: '',
        validation: z.string()
      },
      passportIssueDate: {
        label: 'Date Passport or Travel Document Issued (mm/dd/yyyy)',
        placeholder: 'mm/dd/yyyy',
        validation: z.string()
        .min(1, { message: 'Date of Birth is required' })
        .max(10, { message: 'Date of Birth cannot exceed 10 characters' })
      },
      passportExpiryDate: {
        label: 'Date Passport or Travel Document Expires (mm/dd/yyyy)',
        placeholder: 'mm/dd/yyyy',
        validation: z.string()
        .min(1, { message: 'Date of Birth is required' })
        .max(10, { message: 'Date of Birth cannot exceed 10 characters' })
      },
      passportIssueCountry: {
        label: 'Passport or Travel Document Country of Issuance',
        placeholder: '',
        validation: z.string()
          .min(1, { message: 'Passport or Travel Document Country of Issuance is required' })
      },
      currentNonimmigrantStatus: {
        label: 'Current Nonimmigrant Status',
        placeholder: 'F-1',
        validation: z.string().optional()
      },
      statusExpiresOrDS: {
        label: 'Status Expires or D/S (mm/dd/yyyy)',
        placeholder: 'mm/dd/yyyy',
         validation: z.string()
        .min(1, { message: 'Date of Birth is required' })
        .max(10, { message: 'Date of Birth cannot exceed 10 characters' })
      },
      sevisNumber: {
        label: 'Student and Exchange Visitor Information System (SEVIS) Number (if any)',
        placeholder: '',
        validation: z.string().optional()
      },
      eadNumber: {
        label: 'Employment Authorization Document (EAD) Number (if any)',
        placeholder: '',
        validation: z.string().optional()
      },

      validPassportStatus:{
        label: '2. Does each person in this petition have a valid passport?',
        selections: [
          { value: 'Yes1', label: 'Yes' },
          { value: 'No1', label: 'No'},
          
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      ///-------------------Part4--------------------------///
      filingOtherPetitions: {
        label: '3. Are you filing any other petitions with this one?',
        selections: [
          { value: 'EsIfYesProceedToItemNumber11B', label: 'Yes' },
          { value: 'O1', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      filingI94Records: {
        label: '4. Are you filing any applications for replacement/initial I-94, Arrival-Departure Records with this petition? Note that if the beneficiary was issued an electronic Form I-94 by CBP when he/she was admitted to the United States at an air or sea port, he/she may be able to obtain the Form I-94 from the CBP Website at www.cbp.gov/i94 instead of filing an application for a replacement/initial I-94.',
        selections: [
          { value: 'EsIfYesHowMany3', label: 'Yes' },
          { value: 'O2', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      filingDependentsApplications: {
        label: '5. Are you filing any applications for dependents with this petition?',
        selections: [
          { value: 'YesIfYesHowMany3', label: 'Yes' },
          { value: 'No2', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      beneficiaryInRemoval: {
        label: '6. Is any beneficiary in this petition in removal proceedings?',
        selections: [
          { value: 'Yes5', label: 'Yes' },
          { value: 'O3', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      filedImmigrantPetition: {
        label: '7. Have you ever filed an immigrant petition for any beneficiary in this petition?',
        selections: [
          { value: 'Yes6', label: 'Yes' },
          { value: 'O4', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      filingNewPetition: {
        label: '8. Did you indicate you were filing a new petition in Part 2.?',
        selections: [
          { value: 'EsIfYesHowMany2', label: 'Yes' },
          { value: 'OIfNoProceedToItemNumber9', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      classificationGiven: {
        label: 'a. Has any beneficiary in this petition ever been given the classification you are now requesting within the last seven years?',
        selections: [
          { value: 'Yes8', label: 'Yes' },
          { value: 'O5', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      classificationDenied: {
        label: 'b. Has any beneficiary in this petition ever been denied the classification you are now requesting within the last seven years?',
        selections: [
          { value: 'Yes9', label: 'Yes' },
          { value: 'O6', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
    previouslyFiledNonimmigrantPetition: {
        label: '9. Have you ever previously filed a nonimmigrant petition for this beneficiary?',
        selections: [
          { value: 'Yes7', label: 'Yes' },
          { value: 'O7', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      filingForEntertainmentGroup: {
        label: '10. If you are filing for an entertainment group, has any beneficiary in this petition not been with the group for at least one year?',
        selections: [
          { value: 'Yes10', label: 'Yes' },
          { value: 'O8', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      beenJ1ExchangeVisitor: {
        label: '11.a. Has any beneficiary in this petition ever been a J-1 exchange visitor or J-2 dependent of a J-1 exchange visitor?',
        selections: [
          { value: 'Yes11', label: 'Yes' },
          { value: 'O9', label: 'No'},
        ],
        validation: z.string({
          required_error: "Please select a Yes or No.",
        }),
      },
      
      jobTitle: {
        label: '1. Job Title',
        placeholder: '',
        validation: z.string()
        .min(1, { message: 'Job Title is required' })
      },
      lcaOrETACaseNumber: {
        label: '2. LCA or ETA Case Number',
        placeholder: '',
        validation: z.string()
        .min(1, { message: 'LCA or ETA Case Number is required' })
      },
      

    beneficiary_in_US: {
      label: 'Is the beneficiary in the United States now*',
      options: "yes",
      validation: z.string().optional(),
    },
  };