import React from 'react';
import Header from '../../../components/common/HeaderList';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom/client';
import TestRenderer from 'react-test-renderer';
describe('HeaderList component', () => {
    describe('Test react lib', () => {
        it('should match title and subtitle', () => {
            const { getByTestId } = render(<Header subtitle={'Managing the Users Members'} title={'USER'} />);
            let title = getByTestId('title');
            let subtitle = getByTestId('subtitle');
            expect(title.innerHTML).toBe('USER');
            expect(subtitle.innerHTML).toBe('Managing the Users Members');
        });
    });
    describe('Test-utils', () => {
        let container;

        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(() => {
            document.body.removeChild(container);
            container = null;
        });
        it('should match title and subtitle', () => {
            act(() => {
                ReactDOM.createRoot(container).render(<Header subtitle={'Managing the Users Members'} title={'USER'} />);
            });
            let title = container.querySelector('#title');
            let subtitle = container.querySelector('#subtitle');
            expect(title.innerHTML).toBe('USER');
            expect(subtitle.innerHTML).toBe('Managing the Users Members');
        });
    });
    describe('Test renderer', () => {
        it('should match title and subtitle', () => {
            const tr = TestRenderer.create(<Header subtitle={'Managing the Users Members'} title={'USER'} />);
            let title = tr.root.findByProps({ 'data-testid': 'title' });
            let subtitle = tr.root.findByProps({ 'data-testid': 'subtitle' });

            expect(title.props.children).toBe('USER');
            expect(subtitle.props.children).toBe('Managing the Users Members');
        });
    });
});
