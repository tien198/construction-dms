import { ConstructionInforDto } from 'src/construction/domain/dto/create-construction-infor.dto';
import { CreateConstructionDto } from 'src/construction/domain/dto/create-construction.dto';

const infor: ConstructionInforDto = {
  name: 'Sửa chữa mái tôn khu tập thể độc thân kỹ thuật',
  cost: 1000000000,
  costString: 'Một tỷ đồng',
  sourceOfFunds: '2025',
  constructionImplementationTime: {
    startDate: '2025-11-08T17:00:00.000Z',
    endDate: '2025-11-28T17:00:00.000Z',
  },
  existingConditionOfTheStructure:
    'Mái tôn khu tập thể độc thân kỹ thuật nhiều vị trí rỉ sét, thủng dột khi mưa, xà gồ rỉ sét bị ăn mòn, nhiều vị trí bật đinh vít liên kết với mái tôn',
  repairScope:
    'Thay xà gồ mới, thay thế mái tôn mới, sơn dặm vá tường trần, chống thấm mái',
  period: 'KH',
  bidPackages: [
    {
      projectOwner: 'Công ty Trực thăng Miền Nam',
      bidPackageName: 'Tư vấn lập Báo cáo kinh tế kỹ thuật',
      shortDescription:
        'Lập bản vẽ thiết kế kỹ thuật thi công, dự toán công trình.',
      cost: 100000000000,
      bidderSelectionTime: '2025-12-11T07:52:36.892Z',
      bidderSelectionMethod: 'Chỉ định thầu rút gọn',
      upTo: '10 ngày',
      isCompleted: false,
    },
    {
      projectOwner: 'Công ty Trực thăng Miền Nam',
      bidPackageName: 'Thẩm tra Báo cáo kinh tế kỹ thuật',
      shortDescription:
        'Thẩm tra bản vẽ thiết kế kỹ thuật thi công, dự toán công trình',
      cost: 100000000000,
      bidderSelectionTime: '2025-12-11T07:52:36.892Z',
      bidderSelectionMethod: 'Chỉ định thầu rút gọn',
      upTo: '5 ngày',
      isCompleted: false,
    },
  ],
  packagesAmount: 200000000000,
};

const construction: CreateConstructionDto = {
  id: '1764347797538-fa',
  pursuantToDec_TCT: {
    no: '3052/QĐ – TCT',
    date: '2024-12-29T17:00:00.000Z',
  },
  decisions: [
    {
      date: '2025-10-31T17:00:00.000Z',
      pursuantToDec_TCT: {
        no: '3052/QĐ – TCT',
        date: '2024-12-29T17:00:00.000Z',
      },
      period: 'KH',
      submissions: [
        {
          no: '1072/TTr - LCQ',
          level: 'LCQ',
          date: '2025-10-31T17:00:00.000Z',
          pursuantToDec_TCT: {
            no: '3052/QĐ – TCT',
            date: '2024-12-29T17:00:00.000Z',
          },
          period: 'KH',
          constructionInfor: infor,
        },
      ],
    },
  ],
  constructionInfor: infor,
};
console.log(construction);
