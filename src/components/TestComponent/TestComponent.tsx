import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
  color: red;
`;

export interface TestComponentProps {
  text?: string;
}

export const TestComponent: FC<TestComponentProps> = ({ text }: TestComponentProps) => (
  <Wrapper>{text || 'Test Component'}</Wrapper>
);
