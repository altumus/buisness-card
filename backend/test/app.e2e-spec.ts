import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('GraphQL (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('answers introspection query', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ __schema { queryType { name } } }' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.__schema.queryType.name).toBe('Query');
      });
  });
});
