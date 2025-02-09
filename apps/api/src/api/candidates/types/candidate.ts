import { Id } from '../../../types/id';
import { Period } from '../../../types/period';
import { RelatedWebsites } from '../../../types/related-websites';
import { YearMonth } from '../../../types/year-month';
import { AcademicDegreeType } from './enums/academic-degree-type';
import { AcademicStatus } from './enums/academic-status';
import { Benefit } from './enums/benefit';
import { EmploymentRegime } from './enums/employment-regime';
import { EmploymentType } from './enums/employment-type';
import { PositionLevel } from './enums/position-level';
import { WorkplaceType } from './enums/workplace-type';
import { Contact } from '../../../types/contact';
import { Address } from '../../../types/address';
import { AchievementType } from './enums/achievement-type';
import { Location } from '../../../types/location';
import { LanguageProfile } from '../../../types/language-profile';

export interface CandidateReference {
    name: string;
    position: string;
    phone: string;
    email: string;
    relationship: string;
    company: string | null;
}

export interface CandidateProfessionalExperience {
    position: string;
    description: string | null;
    company: string;
    employmentType: EmploymentType;
    workplaceType: WorkplaceType;
    positionLevel: PositionLevel;
    isCurrent: boolean;
    period: Period;
    location: Location;
    relatedSkills: string[];
    responsibilities: string[];
}

export interface CandidateAchievement {
    name: string;
    type: AchievementType;
    issuer: string;
    workload: number | null;
    issueDate: Date;
    expirationDate: Date | null;
    credentialId: string | null;
    credentialUrl: string | null;
    relatedSkills: string[];
}

export interface CandidateEducationalExperience {
    degree: string;
    fieldOfStudy: string;
    type: AcademicDegreeType;
    institution: string;
    institutionWebsite: string | null;
    description: string | null;
    period: Period;
    isCurrent: boolean;
    status: AcademicStatus;
    semesters: number | null;
    currentSemester: number | null;
    institutionRegistrationNumber: string | null;
    gradePointAverage: number | null;
    expectedGraduation: YearMonth | null;
}

export interface CandidateExperiences {
    education: CandidateEducationalExperience[];
    professional: CandidateProfessionalExperience[];
}

export interface CandidatePreferences {
    salary: number | null;
    employmentRegime: EmploymentRegime | null;
    employmentType: EmploymentType | null;
    workplaceType: WorkplaceType | null;
    benefits: Benefit[];
    positionLevel: PositionLevel | null;
}

export interface Candidate extends Id {
    userId: string;
    fullName: string;
    birthDate: string;
    professionalHeadline: string | null;
    contact: Contact;
    address: Address;
    cvUrl: string | null;
    about: string | null;
    bannerUrl: string | null;
    hobbies: string[];
    social: RelatedWebsites;
    isAvailableForWork: boolean;
    allowThirdPartyApplications: boolean;
    preferences: CandidatePreferences;
    experiences: CandidateExperiences;
    languages: LanguageProfile[];
    references: CandidateReference[];
    achievements: CandidateAchievement[];
}
