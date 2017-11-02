import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { isEmptyFiles } from 'utils/validate';
import theme from 'utils/theme';

import Field from './Field';
import FieldError from './FieldError';

export const FilePicker = styled(Dropzone)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  border: 1px solid;
  border-right: 0;
  border-color: ${(props) => (
    (props.disabled && `${theme.neutralLight}`) ||
    (props['data-error'] && `${theme.redDark}`) ||
    `${theme.neutralTertiary}`
  )};
  cursor: pointer;

  ${(props) => !props.disabled &&
    `&:hover {
      border-color: ${theme.neutralPrimary};
    }`
  }
`;

export const FileName = styled.div`
  padding: 0 15px;
  color: ${(props) => (
    props.disabled && `${theme.neutralTertiary}`
  )};
`;

// make into blob and save
// const saveByteArray = (function _saveByteArray() {
//   const a = document.createElement('a');
//   document.body.appendChild(a);

//   return (data, name) => {
//     const blob = new Blob(data, { type: 'octet/stream' });

//     // IE...
//     if (window.navigator.msSaveOrOpenBlob) {
//       window.navigator.msSaveOrOpenBlob(blob, name);
//     } else {
//       const url = window.URL.createObjectURL(blob);

//       a.href = url;
//       a.download = name;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }
//   };
// }());


export class FieldFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      attachError: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    // when redux form resets, reset the options to not checked
    if (!input.value || !input.value.length) {
      this.setState({ files: [], attachError: null });
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const { input } = this.props;

    let files = [];
    let attachError = null;
    if (acceptedFiles.length) {
      files = acceptedFiles;
    } else {
      files = rejectedFiles;
      attachError = 'Failed to attch file.';
    }

    this.setState({ files, attachError });
    input.onChange(files);
  }

  // handleFileDownload = () => {
  //   saveByteArray([this.state.files[0]], this.state.files[0].name);
  // }

  render() {
    const {
      meta,
      input,
      label,
      disabled,
      required,
      placeholder,
      ...props
    } = this.props;

    const { attachError } = this.state;

    const { touched, error } = meta;
    const name = this.state.files[0] ? this.state.files[0].name : placeholder || 'Select a file to upload';

    let errorMessage;
    if (attachError) {
      errorMessage = attachError;
    } else if (touched && error) {
      errorMessage = error;
    }

    const labelProps = {
      label,
      required,
    };

    const fieldProps = {
      ...props,
      type: 'file',
      disabled,
      'data-error': errorMessage,
      onDrop: this.onDrop,
    };

    const nameProps = {
      disabled: disabled || !this.state.files.length,
      children: name,
    };

    const buttonProps = {
      primary: true,
      disabled,
      type: 'button',
      text: 'Attach File',
    };

    return (
      <div>
        {label && <Label {...labelProps}>{label}</Label>}

        <FilePicker {...fieldProps}>
          <FileName {...nameProps} />
          <DefaultButton {...buttonProps} />
        </FilePicker>

        {errorMessage && <FieldError>{errorMessage}</FieldError>}

        {/* <button onClick={this.handleFileDownload}>Download</button> */}
      </div>
    );
  }
}

FieldFile.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Field(FieldFile, isEmptyFiles);
