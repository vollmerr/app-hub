import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { shallowEqual } from 'recompose';


const withD3Renderer = ({
  resizeOn = ['width', 'height'],
  updateOn = ['data'],
}) => (WrappedComponent) => (
    class WithD3Renderer extends React.Component {
      static propTypes = {
        onIncrementRenderCount: PropTypes.func.isRequired,
      };

      setRef = (wrappedComponentInstance) => {
        this.component = wrappedComponentInstance;
      }

      componentDidMount() {
        const { onIncrementRenderCount } = this.props;
        onIncrementRenderCount('component');
        onIncrementRenderCount('d3');
        this.component.renderD3('render');
      }

      componentDidUpdate(prevProps) {
        const { onIncrementRenderCount } = this.props;
        onIncrementRenderCount('component');
        const shouldResize = (props) => _.pick(props, resizeOn);
        if (!shallowEqual(shouldResize(this.props), shouldResize(prevProps))) {
          onIncrementRenderCount('d3');
          return this.component.renderD3('resize');
        }
        const shouldUpdate = (props) => _.pick(props, updateOn);
        if (!shallowEqual(shouldUpdate(this.props), shouldUpdate(prevProps))) {
          onIncrementRenderCount('d3');
          return this.component.renderD3('update');
        }
        return false;
      }

      render() {
        const { onIncrementRenderCount, ...otherProps } = this.props;
        return <WrappedComponent ref={this.setRef} {...otherProps} />;
      }
    }
  );


export default withD3Renderer;
