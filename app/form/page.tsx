"use client"
import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldName, useForm } from "react-hook-form"
import * as z from "zod"
import {
  PDFButton,
  PDFCheckBox,
  PDFDocument,
  PDFDropdown,
  PDFOptionList,
  PDFPage,
  PDFRadioGroup,
  PDFSignature,
  PDFTextField,
} from 'pdf-lib';

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { SubmitHandler } from "react-hook-form";

import { fieldsConfig } from './fieldsConfig';
import { kMaxLength } from 'buffer';
type FormValues = {
  [K in keyof typeof fieldsConfig]: string;
};

const formValidation = z.object(
  Object.fromEntries(
    Object.entries(fieldsConfig).map(([name, { validation }]) => [name, validation])
  )
);

  const fieldMapping = {
    familyName: ['LegalNameOfIndividualPetitionerFamilyNameLastName', 'ProvideNameOfBeneficiaryFamilyNameLastName'],
    givenName: ['GivenNameFirstName1','GivenNameFirstName2'],
    email: 'EmailAddressIfAny1',
    middleName: 'MiddleName1',
    usAddress: ['StreetNumberAndName1','BoxStreetNumberAndName'],
    city: ['CityOrTown1','CityOrTown2'],
    state: ['State1','State2'],
    zipCode: ['ZipCode2','ZipCode4'],
    province: 'Province1',
    phoneNumber: ['ContactInformationDaytimeTelephoneNumber',"MobileTelephoneNumber1"],
    ssn: 'USSocialSecurityNumberIfAny1',
    country: 'Country1',
    companyName:"CompanyOrOrganizationName",
    irs_tax_num:"IndividualIrsTaxNumber",
    fein:"OtherInformationFederalEmployerIdentificationNumberFein",
    totalWorkers:"TotalNumberOfWorkersIncludedInThisPetitionSeeInstructionsRelatingToWhenMoreThanOneWorkerCanBeIncluded",
    beneficiaryLastName:"ProvideNameOfBeneficiaryFamilyNameLastName",
    dateOfBirth:"OtherInformationDateOfBirthMmDdYyyy",
    USSocialSecurityNumber:"USSocialSecurityNumberIfAny2",
    alienRegistrationNum: 'A2',
    countryOfBirth: 'A3',
    provinceOfBirth: 'ProvinceOfBirth',
    countryOfCitizenship: 'CountryOfCitizenshipOrNationality1',
    dateOfLastArrival: '94ArrivalDepartureRecordNumberPassportOrTravelDocumentNumber1',
    i94RecordNumber: '94ArrivalDepartureRecordNumberPassportOrTravelDocumentNumber2',
    passportNumber: '94ArrivalDepartureRecordNumberPassportOrTravelDocumentNumber3',
    passportIssueCountry: 'PassportOrTravelDocumentCountryOfIssuance3',
    passportIssueDate: 'PassportOrTravelDocumentCountryOfIssuance1',
    passportExpiryDate: 'PassportOrTravelDocumentCountryOfIssuance2',
    beneficiary_in_US: 'BeneficiaryInUnitedStatesNow',
    currentNonimmigrantStatus: 'CurrentNonimmigrantStatus1',
    statusExpiresOrDS: 'DateStatusExpiresOrDSMmDdYyyy1',
    sevisNumber: 'StudentAndExchangeVisitorInformationSystemSevisNumberIfAny1',
    eadNumber: 'EmploymentAuthorizationDocumentEadNumberIfAny1',
    jobTitle:"LcaOrEtaCaseNumber1",
    lcaOrETACaseNumber:"LcaOrEtaCaseNumber2",

    // Add more mappings as needed
  };

export default function FormPage() {
    // ...
    const [dynamicMapping, setDynamicMapping] = useState({
      basisClassification: "A1",
      requestedAction:"ANotifyTheOfficeInPart4SoEachBeneficiaryCanObtainAVisaOrBeAdmittedNoteAPetitionIsNotRequiredFor",
      gender_beneficiary:"Male",
      validPassportStatus:"Yes1",

      ///-------------------Part4--------------------------///

      filingOtherPetitions:"O1",
      filingI94Records:"O2",
      filingDependentsApplications:"No2",
      beneficiaryInRemoval:"O3",
      filedImmigrantPetition:"O4",
      filingNewPetition:"OIfNoProceedToItemNumber9",
      classificationGiven:"O5",
      classificationDenied:"O6",
      previouslyFiledNonimmigrantPetition:"O7",
      filingForEntertainmentGroup:"O8",
      beenJ1ExchangeVisitor:"O9",

      // 其他键值对...
    });
    useEffect(() => {
      // Object.entries(dynamicMapping).forEach(([key, value]) => {
      //   console.log(`getState ${key}:`, value);
      // });
    }, [dynamicMapping]);
    
    const form = useForm<FormValues>({
        defaultValues: {
            email: 'test1@g.com',
            givenName: 'Xiaohong',
            familyName: 'Xu',
            middleName: '',
            usAddress: '9393 Tower Rd',
            city: 'Burnaby',
            state: 'BC',
            zipCode: 'V5A4X',
            province: 'BC',
            phoneNumber: '235-235-2355',
            ssn: '123123123',
            irs_tax_num:'500330000',
            country: 'Canada',
            beneficiary_in_US: 'yes',
            companyName:'Hackhub',
            fein:'780000000',
            basisClassification:'A1',
            requestedAction:"ANotifyTheOfficeInPart4SoEachBeneficiaryCanObtainAVisaOrBeAdmittedNoteAPetitionIsNotRequiredFor",
            totalWorkers:'1',
            dateOfBirth:"01/01/1990",
            gender_beneficiary:"Male",
            USSocialSecurityNumber:"123123123",
            alienRegistrationNum: '123456789',
            countryOfBirth: 'China',
            provinceOfBirth: 'Jiangsu',
            countryOfCitizenship: 'China',
            dateOfLastArrival: '09/01/2021',
            i94RecordNumber: '666666666A6',
            passportNumber: 'EF1000000',
            passportIssueCountry: 'China',
            passportIssueDate: '09/01/2021',
            passportExpiryDate: '09/01/2026',
            currentNonimmigrantStatus: 'F-1',
            statusExpiresOrDS: '09/01/2021',
            sevisNumber: 'N0000000000',
            eadNumber: 'IOE000000000',
            validPassportStatus:"Yes1",
          
            ///-------------------Part4--------------------------///
            filingOtherPetitions:"O1",
            filingI94Records:"O2",
            filingDependentsApplications:"No2",
            beneficiaryInRemoval:"O3",
            filedImmigrantPetition:"O4",
            filingNewPetition:"OIfNoProceedToItemNumber9",
            classificationGiven:"O5",
            classificationDenied:"O6",
            previouslyFiledNonimmigrantPetition:"O7",
            filingForEntertainmentGroup:"O8",
            beenJ1ExchangeVisitor:"O9",

            jobTitle:"Software Engineer",
            lcaOrETACaseNumber:"LCAETAnumber",
        },
        resolver: zodResolver(formValidation),
      });

      const onSubmit: SubmitHandler<FormValues> = async (data) => {

        Object.entries(data).forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
          });
          
        const existingPdfBytes = await fetch('unfilled-form.pdf').then(res => res.arrayBuffer());
      
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        const fields = form.getFields();

        fields.forEach((field) => {
            const pdfFieldName = field.getName();
            // if it is PDFTextField
            if (field instanceof PDFTextField) {
              console.log(pdfFieldName);
              let formFieldValue;
              Object.entries(fieldMapping).some(([key, value]) => {
                if (Array.isArray(value)) {
                  if (value.includes(pdfFieldName)) {
                    formFieldValue = data[key];
                    return true;
                  }
                } else {
                  if (value === pdfFieldName) {
                    formFieldValue = data[key as keyof FormValues];
                    return true;
                  }
                }
                return false;
              });
              // console.log("formFieldValue:", formFieldValue);
              if (formFieldValue) {
                field.setText(formFieldValue);
              } else {
                let temp = pdfFieldName;
                if (pdfFieldName.length) {
                  temp = pdfFieldName.substring(0, field.getMaxLength!());
                }
                // field.setText(temp);
              }
              console.log("field is an instance of PDFTextField");


            } 
            
            // if it is PDFTextField

            else if (field instanceof PDFCheckBox ) {
              console.log(pdfFieldName);

              Object.entries(dynamicMapping).forEach(([key, value]) => {
                // console.log(`Key: ${key}, Value: ${value}`);
                if (value === pdfFieldName) {
                  field.check();
                }
              });
              console.log("field is an instance of PDFCheckBox");

            } else if (field instanceof PDFButton) {
              console.log('field is an instance of PDFButton');
            } else if (field instanceof PDFDropdown) {
              console.log('field is an instance of PDFDropdown');
            } else if (field instanceof PDFOptionList) {
              console.log('field is an instance of PDFOptionList');
            } else if (field instanceof PDFRadioGroup) {
              console.log('field is an instance of PDFRadioGroup');
            } else if (field instanceof PDFSignature) {
              console.log('field is an instance of PDFSignature');
            } else {
              console.log('field is not an instance of known PDFField subclasses');
            }
        });
 
        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filled-form.pdf';
        link.click();
      };
    
  return (
    <Card className="w-[600px]">
        <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Filling your information correctly</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {Object.entries(fieldsConfig).map(([name, fields]) => {
              return (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field: controlProps }) => (
                    <FormItem>
                      <FormLabel>{fields.label}<FormMessage /></FormLabel>
                      <FormControl>
                        {"options" in fields ? (
                          <RadioGroup defaultValue={fields.options} onChange={event => {
                            const target = event.target as HTMLInputElement;
                            if (target.checked) {
                              const newValue = target.value;
                              fields.options = newValue;
                              console.log("fields.options:", newValue);
                              form.setValue(name, newValue);
                            }
                          }}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id={`${name}-yes`} />
                              <Label htmlFor={`${name}-yes`}>Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id={`${name}-no`} />
                              <Label htmlFor={`${name}-no`}>No</Label>
                            </div>
                          </RadioGroup>
                        ) : "selections" in fields && fields.selections !== undefined ?  (
                          <Select 
                              onValueChange={(value) => {
                              console.log("value:", value);
                              setDynamicMapping(prevMapping => ({
                                ...prevMapping,
                                [name]: value
                              }));
                            }} 
                            defaultValue={controlProps.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent style={{ maxWidth: '50vw' }}>
                              {fields.selections.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                               
                                  {option.label}
                                  
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input placeholder={fields.placeholder} {...controlProps} />
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              );
            })}

                <Button type="submit">Submit</Button>
            </form>
            </Form>
        </CardContent>
    </Card>

    
  )
}
