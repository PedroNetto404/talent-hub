import {
    Address,
    Benefit,
    EmploymentRegime,
    EmploymentType,
    PositionLevel,
    WorkplaceType,
} from '@talent-hub/shared';
import { CandidateAchievementModelAttr } from './candidate-achievement-model-attr';
import { CandidateEducationalExperienceModelAttr } from './candidate-education-experience-model-attr';
import { CandidateLanguageModelAttr } from './candidate-language-model-attr';
import { CandidateProfessionalExperienceModelAttr } from './candidate-professional-experience-model-attr';
import { CandidateReferenceModelAttr } from './candidate-reference-model-attr';

export interface CandidateModelAttr {
    id: string;
    candidateId?: string;
    userId: string;
    fullName: string;
    birthDate: string;
    cvUrl: string | null;
    about: string | null;
    contactPhone: string;
    contactEmail: string;
    address: Address;
    professionalHeadline: string | null;
    bannerUrl: string | null;
    hobbies: string[];
    linkedin: string | null;
    github: string | null;
    twitter: string | null;
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
    medium: string | null;
    website: string | null;
    isAvailableForWork: boolean;
    allowThirdPartyApplications: boolean;
    salaryPreference: number | null;
    employmentRegimePreference: EmploymentRegime | null;
    employmentTypePreference: EmploymentType | null;
    workplaceTypePreference: WorkplaceType | null;
    benefitsPreference: Benefit[];
    positionLevelPreference: PositionLevel | null;
    professionalExperiences: CandidateProfessionalExperienceModelAttr[];
    educationalExperiences: CandidateEducationalExperienceModelAttr[];
    languages: CandidateLanguageModelAttr[];
    references: CandidateReferenceModelAttr[];
    achievements: CandidateAchievementModelAttr[];
}
