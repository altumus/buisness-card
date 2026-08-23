/** Временные данные визитки. Позже заменятся запросом к backend. */
export type Profile = {
  firstName: string
  lastName: string
  initials: string
  title: string
  email: string
  stack: string[]
}

export const profile: Profile = {
  firstName: 'Максим',
  lastName: 'Бухарин',
  initials: 'МБ',
  title: 'разработчик',
  email: 'jojojopa@icloud.com',
  stack: [
    'TypeScript',
    'Node.js',
    'NestJS',
    'Prisma',
    'GraphQL',
    'Docker',
    'Git',
  ],
}
