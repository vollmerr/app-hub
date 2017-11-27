const spaSchema = {
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
            $ref: '#/definitions/id',
          },
          title: {
            type: 'string',
            faker: 'company.catchPhrase',
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
    recipients: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
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
  required: ['acknowledgments', 'recipients'],
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
        minimum: 1,
        maximum: 99999,
      },
    },
  },
};

module.exports = spaSchema;
