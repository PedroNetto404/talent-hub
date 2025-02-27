import HTTPStatus from 'http-status';

import { jobApplicationBusiness } from './job-application-business';
import { JobApplicationController } from '../../types/job-application-controller';

export const jobApplicationController: JobApplicationController = {
    findById: async ({ params: { id: jobApplicationId } }, res) => {
        const jobApplication = await jobApplicationBusiness.findById({
            jobApplicationId,
        });
        res.status(HTTPStatus.OK).json(jobApplication!);
    },

    findAll: async ({ query }, res) => {
        const result = await jobApplicationBusiness.findAll({
            query,
        });
        res.status(HTTPStatus.OK).json(result);
    },

    create: async ({ body: payload }, res) => {
        const jobApplication = await jobApplicationBusiness.create({
            payload,
            context: res.locals,
        });
        res.status(HTTPStatus.CREATED).json(jobApplication);
    },

    remove: async ({ params: { id: jobApplicationId } }, res) => {
        await jobApplicationBusiness.remove({ jobApplicationId });
        res.status(HTTPStatus.NO_CONTENT).send();
    },

    updateCoverLetter: async ({ params: { id: jobApplicationId }, body: payload }, res) => {
        const jobApplication = await jobApplicationBusiness.updateCoverLetter({
            jobApplicationId,
            payload,
        });
        res.status(HTTPStatus.OK).json(jobApplication);
    },

    updateStage: async ({ params: { id: jobApplicationId }, body: payload }, res) => {
        const jobApplication = await jobApplicationBusiness.updateStage({
            jobApplicationId,
            payload,
        });
        res.status(HTTPStatus.OK).json(jobApplication);
    },

    updateStatus: async ({ params: { id: jobApplicationId }, body: payload }, res) => {
        const jobApplication = await jobApplicationBusiness.updateStatus({
            jobApplicationId,
            payload,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobApplication);
    },
};
