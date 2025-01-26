import { Text, Modal, ModalProps } from '@mantine/core';

type ModalNiceHeaderProps = { title: string };

const ModalNiceHeader: React.FC<ModalNiceHeaderProps> = (props) => {
  const { title } = props;

  return (
    <Text
      size="xl"
      fw={700}
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      {title}
    </Text>
  );
};

type ModalsWrapperProps = React.PropsWithChildren<{
  title: string;
  opened: boolean;
  onClose: () => void;
  modalProps?: Partial<ModalProps>;
}>;

const ModalsWrapper = (props: ModalsWrapperProps) => {
  const { title, opened, onClose, children, modalProps = {} } = props;

  return (
    <Modal
      size="md"
      padding="xl"
      shadow="md"
      centered={true}
      radius="xl"
      title={title && <ModalNiceHeader title={title} />}
      opened={opened}
      onClose={onClose}
      {...modalProps}
    >
      {children}
    </Modal>
  );
};

export default ModalsWrapper;
