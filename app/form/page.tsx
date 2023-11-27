"use client"
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PDFDocument, PDFTextField, rgb, StandardFonts } from 'pdf-lib';

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { SubmitHandler } from "react-hook-form";
type FieldName =  "email" | "givenName" | "familyName" | "middleName" | "usAddress" | "city" | "state" | "zipCode" | "Province" | "phoneNumber" | "ssn" | "country";

type FormValues = {
    [K in FieldName]: string;
};
  
  const formSchema = z.object({
    email: z.string()
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),
    givenName: z.string().min(1, { message: 'Given name is required' }),
    familyName: z.string().min(1, { message: 'Family name is required' }),
    middleName: z.string(),
    usAddress: z.string().min(1, { message: 'US Address is required' }),
    city: z.string().min(1, { message: 'Required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z.string()
      .min(1, { message: 'Zip Code is required' })
      .max(5, { message: 'Zip Code must be 9 characters or less' }),
    Province: z.string().min(1, { message: 'Province is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
    ssn: z.string()
      .min(1, { message: 'SSN is required' })
      .max(9, { message: 'SSN must be 9 characters or less' }),
    country: z.string().min(1, { message: 'Country is required' }),
  });

  const formFields: { name: FieldName, label: string, placeholder: string }[] = [
    { name: 'email', label: 'Email *', placeholder: 'Email' },
    { name: 'givenName', label: 'Given Name *', placeholder: 'Given Name' },
    { name: 'familyName', label: 'Family Name *', placeholder: 'Family Name' },
    { name: 'middleName', label: 'Middle Name', placeholder: 'Middle Name' },
    { name: 'usAddress', label: 'US Address *', placeholder: 'US Address' },
    { name: 'city', label: 'City *', placeholder: 'City' },
    { name: 'state', label: 'State *', placeholder: 'State' },
    { name: 'zipCode', label: 'Zip Code *', placeholder: 'Zip Code' },
    { name: 'Province', label: 'Province *', placeholder: 'Province' },
    { name: 'phoneNumber', label: 'Phone Number *', placeholder: 'Phone Number' },
    { name: 'ssn', label: 'SSN *', placeholder: 'SSN'},
    { name: 'country', label: 'Country *', placeholder: 'Country'},
  ];

  const fieldMapping = {
    familyName: 'LegalNameOfIndividualPetitionerFamilyNameLastName',
    givenName: 'GivenNameFirstName1',
    email: 'EmailAddressIfAny1',
    middleName: 'MiddleName1',
    usAddress: 'StreetNumberAndName1',
    city: 'CityOrTown1',
    state: 'State1',
    zipCode: 'ZipCode2',
    Province: 'Province1',
    phoneNumber: 'ContactInformationDaytimeTelephoneNumber',
    ssn: 'USSocialSecurityNumberIfAny1',
    country: 'Country1',
    // Add more mappings as needed
  };
export default function FormPage() {
    // ...
    
    const form = useForm<FormValues>({
        defaultValues: {
            email: '',
            givenName: '',
            familyName: '',
            middleName: '',
            usAddress: '',
            city: '',
            state: '',
            zipCode: '',
            Province: '',
            phoneNumber: '',
            ssn: '',
            country: '',
        },
        resolver: zodResolver(formSchema),
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
            console.log(pdfFieldName);
            const formFieldName = Object.keys(fieldMapping).find(
                (key) => fieldMapping[key as keyof typeof fieldMapping] === pdfFieldName
            );
            if (formFieldName && data[formFieldName as keyof FormValues]) {
                const formFieldValue = data[formFieldName as keyof FormValues];
                if (field instanceof PDFTextField) {
                    field.setText(formFieldValue);
                }
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
            {formFields.map((field) => (
                <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: controlProps }) => (
                    <FormItem>
                      <FormLabel>{field.label}<FormMessage /></FormLabel>
                      <FormControl>
                        <Input placeholder={field.placeholder} {...controlProps} />
                      </FormControl>
                    </FormItem>
                  )}
                />
            ))}

                <Button type="submit">Submit</Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  )
}
