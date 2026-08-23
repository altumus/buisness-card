import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skills: { name: string; category: string; featured: boolean; sortOrder: number }[] = [
  { name: 'TypeScript', category: 'language', featured: true, sortOrder: 1 },
  { name: 'NestJS', category: 'backend', featured: true, sortOrder: 2 },
  { name: 'Node.js', category: 'language', featured: true, sortOrder: 3 },
  { name: 'GraphQL', category: 'backend', featured: true, sortOrder: 4 },
  { name: 'PostgreSQL', category: 'data', featured: true, sortOrder: 5 },
  { name: 'Prisma', category: 'data', featured: true, sortOrder: 6 },
  { name: 'Docker', category: 'devops', featured: true, sortOrder: 7 },
  { name: 'WebSockets', category: 'backend', featured: false, sortOrder: 10 },
  { name: 'gRPC', category: 'backend', featured: false, sortOrder: 11 },
  { name: 'Redis', category: 'data', featured: false, sortOrder: 12 },
  { name: 'React', category: 'frontend', featured: false, sortOrder: 13 },
  { name: 'Next.js', category: 'frontend', featured: false, sortOrder: 14 },
  { name: 'Kubernetes', category: 'devops', featured: false, sortOrder: 15 },
];

async function main() {
  const profile = await prisma.profile.upsert({
    where: { email: 'bukharin.maksim.a@gmail.com' },
    update: {
      firstName: 'Maksim',
      lastName: 'Bukharin',
      initials: 'MB',
      title: 'Senior Fullstack / Backend Engineer',
      location: 'Yerevan, Remote',
      phone: '+374 55 396 532',
      linkedin: 'https://www.linkedin.com/in/maksim-bukharin',
      telegram: 'https://t.me/Altumus',
      tagline: 'High-load backends and real-time systems, 5+ years',
      summary:
        'Fullstack and backend engineer. Multiplayer game backends, enterprise communication platforms, productivity tools with ~15k MAU.',
      availability:
        'Open to remote roles worldwide. Willing to relocate to the US, UK, Netherlands, Canada, Austria, Australia, or New Zealand.',
    },
    create: {
      firstName: 'Maksim',
      lastName: 'Bukharin',
      initials: 'MB',
      title: 'Senior Fullstack / Backend Engineer',
      location: 'Yerevan, Remote',
      phone: '+374 55 396 532',
      email: 'bukharin.maksim.a@gmail.com',
      linkedin: 'https://www.linkedin.com/in/maksim-bukharin',
      telegram: 'https://t.me/Altumus',
      tagline: 'High-load backends and real-time systems, 5+ years',
      summary:
        'Fullstack and backend engineer. Multiplayer game backends, enterprise communication platforms, productivity tools with ~15k MAU.',
      availability:
        'Open to remote roles worldwide. Willing to relocate to the US, UK, Netherlands, Canada, Austria, Australia, or New Zealand.',
    },
  });

  await prisma.skill.deleteMany({ where: { profileId: profile.id } });
  await prisma.skill.createMany({
    data: skills.map((skill) => ({ ...skill, profileId: profile.id })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
