import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { metaProp, inputProp } from 'utils/propTypes';
import { isEmptyFiles } from 'utils/validate';
import theme from 'utils/theme';

import Field from './Field';
import FieldError from './FieldError';


export const FilePicker = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  border-color: ${(props) => (
    (props.disabled && `${theme.neutralLight}`) ||
    (props['data-error'] && `${theme.redDark}`) ||
    `${theme.neutralTertiary}`
  )};

  ${(props) => !props.disabled &&
    `&:hover {
      border-color: ${theme.neutralPrimary};
    }`
  }
`;


export const DropZone = styled(Dropzone)`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: auto;
  height: 32px;
  cursor: pointer;
`;


export const FileName = styled.div`
  padding: 0 15px;
  color: ${(props) => (
    props.disabled && `${theme.neutralTertiary}`
  )};
`;


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

  onClear = () => {
    const { input } = this.props;
    const files = [];
    this.setState({ files, attachError: null });
    input.onChange(files);
  }

  // handleFileDownload = () => {
  //   if (this.state.files.length) {
  //     // make into blob and save
  //     const a = document.createElement('a');
  //     const data = [this.state.files[0]];
  //     const name = this.state.files[0].name;
  //     const blob = new Blob(data, { type: 'octet/stream' });

  //     document.body.appendChild(a);
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
  //   }
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

    const { attachError, files } = this.state;
    const hasFiles = !!files.length && !disabled;
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
      disabled,
      'data-error': errorMessage,
    };

    /* istanbul ignore next: TODO: how to test refs... */
    const zoneProps = {
      ...props,
      type: 'file',
      disabled,
      'data-error': errorMessage,
      onDrop: this.onDrop,
      innerRef: (node) => { this.dropZoneRef = node; },
    };

    const nameProps = {
      disabled: disabled || !this.state.files.length,
      children: name,
    };

    const clearProps = {
      iconProps: {
        iconName: 'Clear',
      },
      onClick: this.onClear,
    };

    /* istanbul ignore next: TODO: how to test refs... */
    const buttonProps = {
      primary: true,
      disabled,
      type: 'button',
      text: 'Attach File',
      onClick: () => { this.dropZoneRef.open(); },
    };

    return (
      <div>
        {label && <Label {...labelProps}>{label}</Label>}


        <FilePicker {...fieldProps}>
          {hasFiles && <IconButton {...clearProps} />}
          <DropZone {...zoneProps}>
            <FileName {...nameProps} />
          </DropZone>
          <DefaultButton {...buttonProps} />
        </FilePicker>

        {errorMessage && <FieldError>{errorMessage}</FieldError>}

        {/* <button onClick={this.handleFileDownload}>Download</button> */}
      </div>
    );
  }
}


const { bool, string, any } = PropTypes;

FieldFile.propTypes = {
  meta: metaProp.isRequired,
  input: inputProp(any).isRequired,
  label: string,
  disabled: bool,
  required: bool,
  placeholder: string,
};

export default Field(FieldFile, isEmptyFiles);
