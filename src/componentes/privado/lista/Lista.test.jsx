import { render, screen } from '@testing-library/react';
import Lista from './Lista';

describe('Lista Component', () => {
  it('should render correctly', () => {
    render(<Lista />);
    expect(screen.getByText('Texto esperado')).toBeInTheDocument();
  });
});
