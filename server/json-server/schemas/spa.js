const spaSchema = {
  type: 'object',
  properties: {
    spaAcknowledgments: {
      type: 'array',
      minItems: 8,
      maxItems: 12,
      items: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/definitions/id',
          },
          title: {
            type: 'string',
            faker: 'company.catchPhrase',
          },
          status: {
            type: 'number',
            minimum: 0,
            maximum: 3,
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
            $ref: '#/definitions/group',
          },
          creatorADGroup: {
            $ref: '#/definitions/group',
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
          'status',
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
    spaRecipients: {
      type: 'array',
      minItems: 15,
      maxItems: 20,
      items: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/definitions/id',
          },
          acknowledgmentId: {
            $ref: '#/definitions/id',
          },
          samAccount: {
            type: 'string',
            faker: 'internet.userName',
          },
          firstName: {
            type: 'string',
            faker: 'name.firstName',
          },
          lastName: {
            type: 'string',
            faker: 'name.lastName',
          },
          email: {
            type: 'string',
            faker: 'internet.email',
          },
          isActive: {
            type: 'boolean',
          },
        },
        required: [
          'id',
          'acknowledgmentId',
          'samAccount',
          'firstName',
          'lastName',
          'email',
          'isActive',
        ],
      },
    },
  },
  required: ['spaAcknowledgments', 'spaRecipients'],
  definitions: {
    id: {
      type: 'number',
      minimum: 0,
      exclusiveMinimum: true,
      uniqueItems: true,
    },
    group: {
      type: 'array',
      minItems: 1,
      maxItems: 3,
      uniqueItems: true,
      items: {
        type: 'number',
        minimum: 0,
        maximum: 3,
      },
    },
  },
};

module.exports = spaSchema;
