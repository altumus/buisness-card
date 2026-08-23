export type Profile = {
  firstName: string
  lastName: string
  initials: string
  title: string
  location: string
  phone: string
  email: string
  linkedin: string
  telegram: string
  tagline: string
  stack: string[]
}

const PROFILE_QUERY = `
  query CardProfile {
    profile {
      firstName
      lastName
      initials
      title
      location
      phone
      email
      linkedin
      telegram
      tagline
      stack
    }
  }
`

export async function fetchProfile(): Promise<Profile> {
  const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL ?? '/graphql'

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: PROFILE_QUERY }),
  })

  if (!response.ok) {
    throw new Error('Could not load the card')
  }

  const body: {
    data?: { profile?: Profile | null }
    errors?: { message: string }[]
  } = await response.json()

  if (body.errors?.length) {
    throw new Error(body.errors[0].message)
  }

  if (!body.data?.profile) {
    throw new Error('Profile not found')
  }

  return body.data.profile
}

export function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '')
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
