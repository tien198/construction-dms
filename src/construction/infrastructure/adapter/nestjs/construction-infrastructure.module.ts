import { Module } from '@nestjs/common';

import { ConstructionQueryRepository } from '../outbound/persistence/construction-query.repository';
import { ConstructionWriteRepository } from '../outbound/persistence/construction-write.repository';
import { DocumentQueryRepository } from '../outbound/persistence/document-query.repository';
import { DocumentWriteRepository } from '../outbound/persistence/document-write.repository';
import { UnitOfWork } from '../outbound/persistence/unit-of-work';
import { DocxGenerationAdapter } from '../outbound/docx-generation/gen-docx.adapter';
import { DocxGenerationServiceProvider } from './provider/docx-generation.service.provider';

@Module({
  providers: [
    {
      provide: 'IConstructionQueryRepository',
      useClass: ConstructionQueryRepository,
    },
    {
      provide: 'IConstructionWriteRepository',
      useClass: ConstructionWriteRepository,
    },
    {
      provide: 'IDocumentQueryRepository',
      useClass: DocumentQueryRepository,
    },
    {
      provide: 'IDocumentWriteRepository',
      useClass: DocumentWriteRepository,
    },
    {
      provide: 'IUnitOfWork',
      useClass: UnitOfWork,
    },
    // Docx Generation
    {
      provide: 'IDocxGenerationPort',
      useClass: DocxGenerationAdapter,
    },

    DocxGenerationServiceProvider,
  ],
  exports: [
    'IConstructionQueryRepository',
    'IConstructionWriteRepository',
    'IDocumentQueryRepository',
    'IDocumentWriteRepository',
    'IUnitOfWork',
    'IDocxGenerationPort',
    DocxGenerationServiceProvider,
  ],
})
export class ConstructionInfrastructureModule {}
