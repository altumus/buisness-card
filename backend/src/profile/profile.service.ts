import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getCardProfile(): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      include: {
        skills: {
          where: { featured: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile is not seeded');
    }

    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      initials: profile.initials,
      title: profile.title,
      location: profile.location,
      phone: profile.phone,
      email: profile.email,
      linkedin: profile.linkedin,
      telegram: profile.telegram,
      tagline: profile.tagline,
      stack: profile.skills.map((skill) => skill.name),
    };
  }
}
