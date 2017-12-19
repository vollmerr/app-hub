import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

// import { downloadFile } from 'utils/request';
import { metaProp, inputProp } from 'utils/propTypes';
import { isEmptyFile } from 'utils/validate';
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


export const DropZone = styled(Dropzone) `
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
      file: null,
      attachError: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    // when redux form resets, reset the options to not checked
    if (!input.value) {
      this.setState({ file: null, attachError: null });
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
      attachError = 'Failed to attach file.';
    }

    const file = files[0];

    this.setState({ file, attachError });
    input.onChange(file);
  }

  onClear = () => {
    const { input } = this.props;
    const file = null;
    this.setState({ file, attachError: null });
    input.onChange(file);
  }

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

    const { attachError, file } = this.state;
    const hasFile = file && !disabled;
    const { touched, error } = meta;
    const name = file ? file.name : placeholder || 'Select a file to upload';

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
      disabled: disabled || !file,
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
      iconProps: {
        iconName: 'Attach',
      },
      onClick: () => { this.dropZoneRef.open(); },
    };

    return (
      <div>
        {label && <Label {...labelProps}>{label}</Label>}

        <FilePicker {...fieldProps}>
          {hasFile && <IconButton {...clearProps} />}
          <DropZone {...zoneProps}>
            <FileName {...nameProps} />
          </DropZone>
          <DefaultButton {...buttonProps} />
        </FilePicker>

        {errorMessage && <FieldError>{errorMessage}</FieldError>}

        {/*
          <button
            onClick={() => (
              this.state.file ?
                downloadFile(this.state.file, this.state.file.name) :
                null
            )}
          >
            Download
          </button>
          */}
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

export default Field(FieldFile, isEmptyFile);
