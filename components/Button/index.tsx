import { Button as AntButton } from '@chakra-ui/react';
import React from 'react';
type Props = {
  children: React.ReactNode;
  onClick: () => void;
};
export const Button = ({ children, onClick }: Props) => (
  <AntButton colorScheme='teal' onClick={onClick}>
    {children}
  </AntButton>
);
