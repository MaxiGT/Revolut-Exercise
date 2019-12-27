import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { shallow } from 'enzyme';

describe('ErrorBoundary', () => {

  it('Reacts to props change and renders children', () => {

    const errorBoundary = shallow(
      <ErrorBoundary error={false}>
        <div className="" data-testid="errorBoundary-children" />
      </ErrorBoundary>);

    expect(errorBoundary.is('[data-testid="errorBoundary-children"]')).toBe(true);
    errorBoundary.setProps({ error: true });
    expect(errorBoundary.is('[data-testid="errorBoundary"]')).toBe(true);

  });
});