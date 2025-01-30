import * as uuid from 'uuid';
import moment from 'moment';

import { YearMonth } from '../../types/year-month';
import { CandidateParser } from './types/candidate-parse';

export const candidateParser: CandidateParser = {
    toDatabase: (candidate) => ({
        id: candidate.id,
        userId: candidate.userId,
        fullName: candidate.fullName,
        birthDate: candidate.birthDate,
        professionalHeadline: candidate.professionalHeadline,
        contactEmail: candidate.contact.email,
        contactPhone: candidate.contact.phone,
        address: candidate.address,
        cvUrl: candidate.cvUrl,
        about: candidate.about,
        bannerUrl: candidate.bannerUrl,
        hobbies: candidate.hobbies,
        linkedin: candidate.social.linkedin,
        github: candidate.social.github,
        twitter: candidate.social.twitter,
        facebook: candidate.social.facebook,
        instagram: candidate.social.instagram,
        youtube: candidate.social.youtube,
        medium: candidate.social.medium,
        website: candidate.social.website,
        isAvailableForWork: candidate.isAvailableForWork,
        allowThirdPartyApplications: candidate.allowThirdPartyApplications,
        salaryPreference: candidate.preferences.salary,
        contractTypePreference: candidate.preferences.contractType,
        employmentTypePreference: candidate.preferences.employmentType,
        workplaceTypePreference: candidate.preferences.workplaceType,
        benefitsPreference: candidate.preferences.benefits,
        positionLevelPreference: candidate.preferences.positionLevel,
        educationalExperiences: candidate.experiences.education.map((education) => ({
            degree: education.degree,
            fieldOfStudy: education.fieldOfStudy,
            status: education.status,
            type: education.type,
            institution: education.institution,
            institutionWebsite: education.institutionWebsite,
            description: education.description,
            startYear: education.period.start.year,
            startMonth: education.period.start.month,
            endYear: education.period.end?.year ?? null,
            endMonth: education.period.end?.month ?? null,
            isCurrent: education.isCurrent,
            semesters: education.semesters,
            currentSemester: education.currentSemester,
            institutionRegistrationNumber: education.institutionRegistrationNumber,
            gradePointAverage: Number(education.gradePointAverage),
            expectedGraduationYear: education.expectedGraduation?.year ?? null,
            expectedGraduationMonth: education.expectedGraduation?.month ?? null,
        })),
        professionalExperiences: candidate.experiences.professional.map((experience) => ({
            title: experience.title,
            description: experience.description,
            company: experience.company,
            employmentType: experience.employmentType,
            workplaceType: experience.workplaceType,
            positionLevel: experience.positionLevel,
            isCurrent: experience.isCurrent,
            startYear: experience.period.start.year,
            startMonth: experience.period.start.month,
            endYear: experience.period.end?.year ?? null,
            endMonth: experience.period.end?.month ?? null,
            location: experience.location,
            relatedSkills: experience.relatedSkills,
        })),
        references: candidate.references.map((r) => ({
            name: r.name,
            position: r.position,
            phone: r.phone,
            email: r.email,
            relationship: r.relationship,
            company: r.company,
        })),
        languages: candidate.languages.map((l) => ({
            language: l.language,
            writtenLevel: l.writtenLevel,
            spokenLevel: l.spokenLevel,
            readingLevel: l.readingLevel,
            listeningLevel: l.listeningLevel,
        })),
        achievements: candidate.achievements.map((a) => ({
            name: a.name,
            type: a.type,
            issuer: a.issuer,
            issueYear: a.issueDate.year,
            issueMonth: a.issueDate.month,
            expirationYear: a.expirationDate?.year ?? null,
            expirationMonth: a.expirationDate?.month ?? null,
            credentialId: a.credentialId,
            credentialUrl: a.credentialUrl,
            relatedSkills: a.relatedSkills,
        })),
    }),

    fromDatabase: (attr) => ({
        id: attr.id,
        userId: attr.userId,
        fullName: attr.fullName,
        birthDate: moment(attr.birthDate).format('YYYY-MM-DD'),
        contact: { email: attr.contactEmail, phone: attr.contactPhone },
        address: attr.address,
        cvUrl: attr.cvUrl,
        about: attr.about,
        professionalHeadline: attr.professionalHeadline,
        bannerUrl: attr.bannerUrl,
        hobbies: attr.hobbies,
        social: {
            linkedin: attr.linkedin,
            github: attr.github,
            twitter: attr.twitter,
            facebook: attr.facebook,
            instagram: attr.instagram,
            youtube: attr.youtube,
            medium: attr.medium,
            website: attr.website,
        },
        isAvailableForWork: attr.isAvailableForWork,
        allowThirdPartyApplications: attr.allowThirdPartyApplications,
        preferences: {
            salary: Number(attr.salaryPreference),
            contractType: attr.contractTypePreference,
            employmentType: attr.employmentTypePreference,
            workplaceType: attr.workplaceTypePreference,
            benefits: attr.benefitsPreference,
            positionLevel: attr.positionLevelPreference,
        },
        experiences: {
            education: attr.educationalExperiences.map((e) => ({
                degree: e.degree,
                fieldOfStudy: e.fieldOfStudy,
                status: e.status,
                type: e.type,
                institution: e.institution,
                institutionWebsite: e.institutionWebsite,
                description: e.description,
                period: {
                    start: { year: e.startYear, month: e.startMonth },
                    end: e.endYear ? ({ year: e.endYear, month: e.endMonth } as YearMonth) : null,
                },
                isCurrent: e.isCurrent,
                semesters: e.semesters,
                currentSemester: e.currentSemester,
                institutionRegistrationNumber: e.institutionRegistrationNumber,
                gradePointAverage: Number(e.gradePointAverage),
                expectedGraduation: e.expectedGraduationYear
                    ? ({
                        year: e.expectedGraduationYear,
                        month: e.expectedGraduationMonth,
                    } as YearMonth)
                    : null,
            })),
            professional: attr.professionalExperiences.map((p) => ({
                title: p.title,
                description: p.description,
                company: p.company,
                employmentType: p.employmentType,
                workplaceType: p.workplaceType,
                positionLevel: p.positionLevel,
                isCurrent: p.isCurrent,
                period: {
                    start: { year: p.startYear, month: p.startMonth } as YearMonth,
                    end: p.endYear ? ({ year: p.endYear!, month: p.endMonth } as YearMonth) : null,
                },
                location: p.location,
                relatedSkills: p.relatedSkills,
            })),
        },
        references: attr.references.map((r) => ({
            name: r.name,
            position: r.position,
            phone: r.phone,
            email: r.email,
            relationship: r.relationship,
            company: r.company,
        })),
        languages: attr.languages.map((l) => ({
            language: l.language,
            writtenLevel: l.writtenLevel,
            spokenLevel: l.spokenLevel,
            readingLevel: l.readingLevel,
            listeningLevel: l.listeningLevel,
        })),
        achievements: attr.achievements.map((a) => ({
            name: a.name,
            type: a.type,
            issuer: a.issuer,
            issueDate: { year: a.issueYear, month: a.issueMonth },
            expirationDate: a.expirationYear
                ? ({ year: a.expirationYear, month: a.expirationMonth } as YearMonth)
                : null,
            credentialId: a.credentialId,
            credentialUrl: a.credentialUrl,
            relatedSkills: a.relatedSkills,
        })),
    }),

    newInstance: ({ userId, payload }) => ({
        id: uuid.v4(),
        userId,
        fullName: payload.fullName,
        birthDate: payload.birthDate,
        professionalHeadline: payload.about,
        contact: payload.contact,
        address: payload.address,
        cvUrl: null,
        about: payload.about,
        bannerUrl: null,
        hobbies: payload.hobbies,
        social: payload.social,
        isAvailableForWork: payload.isAvailableForWork,
        allowThirdPartyApplications: payload.allowThirdPartyApplications,
        preferences: payload.preferences,
        experiences: payload.experiences,
        languages: payload.languages,
        references: payload.references,
        achievements: payload.achievements,
    }),
};
