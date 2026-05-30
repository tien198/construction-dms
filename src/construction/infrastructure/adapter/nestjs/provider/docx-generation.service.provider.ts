import { Injectable } from '@nestjs/common';
import { DocxGenerationService } from 'src/construction/application/service/docx-generation.service';

@Injectable()
export class DocxGenerationServiceProvider extends DocxGenerationService {}
