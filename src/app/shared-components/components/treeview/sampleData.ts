import { TSampleTreeData } from './models';

const treeData: TSampleTreeData[] = [
  {
    id: 1,
    value: '45',
    label: 'Parent 1',
    children: [
      {
        id: 2,
        value: '151',
        label: 'Child 1-1',
        children: [
          {
            id: 3,
            value: '0266',
            label: 'hello',
            children: [{ id: 99, value: '300', label: 'nested' }],
          },
        ],
      },
      { id: 4, value: '0123', label: 'e63' },
      {
        id: 5,
        value: '3326',
        label: 'Child 1-2',
      },
    ],
  },
  {
    id: 6,
    value: '2',
    label: 'Parent 2',
    children: [
      {
        id: 7,
        value: '2-1',
        label: 'Child 2-1',
      },
      {
        id: 8,
        value: '2-2',
        label: 'Child 2-2',
      },
    ],
  },
  {
    id: 9,
    value: '4654645',
    label: 'Parent 3',
    children: [
      {
        id: 10,
        value: '4-6546541',
        label: 'Child 3-1',
      },
      {
        id: 11,
        value: '465444-2',
        label: 'Child 3-2',
        children: [
          { id: 12, label: 'child 3-2-1', value: '36464-2-1' },
          { id: 13, label: 'child 3-2-2', value: '3-2-646542' },
        ],
      },
      {
        id: 14,
        value: '48885-3',
        label: 'Child 3-3',
        children: [
          { id: 15, label: 'child 3-3-1', value: '3-264564-1' },
          {
            id: 16,
            label: 'child 3-3654645-2',
            value: '3-64642-2',
            children: [
              { id: 17, label: 'child 36-2-1', value: '30-6546452-1' },
              { id: 18, label: 'salam', value: '36-6546452-2' },
            ],
          },
        ],
      },
    ],
  },
];

export default treeData;
