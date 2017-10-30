export const mapOnBlur = (onBlur, input) => (event, newValue, previousValue) => {
  if (onBlur) {
    onBlur(event, newValue, previousValue);
  }
  input.onBlur(event, newValue, previousValue);
};

export const mapOnFocus = (onFocus, input) => (event) => {
  if (onFocus) {
    onFocus(event);
  }
  input.onFocus(event);
};

export const mapOnChange = (onChange, input) => (event, newValue, previousValue) => {
  if (onChange) {
    onChange(event, newValue, previousValue);
  }
  input.onChange(event, newValue, previousValue);
};
