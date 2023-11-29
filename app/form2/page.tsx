"use client"

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldName, useForm } from "react-hook-form"
import * as z from "zod"
import { PDFDocument, PDFTextField, rgb, StandardFonts } from 'pdf-lib';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { SubmitHandler } from "react-hook-form";

import { ZodString, ZodOptional } from 'zod';

type FieldConfig = {
  label: string;
  placeholder?: string;
  validation: ZodString | ZodOptional<ZodString>;
  options?: boolean;
  isHide?: boolean;
};

const fieldsConfig: Record<string, FieldConfig> = {
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
    isHide: true,
  },
  beneficiary_in_US: {
    label: 'Is the beneficiary in the United States now*',
    options: false,
    validation: z.string().optional(),
  },
};


type FormValues = {
  [K in keyof typeof fieldsConfig]: string;
};

const formValidation = z.object(
  Object.fromEntries(
    Object.entries(fieldsConfig).map(([name, { validation }]) => [name, validation])
  )
);

  const fieldMapping = {
    familyName: 'LegalNameOfIndividualPetitionerFamilyNameLastName',
    givenName: 'GivenNameFirstName1',
    email: 'EmailAddressIfAny1',
    middleName: 'MiddleName1',
    usAddress: 'StreetNumberAndName1',
    city: 'CityOrTown1',
    state: 'State1',
    zipCode: 'ZipCode2',
    province: 'Province1',
    phoneNumber: 'ContactInformationDaytimeTelephoneNumber',
    ssn: 'USSocialSecurityNumberIfAny1',
    country: 'Country1',
    // Add more mappings as needed
  };

export default class FormPage extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      givenName: '',
      familyName: '',
      middleName: '',
      usAddress: '',
      city: '',
      state: '',
      zipCode: '',
      province: '',
      phoneNumber: '',
      ssn: '',
      country: '',
      beneficiary_in_US: '',
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    }, () => {
      console.log(this.state); 
    });
  }

  handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data = this.state;

    Object.entries(data).forEach(([key, value]) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });

    const existingPdfBytes = await fetch('unfilled-form-1-2.pdf').then(res => res.arrayBuffer());
      
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        const fields = form.getFields();

        fields.forEach((field) => {
          const pdfFieldName = field.getName();
          console.log(pdfFieldName);
          const formFieldName = Object.keys(fieldMapping).find(
            (key) => fieldMapping[key as keyof typeof fieldMapping] === pdfFieldName
          );
          if (formFieldName && (data as FormValues)[formFieldName as keyof FormValues]) {
            const formFieldValue = (data as FormValues)[formFieldName as keyof FormValues];
            if (field instanceof PDFTextField) {
              field.setText(formFieldValue);
            }
          }
        });

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        // link.href = url;
        // link.download = 'filled-form.pdf';
        // link.click();
  }


  // Lifecycle methods, event handlers, and other methods will go here

  render() {
    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Filling your information correctly</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={this.handleSubmit} className="space-y-8">
          {Object.entries(fieldsConfig).map(([name, fields]) => (
            console.log("name:",name),
            console.log(fields),
            <FormField key={name} name={name} render={({ field = {} }) => (
              <Input placeholder={fields.placeholder} {...field} onChange={(e) => this.handleChange(e)} />
            )}/>
            // <FormField key={name} name={name} render={({ field = {} }) => (
            //   <FormItem>
            //     <FormLabel>{fields.label}<FormMessage /></FormLabel>
            //         <Input placeholder={fields.placeholder} {...field} onChange={(e) => this.handleChange(e)} />
            //   </FormItem>
            // )}/>
          ))}

          {/* {Object.entries(fieldsConfig).map(([name, fields]) => {
            return (
              <FormField
                key={name}
                name={name}
                render={({ field: controlProps }) => (
                  <FormItem>
                    <FormLabel>{fields.label}<FormMessage /></FormLabel>
                    <FormControl>
                      {"options" in fields ? (
                        <RadioGroup {...controlProps} onChange={(e) => this.handleChange(e)}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem name={name} value="true" id={`${name}-yes`} />
                            <Label htmlFor={`${name}-yes`}>Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem name={name} value="false" id={`${name}-no`} />
                            <Label htmlFor={`${name}-no`}>No</Label>
                          </div>
                        </RadioGroup>
                      ) : (
                        <Input placeholder={fields.placeholder} {...controlProps} onChange={(e) => this.handleChange(e)} />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          })} */}
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}