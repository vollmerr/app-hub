import {
  FieldText,
  FieldSelect,
  FieldDate,
  FieldRadios,
} from 'components/Form';

import { normalizeNumber } from './normalize';

/**
 * Example of how a const would typically be used.
 * Using a const allows the following:
 *
 * 1. Easily change field name (such as if API changes it we must also)
 * We can just change the string in this one place instead of multiple.
 * (ex from 'textDefault' to 'defaultText')
 *
 * 2. Consistent names and intellisense support. This const is used 3
 * times in the example bellow. Having to manually type all of them is
 * error prone and does not allow auto completion.
 */
const SECTION_TEXT = 'sectionText';
const FIELD_TEXT_DEFAULT = 'textDefault';

export default {
  /**
   * Order by section name to allow easily looping over in the same order and lookup
   * const from above used for consistency (in the first value).
   * Would nomrally be placed under bySection, but above for readability of example
   */
  allSections: [SECTION_TEXT, 'select', 'radios', 'dates'],
  /**
   * All sections of form (unordered)
   */
  bySection: {
    /**
     * Section of form (in this case all the text fields)
     * example using the const from above, notice [] around it
     */
    [SECTION_TEXT]: {
      /**
       * Title that will be used in the heading above section
       */
      title: 'Text',
      /**
       * Field data such that the name is the key
       */
      byName: {
        [FIELD_TEXT_DEFAULT]: { // example using the const from above, notice [] around it
          label: 'Default Text',
          name: FIELD_TEXT_DEFAULT, // example using the const above for name
          placeholder: 'Enter text...',
          component: FieldText,
        },
        textRequried: {
          required: true,
          label: 'Requried Text',
          name: 'textRequried',
          placeholder: 'Enter text...',
          component: FieldText,
        },
        textArea: {
          multiline: true,
          label: 'Multiline Text',
          name: 'textArea',
          placeholder: 'Enter text...',
          component: FieldText,
        },
        textDisabled: {
          required: true, // required for testing purposes (should render as not required due to being disabled)
          disabled: true,
          label: 'Disabled Text',
          name: 'textDisabled',
          placeholder: 'Enter text...',
          component: FieldText,
        },
        textNormalized: {
          label: 'Normalized Numbers (####-###)',
          name: 'textNormalized',
          placeholder: 'Enter numbers...',
          normalize: normalizeNumber,
          component: FieldText,
        },
      },
      /**
       * Order by name to allow easily looping over in the same order and lookup
       * Again, const from above used for consistency (in the first value).
       */
      allNames: [FIELD_TEXT_DEFAULT, 'textRequried', 'textArea', 'textDisabled', 'textNormalized'],
    },
    select: {
      title: 'Select / Dropdown',
      byName: {
        selectDefault: {
          label: 'Default Text',
          name: 'selectDefault',
          placeholder: 'Enter text...',
          component: FieldSelect,
          options: [
            { key: 'N/A', text: 'Does Not Apply' },
            { key: 'Under', text: 'Under' },
            { key: 'Over', text: 'Over' },
          ],
        },
        selectRequired: {
          required: true,
          label: 'Requried Text',
          name: 'selectRequired',
          placeholder: 'Enter text...',
          component: FieldSelect,
          options: [
            { key: 'N/A', text: 'Does Not Apply' },
            { key: 'Under', text: 'Under' },
            { key: 'Over', text: 'Over' },
          ],
        },
        selectDisabled: {
          required: true, // required for testing purposes (should render as not required due to being disabled)
          disabled: true,
          label: 'Disabled Text',
          name: 'selectDisabled',
          placeholder: 'Enter text...',
          component: FieldSelect,
          options: [
            { key: 'N/A', text: 'Does Not Apply' },
            { key: 'Under', text: 'Under' },
            { key: 'Over', text: 'Over' },
          ],
        },
      },
      allNames: ['selectDefault', 'selectRequired', 'selectDisabled'],
    },
    radios: {
      title: 'Radio Buttons',
      byName: {
        radiosDefault: {
          label: 'Default Radios',
          name: 'radiosDefault',
          component: FieldRadios,
          options: [
            { key: 'N/A', text: 'Does Not Apply' },
            { key: 'Under', text: 'Under' },
            { key: 'Over', text: 'Over' },
          ],
        },
        radiosRequired: {
          required: true,
          label: 'Default Radios',
          name: 'radiosRequired',
          component: FieldRadios,
          options: [
            { key: 'N/A', text: 'Does Not Apply' },
            { key: 'Under', text: 'Under' },
            { key: 'Over', text: 'Over' },
          ],
        },
        radiosDisabled: {
          required: true, // required for testing purposes (should render as not required due to being disabled)
          disabled: true,
          label: 'Disabled Radios',
          name: 'radiosDisabled',
          component: FieldRadios,
          options: [
            { key: 'N/A', text: 'Does Not Apply' },
            { key: 'Under', text: 'Under' },
            { key: 'Over', text: 'Over' },
          ],
        },
      },
      allNames: ['radiosDefault', 'radiosRequired', 'radiosDisabled'],
    },
    dates: {
      title: 'Date Picker',
      byName: {
        dateDefault: {
          label: 'Default Date',
          name: 'dateDefault',
          placeholder: 'Select Date...',
          component: FieldDate,
        },
        requiredDefault: {
          required: true,
          label: 'Required Date',
          name: 'requiredDefault',
          placeholder: 'Select Date...',
          component: FieldDate,
        },
        disabledDefault: {
          required: true, // required for testing purposes (should render as not required due to being disabled)
          disabled: true,
          label: 'Disabled Date',
          name: 'disabledDefault',
          placeholder: 'Select Date...',
          component: FieldDate,
        },
      },
      allNames: ['dateDefault', 'requiredDefault', 'disabledDefault'],
    },
  },
};
