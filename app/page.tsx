'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";

interface FormData {
  insuranceProvider: string;
  policyNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  otherInsuranceProvider?: string;
  treatmentType: string;
  location: string;
  primaryIssue: string;
  email: string;
  allSubstancesPast2Weeks: string[];
  experiencingWithdrawal: string;
  chronicConditions: string[];
  canManageDailyActivities: string;
  areYouPregnant: string;
  utilizeMedicalDevices: string;
  requiresRegularPhysicalTherapy: string;
  requiresDialysis: string;
  insulinPumpManageDiabetes: string;
  heartAttack90days: string;
  vomitingLast7days: string;
  brainInjuriesLast90days: string;
  requiresIVorTube: string;
  weighsMoreThan350lbs: string;
  mentalHealthConditions: string[];
  activelyPsychotic: string;
  suicideAttempts: string;
  attemptedSuicideNotInfluenceSubstances: string;
  aggressiveBehaviorOrAssault: string;
  currentLegalIssueDueAlcohol: string;
  priorLegalIssueDueAlcohol: string;
  upcomingCourtDate: string;
  probationParole: string;
  convictedSexCrime: string;
  registeredSexOffender: string;
  startTreatment: string;
  vobResult: string;
  assessmentResult: string;
  nextStep: string;
  pickupAddress: string;
  pickupPhoneNumber: string;
  travelArrangements: string;
  pickupDate: string;
  pickupTime: string;
  admissionDate: string;
  admissionTime: string;
  utm_campaign: string;
  utm_medium: string;
  referral_source: string;
  referring_representative: string;
}

const initialFormState: FormData = {
  insuranceProvider: '',
  policyNumber: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  dateOfBirth: '',
  otherInsuranceProvider: '',
  treatmentType: '',
  location: '',
  primaryIssue: '',
  email: '',
  allSubstancesPast2Weeks: [],
  experiencingWithdrawal: 'Yes',
  chronicConditions: [],
  canManageDailyActivities: 'Yes',
  areYouPregnant: 'No',
  utilizeMedicalDevices: 'No',
  requiresRegularPhysicalTherapy: 'No',
  requiresDialysis: 'No',
  insulinPumpManageDiabetes: 'No',
  heartAttack90days: 'No',
  vomitingLast7days: 'No',
  brainInjuriesLast90days: 'No',
  requiresIVorTube: 'No',
  weighsMoreThan350lbs: 'No',
  mentalHealthConditions: [],
  activelyPsychotic: 'No',
  suicideAttempts: 'No',
  attemptedSuicideNotInfluenceSubstances: 'No',
  aggressiveBehaviorOrAssault: 'No',
  currentLegalIssueDueAlcohol: 'No',
  priorLegalIssueDueAlcohol: 'No',
  upcomingCourtDate: 'No',
  probationParole: 'No',
  convictedSexCrime: 'No',
  registeredSexOffender: 'No',
  startTreatment: '',
  vobResult: '',
  assessmentResult: '',
  nextStep: '',
  pickupAddress: '',
  pickupPhoneNumber: '',
  travelArrangements: '',
  pickupDate: '',
  pickupTime: '',
  admissionDate: '',
  admissionTime: '',
  utm_campaign: '',
  utm_medium: '',
  referral_source: '',
  referring_representative: '',
};

export default function Home() {

  const today = new Date().toISOString().split('T')[0];

  const queryParams = useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlSearchParams = new URLSearchParams(window.location.search);
      return {
        utm_campaign: urlSearchParams.get('utm_campaign') || '',
        utm_medium: urlSearchParams.get('utm_medium') || '',
        referral_source: urlSearchParams.get('referral_source') || '',
        referring_representative: urlSearchParams.get('referring_representative') || '',
      };
    } else {
      return {
        utm_campaign: '',
        utm_medium: '',
        referral_source: '',
        referring_representative: '',
      };
    }
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormState,
    pickupDate: '',
    admissionDate: '',
    ...queryParams,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [triggerMessage, settriggerMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [vobMessage, setVOBMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const allSubstancesPast2Weeks = [
    { name: "Alcohol", checked: false },
    { name: "Opiates/Opioids", checked: false },
    { name: "Benzos", checked: false },
    { name: "Cocaine/Crack", checked: false },
    { name: "Marijauna", checked: false },
    { name: "Methamphetamine", checked: false },
    { name: "Hallucinogens", checked: false },
    { name: "Other", checked: false },
  ];

  const allChronicConditions = [
    { name: "Abdominal pains", checked: false },
    { name: "AFIB", checked: false },
    { name: "Cancer", checked: false },
    { name: "Chest pains", checked: false },
    { name: "Cirrhosis", checked: false },
    { name: "Congestive heart failure", checked: false },
    { name: "Epilepsy", checked: false },
    { name: "Esophagus tear", checked: false },
    { name: "Heart disease", checked: false },
    { name: "Hemophilia", checked: false },
    { name: "IV site infection", checked: false },
    { name: "Jaundice", checked: false },
    { name: "Kidney Stones", checked: false },
    { name: "Lyme Disease or autoimmune disorder", checked: false },
    { name: "MRSA", checked: false },
    { name: "Narcolepsy", checked: false },
    { name: "Non-epileptic seizures", checked: false },
    { name: "Open wounds", checked: false },
    { name: "Pancreatitis", checked: false },
    { name: "Pericarditis", checked: false },
    { name: "Rocky Mountain Spotted Fever", checked: false },
    { name: "Shingles or Rash", checked: false },
    { name: "Shortness of breath", checked: false },
    { name: "Spina Bifida", checked: false },
    { name: "Staph", checked: false },
    { name: "Surgical wounds", checked: false },
    { name: "Vertigo", checked: false },
  ];
  
  const allMentalHealthConditions = [
    { name: "Depression", checked: false },
    { name: "Anxiety", checked: false },
    { name: "Bipolar", checked: false },
    { name: "PTSD", checked: false },
    { name: "Borderline Personality Disorder", checked: false },
    { name: "Explosive Disorder", checked: false },
    { name: "Schizoaffective Disorder", checked: false },
    { name: "Schizophrenia", checked: false },
    { name: "Dissociative Disorder", checked: false },
    { name: "ADHD", checked: false },
    { name: "Autism", checked: false },
  ];
  
  const [SubstancesPast2Weeks, setSubstancesPast2Weeks] = useState(allSubstancesPast2Weeks);
  const [ChronicConditions, setChronicConditions] = useState(allChronicConditions);
  const [MentalHealthConditions, setMentalHealthConditions] = useState(allMentalHealthConditions);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));

    // Reset the otherInsuranceProvider if the user changes insuranceProvider
    if (name === 'insuranceProvider' && value !== 'other') {
      setFormData(prevState => ({ ...prevState, otherInsuranceProvider: '' }));
    }

    if (name === 'treatmentType') {
      setFormData(prevState => ({
        ...prevState,
        location: ''
      }));
    }
  };

  const handleVOBSubmit = async () => {
    try {
      const response = await fetch('https://7os5kk.buildship.run/createRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setFormData(prevState => ({
        ...prevState,
        vobResult: data.vob_result,
      }));
      setVOBMessage(data.vob_result === 'Positive' 
        ? { type: 'success', text: 'Success! We accept your insurance for treatment!' }
        : { type: 'error', text: 'Your insurance will need to be reviewed by our intake team. Please call us at 844-610-8909' }
      );
    } catch (error) {
      console.error('Error submitting VOB:', error);
      setVOBMessage({ type: 'error', text: 'Error submitting VOB. Please try again.' });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.insuranceProvider && !!formData.policyNumber && !!formData.phoneNumber;
      case 2:
        return !!formData.treatmentType && !!formData.location && !!formData.primaryIssue && !!formData.email;
      case 3:
        return !!formData.allSubstancesPast2Weeks && !!formData.experiencingWithdrawal;
      case 4:
        return true;
      case 5:
        return !!formData.canManageDailyActivities && !!formData.areYouPregnant && !!formData.utilizeMedicalDevices && !!formData.requiresRegularPhysicalTherapy && !!formData.requiresDialysis && !!formData.insulinPumpManageDiabetes && !!formData.heartAttack90days && !!formData.vomitingLast7days && !!formData.brainInjuriesLast90days && !!formData.requiresIVorTube && !!formData.weighsMoreThan350lbs;
      case 6:
        return !!formData.mentalHealthConditions && !!formData.activelyPsychotic && !!formData.suicideAttempts && !!formData.attemptedSuicideNotInfluenceSubstances && !!formData.aggressiveBehaviorOrAssault;
      case 7:
        return !!formData.currentLegalIssueDueAlcohol && !!formData.priorLegalIssueDueAlcohol && !!formData.upcomingCourtDate && !!formData.probationParole && !!formData.convictedSexCrime && !!formData.registeredSexOffender;
      case 8:
        return !!formData.startTreatment;
      case 9:
        return true;
      case 10:
        if (formData.travelArrangements === 'Yes') {
          return !!formData.admissionDate && !!formData.admissionTime;
        } else if (formData.travelArrangements === 'No') {
          return (
            !!formData.pickupAddress &&
            !!formData.pickupPhoneNumber &&
            !!formData.pickupDate &&
            !!formData.pickupTime
          );
        }
        return false;
      case 11:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (step === 1) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      let digitCount = formData.phoneNumber.replace(/\D/g, "").length;

      if (!phoneRegex.test(formData.phoneNumber) || digitCount > 10) {
        setSubmitMessage({ type: 'error', text: 'Invalid phone number format. Use E.164 format, e.g., +1234567890.' });
        return;
      }
    }
    
    if (step === 10 && formData.travelArrangements === 'No') {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      const addressPattern = /[A-Za-z].*\d|\d.*[A-Za-z]/;
      
      if (!addressPattern.test(formData.pickupAddress.trim())) {
        settriggerMessage({ type: 'error', text: 'Please enter a valid pickup address.' });
        return;
      }

      let pickupdigitCount = formData.pickupPhoneNumber.replace(/\D/g, "").length;

      if (!phoneRegex.test(formData.pickupPhoneNumber) || pickupdigitCount > 10 ) {
        settriggerMessage({ type: 'error', text: 'Invalid phone number format. Use E.164 format, e.g., +1234567890.' });
        return;
      }
    }
    if (validateStep(step)) {
      if (step < 8) {
        if ( step === 2 ){
          if ( formData.primaryIssue === 'mental_health' ){
            setStep(11);
          } else{
            setStep(step + 1);
          }
        } else{
          setStep(step + 1);
        }
        if (step === 1) {
          handleVOBSubmit();
        }
        setVOBMessage(null);
      } else if (step === 8) {
        try {
          const response = await fetch('https://7os5kk.buildship.run/createRecord', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          setFormData(prevState => ({
            ...prevState,
            assessmentResult: data.assessment_result,
            nextStep: data.next_step,
          }));
          if (data.assessment_result === 'approved' && formData.vobResult === 'Positive') {
            setStep(9);
          } else {
            setStep(10);
          }
        } catch (error) {
          console.error('Error submitting assessment:', error);
          setSubmitMessage({ type: 'error', text: 'Error submitting assessment. Please try again.' });
        }
      } else if (step === 9 || step === 11) {
        try {
          const response = await fetch('https://7os5kk.buildship.run/createRecord', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          if (step === 9 && data.next_step === 'schedule_admission') {
            setStep(10);
          } else {
            setIsSubmitted(true);
          }
        } catch (error) {
          console.error('Error scheduling admission:', error);
          setSubmitMessage({ type: 'error', text: 'Error scheduling admission. Please try again.' });
        }
      }
    } else {
      setSubmitMessage({ type: 'error', text: 'Please fill in all required fields.' });
    }
  };

  const steps = [
    "Coverage",
    "Treatment",
    "Substance",
    "Medical",
    "MentalChecks",
    "Mental",
    "Legal",
    "Approval",
    "Review",
    "Schedule",
    "NewMentalHealth"
  ];

  const renderSteps = () => {
    if (step === 1) {
      // Do not render any steps or progress indicators for step 1
      return null;
    }

    // Calculate percentage completion
    const totalSteps = steps.length - 2;
    const completedSteps = step < 9 ? step - 1 : step === 9 ? totalSteps : step === 10 ? totalSteps - 1 : step === 11 ? totalSteps : step; // Steps completed before the current step
    const progressPercentage = Math.round((completedSteps / (totalSteps)) * 100);

    return (
      <div className="mb-6">
        <h2 className="sr-only">Progress</h2>
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-yellow-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700 text-right">
            {progressPercentage}% Complete
          </p>
        </div>
      </div>
    );
  };
  
  const Checkbox = ({ isChecked, label, checkHandler, index, id }) => {
    return (
      <div key={label} className="flex items-center">
        <input
          type="checkbox"
          id={`${id}-${index}`}
          name={id}
          checked={isChecked}
          onChange={checkHandler}
          value={label}
          className="h-4 w-4 rounded border-gray-400 text-yellow-500 focus:ring-yellow-500"
        />
        <label htmlFor={`${id}-${index}`} className="ml-2 block text-sm font-medium text-gray-800">{label}</label>
      </div>
    )
  }

  const renderCoverageCheck = () => {
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Check Your Coverage</h2>
        <p className="mt-1 text-sm text-gray-600">
          Instantly check if your insurance covers treatment at The Recovery Village. All fields are required to verify eligibility.
        </p>
        {submitMessage && (
          <div className={`mt-4 mb-6 p-4 ${submitMessage.type === 'success' ? 'text-green-700 border-green-700 bg-green-50' : 'text-red-700 border-red-700 bg-red-50'} border-l-4`}>
            <p className="font-medium">{submitMessage.text}</p>
          </div>
        )}
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-800">
              Insurance Provider
            </label>
            <div className="mt-1">
              <select
                id="insuranceProvider"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              >
                <option value="">Select Your Insurance Provider</option>
                {/* Existing Providers */}
                <option value="aetna">Aetna</option>
                <option value="anthem">Anthem</option>
                <option value="beacon_health_options">Beacon Health Options</option>
                <option value="blue_cross_blue_shield">Blue Cross Blue Shield</option>
                <option value="blue_shield">Blue Shield</option>
                <option value="buckeye_medicaid">Buckeye Medicaid</option>
                <option value="cigna">Cigna</option>
                <option value="humana">Humana</option>
                <option value="kaiser_permanente">Kaiser Permanente</option>
                <option value="medicaid">Medicaid</option>
                <option value="medicare">Medicare</option>
                <option value="molina_healthcare">Molina Healthcare</option>
                <option value="optum_medicaid">Optum Medicaid</option>
                <option value="optum_veteran_affairs">Optum Veteran Affairs</option>
                <option value="oscar">Oscar</option>
                <option value="tricare">Tricare</option>
                <option value="triwest_veteran_affairs">TriWest Veteran Affairs</option>
                <option value="united_healthcare_optum">United Healthcare/Optum</option>
                <option value="umr">UMR</option>
                <option value="wellcare">WellCare</option>
                {/* Payment Options */}
                <option value="self_pay">Self-Pay</option>
                {/* Other Option */}
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-800">
              Policy Number
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="policyNumber"
                id="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
              First Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
              Last Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800">
              Phone Number (We'll only call you if we need additional information)
            </label>
            <div className="mt-1 pos-rel">
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-800">
              Date of Birth
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        {formData.insuranceProvider === 'other' && (
          <div className="mt-4">
            <label htmlFor="otherInsuranceProvider" className="block text-sm font-medium text-gray-800">
              Please specify your insurance provider
            </label>
            <input
              type="text"
              name="otherInsuranceProvider"
              id="otherInsuranceProvider"
              value={formData.otherInsuranceProvider || ''}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 mt-1 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
            />
          </div>
        )}
      </>
    );
  };

  const renderTreatmentInfo = () => {
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Treatment Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Ready to start treatment? Please take this short, 60-second assessment to get your treatment scheduled.
        </p>
        {vobMessage && (
          <div className={`mt-4 mb-6 p-4 ${vobMessage.type === 'success' ? 'text-green-700 border-green-700 bg-green-50' : 'text-red-700 border-red-700 bg-red-50'} border-l-4`}>
            <p className="font-medium">{vobMessage.text}</p>
          </div>
        )}
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="treatmentType" className="block text-sm font-medium text-gray-800">
              Treatment Type
            </label>
            <div className="mt-1">
              <select
                id="treatmentType"
                name="treatmentType"
                value={formData.treatmentType}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              >
                <option value="">Select Treatment Type</option>
                <option value="detox">Detox</option>
                <option value="inpatient">Inpatient</option>
                <option value="outpatient">Outpatient</option>
                <option value="telehealth">Telehealth</option>
              </select>
            </div>
          </div>
  
          <div className="sm:col-span-3">
            <label htmlFor="location" className="block text-sm font-medium text-gray-800">
              Location
            </label>
            <div className="mt-1">
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              >
                <option value="">Select a location</option>
                <option value="iaff">IAFF Center of Excellence</option>
                <option value="orlando">Orlando Recovery Center</option>
                <option value="atlanta">The Recovery Village Atlanta</option>
                <option value="columbus">The Recovery Village Columbus</option>
                <option value="cherry_hill">The Recovery Village Cherry Hill</option>
                <option value="indianapolis">The Recovery Village Indianapolis</option>
                <option value="kansas_city">The Recovery Village Kansas City</option>
                <option value="palm_beach">The Recovery Village Palm Beach</option>
                <option value="palmer_lake">The Recovery Village Palmer Lake</option>
                <option value="ridgefield">The Recovery Village Ridgefield</option>
                <option value="umatilla">The Recovery Village Umatilla</option>
              </select>
            </div>
          </div>
  
          <div className="sm:col-span-3">
            <label htmlFor="primaryIssue" className="block text-sm font-medium text-gray-800">
              Primary Reason for Treatment
            </label>
            <div className="mt-1">
              <select
                id="primaryIssue"
                name="primaryIssue"
                value={formData.primaryIssue}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              >
                <option value="">Select Primary Issue</option>
                <option value="alcohol">Substance Abuse</option>
                <option value="mental_health">Mental Health</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email Address (So we can send you your insurance benefit details)
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderAdditionalInfo = () => {
    const updateCheckStatus = index => {
      setSubstancesPast2Weeks(
        SubstancesPast2Weeks.map((substance, currentIndex) =>
          currentIndex === index
            ? { ...substance, checked: !substance.checked }
            : substance
        )
      )
    }
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Substance Use History</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please provide some additional information to help us better personalize your treatment.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Please select all substances you have used in the <u>past two weeks</u>.</h3>
            <div className="mt-2 space-y-2">
            {SubstancesPast2Weeks.map((substance, index) => (
              <Checkbox
                key={substance.name}
                isChecked={substance.checked}
                checkHandler={() => updateCheckStatus(index)}
                label={substance.name}
                index={index}
                id="allSubstancesPast2Weeks"
              />
            ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Have you experienced withdrawal symptoms including tremors (shakes), tingling, excessive sweating, heart racing, vomiting, or diarrhea in the <u>past two weeks</u>?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`experiencingWithdrawal-${option.toLowerCase()}`}
                    name="experiencingWithdrawal"
                    type="radio"
                    value={option}
                    checked={formData.experiencingWithdrawal === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`experiencingWithdrawal-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderMedicalNeeds = () => {
    const updateCheckStatus = index => {
      setChronicConditions(
        ChronicConditions.map((chronicCondition, currentIndex) =>
          currentIndex === index
            ? { ...chronicCondition, checked: !chronicCondition.checked }
            : chronicCondition
        )
      )
    }
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Medical History</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <h3 className="text-sm font-semibold text-gray-800">Do you have any of the following chronic medical conditions? Select all that apply</h3>
            <div className="mt-2 space-y-2">
            {ChronicConditions.map((chronicCondition, index) => (
              <Checkbox
                key={chronicCondition.name}
                isChecked={chronicCondition.checked}
                checkHandler={() => updateCheckStatus(index)}
                label={chronicCondition.name}
                index={index}
                id="chronicConditions"
              />
            ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderMedicalNeedsChecks = () => {
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Medical Needs</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please provide some additional information to help us better personalize your treatment.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {[
            { question: "Are you capable of managing your daily living activities (bathing, feeding yourself, using the bathroom) while in treatment? ", name: "canManageDailyActivities" },
            { question: "Are you pregnant?", name: "areYouPregnant" },
            { question: "Do you utilize any medical devices (CPAP machine, oxygen tank, cardiac device, etc.)", name: "utilizeMedicalDevices" },
            { question: "Do you require regular physical therapy that you can not stop during treatment?", name: "requiresRegularPhysicalTherapy" },
            { question: "Do you require Dialysis?", name: "requiresDialysis" },
            { question: "Do you use an insulin pump to manage diabetes?", name: "insulinPumpManageDiabetes" },
            { question: "Have you had a heart attack in the last 90 days?", name: "heartAttack90days" },
            { question: "Have you experienced vomiting or coughing up blood in the last 7 days?", name: "vomitingLast7days" },
            { question: "Have you had any brain injuries or neurosurgery in the last 90 days?", name: "brainInjuriesLast90days" },
            { question: "Do you require IV's, TPN, PEG, or J-Tube?", name: "requiresIVorTube" },
            { question: "Do you weigh over 350lbs or less than 85lbs?", name: "weighsMoreThan350lbs" }
          ].map(({ question, name }) => (
            <div key={name} className="sm:col-span-3">
              <h3 className="text-sm font-semibold text-gray-800">{question}</h3>
              <div className="mt-2 space-y-2">
                {['Yes', 'No'].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      id={`${name}-${option.toLowerCase()}`}
                      name={name}
                      type="radio"
                      value={option}
                      checked={formData[name as keyof typeof formData] === option}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                    />
                    <label htmlFor={`${name}-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderMentalHealth = () => {
    const updateCheckStatus = index => {
      setMentalHealthConditions(
        MentalHealthConditions.map((mentalHealthCondition, currentIndex) =>
          currentIndex === index
            ? { ...mentalHealthCondition, checked: !mentalHealthCondition.checked }
            : mentalHealthCondition
        )
      )
    }
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Mental Health History</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please let us know more about your mental health history so we can best serve you.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <h3 className="text-sm font-semibold text-gray-800">Do you have a history of any of the following mental health conditions? Select all that apply:</h3>
            <div className="mt-2 space-y-2">
              {MentalHealthConditions.map((mentalHealthCondition, index) => (
                <Checkbox
                  key={mentalHealthCondition.name}
                  isChecked={mentalHealthCondition.checked}
                  checkHandler={() => updateCheckStatus(index)}
                  label={mentalHealthCondition.name}
                  index={index}
                  id="mentalHealthConditions"
                />
              ))}
            </div>
          </div>
          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Are you actively psychotic?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`activelyPsychotic-${option.toLowerCase()}`}
                    name="activelyPsychotic"
                    type="radio"
                    value={option}
                    checked={formData.activelyPsychotic === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`activelyPsychotic-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Have you had 3 or more suicide attempts in the past two years?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`suicideAttempts-${option.toLowerCase()}`}
                    name="suicideAttempts"
                    type="radio"
                    value={option}
                    checked={formData.suicideAttempts === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`suicideAttempts-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">In the past year, have you attempted suicide while not under the influence of substances?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`attemptedSuicideNotInfluenceSubstances-${option.toLowerCase()}`}
                    name="attemptedSuicideNotInfluenceSubstances"
                    type="radio"
                    value={option}
                    checked={formData.attemptedSuicideNotInfluenceSubstances === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`attemptedSuicideNotInfluenceSubstances-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Do you have a history of aggression or aggressive behavior (assault)?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`aggressiveBehaviorOrAssault-${option.toLowerCase()}`}
                    name="aggressiveBehaviorOrAssault"
                    type="radio"
                    value={option}
                    checked={formData.aggressiveBehaviorOrAssault === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`aggressiveBehaviorOrAssault-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
    );
  };
  

  const renderLegal = () => {
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Legal History</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Do you have current legal issues due to alcohol and/ or drug use?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`currentLegalIssueDueAlcohol-${option.toLowerCase()}`}
                    name="currentLegalIssueDueAlcohol"
                    type="radio"
                    value={option}
                    checked={formData.currentLegalIssueDueAlcohol === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`currentLegalIssueDueAlcohol-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Do you have prior legal issues due to alcohol and/ or drug use?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`priorLegalIssueDueAlcohol-${option.toLowerCase()}`}
                    name="priorLegalIssueDueAlcohol"
                    type="radio"
                    value={option}
                    checked={formData.priorLegalIssueDueAlcohol === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`priorLegalIssueDueAlcohol-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Do you have an upcoming court date in the next two weeks?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`upcomingCourtDate-${option.toLowerCase()}`}
                    name="upcomingCourtDate"
                    type="radio"
                    value={option}
                    checked={formData.upcomingCourtDate === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`upcomingCourtDate-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Are you on probation or parole?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`probationParole-${option.toLowerCase()}`}
                    name="probationParole"
                    type="radio"
                    value={option}
                    checked={formData.probationParole === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`probationParole-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Have you been convicted of a sex crime?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`convictedSexCrime-${option.toLowerCase()}`}
                    name="convictedSexCrime"
                    type="radio"
                    value={option}
                    checked={formData.convictedSexCrime === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`convictedSexCrime-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800">Are you a registered sex offender?</h3>
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`registeredSexOffender-${option.toLowerCase()}`}
                    name="registeredSexOffender"
                    type="radio"
                    value={option}
                    checked={formData.registeredSexOffender === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`registeredSexOffender-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
    );
  };

  const renderApproval = () => {
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Approval</h2>
        <div className="mt-4 p-4 bg-green-100 text-green-700 border-l-4 border-green-700">
          <p className="font-medium">Congratulations, your assessment is approved and you can schedule treatment immediately!</p>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800">When would you like to start treatment?</h3>
          <div className="mt-2 space-y-2">
            {['Immediately', 'Within the next 24-48 hours', 'In 3 days or more'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={`startTreatment-${option.toLowerCase().replace(/\s+/g, '-')}`}
                  name="startTreatment"
                  type="radio"
                  value={option}
                  checked={formData.startTreatment === option}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor={`startTreatment-${option.toLowerCase().replace(/\s+/g, '-')}`} className="ml-2 block text-sm font-medium text-gray-800">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderReview = () => {
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Please Call Us</h2>
        <p className="mt-1 text-sm text-gray-600">
          Based on your assessment, you'll need to speak with one of our intake coordinators to schedule your admission. Please call us at 844-610-8909
        </p>
      </>
    );
  };

  const renderNewMentalHealth = () => {
    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Please Call Us</h2>
        <p className="mt-1 text-sm text-gray-600">
        Please call our admissions team at 844-610-8909 to proceed with the admission process.
        </p>
      </>
    );
  };

  const renderSchedule = () => {
    const minDate = new Date();
    minDate.setMinutes(minDate.getMinutes() + 30);
    const minTimeString = minDate.toTimeString().slice(0, 5);

    return (
      <>
        <h2 className="text-lg font-medium text-gray-900">Schedule Your Admission</h2>
        {formData.travelArrangements === 'No' && triggerMessage && (
          <div className={`mt-4 mb-6 p-4 ${triggerMessage.type === 'success' ? 'text-green-700 border-green-700 bg-green-50' : 'text-red-700 border-red-700 bg-red-50'} border-l-4`}>
            <p className="font-medium">{triggerMessage.text}</p>
          </div>
        )}
        <p className="mt-1 text-sm text-gray-600">Can you make travel arrangements to arrive at the facility at this time?</p>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <div className="mt-2 space-y-2">
              {['Yes', 'No'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`travelArrangements-${option.toLowerCase()}`}
                    name="travelArrangements"
                    type="radio"
                    value={option}
                    checked={formData.travelArrangements === option}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-400 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor={`travelArrangements-${option.toLowerCase()}`} className="ml-2 block text-sm font-medium text-gray-800">
                    {option === 'Yes' ? 'Yes' : 'No, I need assistance with transportation'}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {formData.travelArrangements === 'Yes' && (
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-800">
                Admission Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="admissionDate"
                  id="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
                  min={today}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="admissionTime" className="block text-sm font-medium text-gray-800">
                Admission Time
              </label>
              <div className="mt-1">
                <input
                  type="time"
                  name="admissionTime"
                  id="admissionTime"
                  value={formData.admissionTime}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {formData.travelArrangements === 'No' && (
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-800">
                Pickup Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="pickupAddress"
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
                  placeholder="Enter your pickup address"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-800">
                Pickup Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="pickupDate"
                  id="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
                  min={today}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-800">
                Preferred Pickup Time
              </label>
              <div className="mt-1">
                <input
                  type="time"
                  name="pickupTime"
                  id="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="pickupPhoneNumber" className="block text-sm font-medium text-gray-800">
                Cell Phone Number
              </label>
              <p className="text-xs text-gray-500">*Where UberHealth can text you updates on pickup status</p>
              <div className="mt-1">
                <input
                  type="tel"
                  name="pickupPhoneNumber"
                  id="pickupPhoneNumber"
                  value={formData.pickupPhoneNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1: return renderCoverageCheck();
      case 2: return renderTreatmentInfo();
      case 3: return renderAdditionalInfo();
      case 4: return renderMedicalNeeds();
      case 5: return renderMedicalNeedsChecks();
      case 6: return renderMentalHealth();
      case 7: return renderLegal();
      case 8: return renderApproval();
      case 9: return renderReview();
      case 10: return renderSchedule();
      case 11: return renderNewMentalHealth();
      default: return null;
    }
  };

  const VOBIndicator = () => {
    if (!formData.vobResult) return null;
    return (
      <div className={`fixed top-4 right-4 p-4 rounded-lg ${formData.vobResult === 'Positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        <p className="text-sm font-medium">
          {formData.vobResult === 'Positive' 
            ? "Success! We accept your insurance for treatment!" 
            : "Your insurance will need to be reviewed by our intake team. Please call us at 844-610-8909"}
        </p>
      </div>
    );
  };

  const CongratulationsScreen = ({ formData }: { formData: FormData }) => {
    const formatDateTime = (date: string, time: string) => {
      const dateObj = new Date(`${date}T${time}`);
      return dateObj.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    };

    const getLocationLabel = (value: string) => {
      const locationOptions: { [key: string]: { name: string; link?: string; links?: string[] } } = {
        'iaff': {
          name: 'IAFF Center of Excellence',
          link: 'https://maps.app.goo.gl/ngYzk4f3smZLuP4B9',
        },
        'orlando': {
          name: 'Orlando Recovery Center',
          link: 'https://maps.app.goo.gl/sfLTWXooBAKDdSiZA',
        },
        'atlanta': {
          name: 'The Recovery Village Atlanta',
          link: 'https://maps.app.goo.gl/LjtQDhbxLKcbFjbT6',
        },
        'columbus': {
          name: 'The Recovery Village Columbus',
          link: 'https://maps.app.goo.gl/YMost3t6y8CX6UzEA',
        },
        'umatilla': {
          name: 'The Recovery Village Umatilla',
          link: 'https://maps.app.goo.gl/ieJQQ8SSuFz7YbWcA',
        },
        'kansas_city': {
          name: 'The Recovery Village Kansas City',
          link: 'https://maps.app.goo.gl/mzhEGDyFcgsPLJ8n9',
        },
        'palm_beach': {
          name: 'The Recovery Village Palm Beach',
          link: 'https://maps.app.goo.gl/pfL6jSvYPsbDx4gx9',
        },
        'cherry_hill': {
          name: 'The Recovery Village Cherry Hill',
          link: 'https://maps.app.goo.gl/2c8xM5nfkhi5ZxKZ7',
        },
        'palmer_lake': {
          name: 'The Recovery Village Palmer Lake',
          link: 'https://maps.app.goo.gl/LXWKycWqRkw8huA3A',
        },
        'indianapolis': {
          name: 'The Recovery Village Indianapolis',
          link: 'https://maps.app.goo.gl/JBN2hMiPXKsVmCeC8',
        },
        'ridgefield': {
          name: 'The Recovery Village Ridgefield',
          links: [
            'https://maps.app.goo.gl/ER4CiNCWmYrikstt9',
            'https://maps.app.goo.gl/sidQdBjZXvdwgmZv7',
          ],
        },
      };

      return locationOptions[value];
    };

    const facilityInfo = getLocationLabel(formData.location);

    useEffect(() => {
      const sendFinalSubmit = async () => {
        try {
          await fetch('https://7os5kk.buildship.run/finalSubmit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } catch (error) {
          console.error('Error submitting final data:', error);
        }
      };

      sendFinalSubmit();
    }, [formData]);

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-600">Congratulations!</h2>
        <p className="mt-4 text-gray-600">Your admission has been scheduled. Here's a summary of your information:</p>
        <div className="mt-8 space-y-4">
          {/* Display facility name and link */}
          <p className="text-sm text-gray-700">
            Facility: {facilityInfo.name}{' '}
            {facilityInfo.link && (
              <a href={facilityInfo.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View on Map
              </a>
            )}
          </p>
          {/* For Ridgefield, display both links */}
          {facilityInfo.links && facilityInfo.links.length > 0 && (
            <div className="text-sm text-gray-700">
              <p>Facility Links:</p>
              {facilityInfo.links.map((link, index) => (
                <p key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Location {index + 1}
                  </a>
                </p>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-700">Treatment Type: {formData.treatmentType}</p>
          <p className="text-sm text-gray-700">
            Travel Arrangements: {formData.travelArrangements === 'No' 
              ? "I need help with transportation. I agree to repay the actual cost of transportation to the facility which must be within facility travel coordination policy guidelines and will complete any required agreement upon or in advance of my arrival" 
              : formData.travelArrangements}
          </p>
          {formData.travelArrangements === 'Yes' && (
            <p className="text-sm text-gray-700">
              Your admission is scheduled for {formatDateTime(formData.admissionDate, formData.admissionTime)}.
            </p>
          )}
          {formData.travelArrangements === 'No' && (
            <>
              <p className="text-sm text-gray-700">Pickup Address: {formData.pickupAddress}</p>
              <p className="text-sm text-gray-700">
                Your UberHealth pickup is scheduled for {formatDateTime(formData.pickupDate, formData.pickupTime)}. 
                We'll send details to {formData.pickupPhoneNumber}.
              </p>
            </>
          )}
        </div>
        {/* New callout box with updated message */}
        <div className="mt-8 p-4 bg-blue-100 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-700">What's next?</h3>
          <p className="mt-2 text-blue-700">
            You will receive a call and SMS in the next few minutes from a Recovery Advocate to discuss your admission and
            answer any questions you may have. Please answer your phone when we call. If you have any questions in the
            meantime, feel free to call us directly at{' '}
            <a href="tel:8446108909" className="text-blue-700 underline">
              844-610-8909
            </a>
            .
          </p>
          <p className="mt-2 text-blue-700">
          Have questions on what you need to bring to rehab? Read more: 
            <a href="https://www.therecoveryvillage.com/treatment-program/what-to-bring-to-rehab/" className="text-blue-700 underline">
              What to Bring to Rehab
            </a>
            .
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            {renderSteps()}
            
            {isSubmitted ? (
              <CongratulationsScreen formData={formData} />
            ) : (
              <form onSubmit={handleSubmit}>
                {renderStep()}
                <div className="mt-6 flex flex-col items-center">
                  {step !== 9 && step !== 11 && (
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ backgroundColor: '#3E8275' }}
                    >
                      {step === steps.length ? 'Submit' : 'Continue'}
                    </button>
                  )}
                  {step === 1 && (
                  <div className="mt-4 flex items-center">
                    <span className="ml-2 text-xs text-gray-600">By submitting this form, you agree to opt in to communications from The Recovery Village. Standard message and data rates may apply.</span>
                  </div>
                  )}
                  <div className="mt-4 flex items-center">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <span className="ml-2 text-sm text-gray-600">Your Information is Secure</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}