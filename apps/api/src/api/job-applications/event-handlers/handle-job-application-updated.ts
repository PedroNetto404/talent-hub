import { logger } from '../../../services/logging-service';

export const handleJobApplicationUppdated = async(jobApplicationId: string) => {
    logger.info(`Handling job application updated event for job application ${jobApplicationId}`);
};
