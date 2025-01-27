import { userRepository } from '../users/user-repository'
import { ApiError } from '../../shared/types/api-error'
import { candidateRepository } from './candidate-repository'
import { userBusiness } from '../users/user-business'
import { merge, newInstance } from './candidate-parser'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { Candidate } from './types/entities/candidate'
import { fileStorageService } from '../../shared/services/file-storage-service'

const create = async ({
  userId,
  payload,
}: {
  userId: string
  payload: Omit<Candidate, 'id' | 'userId'>
}) => {
  const user = await userRepository.findById(userId)
  if (!user) {
    ApiError.throwNotFound('User not found')
  }

  if (!userBusiness.canCreateCandidate(user!)) {
    ApiError.throwForbidden('User cannot create candidate')
  }

  const candidate = newInstance(userId, payload)

  await candidateRepository.create({
    ...candidate,
    userId,
  })

  return candidate
}

const update = async ({
  candidateId,
  payload,
}: {
  candidateId: string
  payload: Partial<Candidate>
}) => {
  const candidate = await candidateRepository.findById(candidateId)
  if (!candidate) {
    ApiError.throwNotFound('Candidate not found')
  }

  const updated = merge(candidate!, payload)
  await candidateRepository.update(updated)

  return updated
}

const findById = async (id: string) => {
  const candidate = await candidateRepository.findById(id)
  if (!candidate) {
    ApiError.throwNotFound('Candidate not found')
  }

  return candidate!
}

const findAll = async (query: FindAllArgs<Candidate>) => {
  const candidates = await candidateRepository.findAll(query)
  return candidates
}

const remove = async (id: string) => {
  const candidate = await candidateRepository.findById(id)
  if (!candidate) {
    ApiError.throwNotFound(`candidate with id ${id} not found`)
  }

  await candidateRepository.deleteById(id)
}

const updateCv = async ({
  candidateId,
  file,
}: {
  candidateId: string
  file: { content: Buffer; contentType: string }
}) => {
  const candidate = await candidateRepository.findById(candidateId)
  if (!candidate) {
    ApiError.throwNotFound(`candidate with id ${candidateId} not found`)
  }

  const key = `candidate-${candidateId}-cv.${file.contentType.split('/')[1]}`

  const url = await fileStorageService.upload({
    file: file.content,
    contentType: file.contentType,
    key,
  })
  if (!url) {
    ApiError.throwInternalServerError('error uploading cv file')
  }
  candidate!.cvUrl = url

  await candidateRepository.update(candidate!)
  return candidate
}

const updateBanner = async ({
  candidateId,
  file,
}: {
  candidateId: string
  file: { content: Buffer; contentType: string }
}) => {
  const candidate = await candidateRepository.findById(candidateId)
  if (!candidate) {
    ApiError.throwNotFound(`Candidate with id ${candidateId} not found`)
  }

  const key = `candidate-${candidateId}-banner.${file.contentType.split('/')[1]}`
  const url = await fileStorageService.upload({
    file: file.content,
    contentType: file.contentType,
    key,
  })

  if (!url) {
    ApiError.throwInternalServerError('Error uploading banner file')
  }

  candidate!.bannerUrl = url

  await candidateRepository.update(candidate!)
  return candidate
}

export const candidateBusiness = {
  create,
  update,
  findById,
  remove,
  findAll,
  updateCv,
  updateBanner,
}
