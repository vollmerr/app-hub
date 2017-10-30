import {
  mapOnBlur,
  mapOnFocus,
  mapOnChange,
} from '../reduxForm';

const input = {
  onBlur: jest.fn(),
  onFocus: jest.fn(),
  onChange: jest.fn(),
};

const event = jest.fn();
const newVal = 'new value';
const oldVal = 'old value';

describe('reduxForm utils', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('mapOnBlur', () => {
    it('should call onBlur (custom, not redux-form`s) if passed one', () => {
      const onBlur = jest.fn();
      mapOnBlur(onBlur, input)(event, newVal, oldVal);
      expect(onBlur).toHaveBeenCalledWith(event, newVal, oldVal);

      jest.resetAllMocks();
      mapOnBlur(null, input)(event, newVal, oldVal);
      expect(onBlur).not.toHaveBeenCalled();
    });

    it('should call redux forms onBlur', () => {
      const onBlur = jest.fn();
      mapOnBlur(onBlur, input)(event, newVal, oldVal);
      expect(input.onBlur).toHaveBeenCalledWith(event, newVal, oldVal);
    });
  });

  describe('mapOnFocus', () => {
    it('should call onFocus (custom, not redux-form`s) if passed one', () => {
      const onFocus = jest.fn();
      mapOnFocus(onFocus, input)(event);
      expect(onFocus).toHaveBeenCalledWith(event);

      jest.resetAllMocks();
      mapOnFocus(null, input)(event);
      expect(onFocus).not.toHaveBeenCalledWith(event);
    });

    it('should call redux form`s onFocus', () => {
      const onFocus = jest.fn();
      mapOnFocus(onFocus, input)(event);
      expect(input.onFocus).toHaveBeenCalled();
    });
  });

  describe('mapOnChange', () => {
    it('should call onChange (custom, not redux-form`s) if passed one', () => {
      const onChange = jest.fn();
      mapOnChange(onChange, input)(event, newVal, oldVal);
      expect(onChange).toHaveBeenCalledWith(event, newVal, oldVal);

      jest.resetAllMocks();
      mapOnChange(null, input)(event, newVal, oldVal);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should call redux forms onChange', () => {
      const onChange = jest.fn();
      mapOnChange(onChange, input)(event, newVal, oldVal);
      expect(input.onChange).toHaveBeenCalledWith(event, newVal, oldVal);
    });
  });
});
