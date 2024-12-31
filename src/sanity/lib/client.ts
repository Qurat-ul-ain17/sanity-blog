import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId:'pw4zf4r9',
  dataset:'production',
  apiVersion:'2024-12-29',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
