const schema = {
  type: 'object',
  properties: {
    acknowledgments: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            unique: true,
            minimum: 1,
          },
          title: {
            type: 'string',
            faker: 'lorem.word',
          },
          isActive: {
            type: 'boolean',
          },
          activeStartDate: {
            type: 'string',
            faker: 'date.past',
          },
          activeEndDate: {
            type: 'string',
            faker: 'date.future',
          },
          ackStatement: {
            type: 'string',
            faker: 'lorem.paragraph',
          },
          detailsText: {
            type: 'string',
            faker: 'lorem.sentences',
          },
          targetADGroup: {
            type: 'array',
            minItems: 1,
            maxItems: 3,
            uniqueItems: true,
            items: {
              type: 'number',
              minimum: 1,
              maximum: 99999,
            },
            required: ['id'],
          },
          creatorADGroup: {
            type: 'array',
            minItems: 1,
            maxItems: 3,
            uniqueItems: true,
            items: {
              type: 'number',
              minimum: 1,
              maximum: 99999,
            },
            required: ['id'],
          },
          fileName: {
            type: 'string',
            faker: 'system.fileName',
          },
          fileContent: {
            type: 'string',
            faker: 'image.dataUri',
          },
        },
        required: [
          'id',
          'title',
          'isActive',
          'activeStartDate',
          'activeEndDate',
          'creatorGroup',
          'ackStatement',
          'detailsText',
          'targetADGroup',
          'creatorADGroup',
        ],
      },
    },
  },
  required: ['acknowledgments'],
};

module.exports = schema;
