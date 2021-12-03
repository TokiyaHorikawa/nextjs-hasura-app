import { DeleteIcon as Icon } from '@chakra-ui/icons';
type Props = {
  onClick: () => void;
};
export const DeleteIcon = ({ onClick }: Props) => (
  <Icon w={4} h={4} color='red.500' onClick={onClick} />
);
