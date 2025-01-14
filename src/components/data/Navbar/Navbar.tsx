import { Button, ButtonProps, PolymorphicComponentProps } from '@mantine/core';

type NavbarProps = {};

const NavbarButton = (props: PolymorphicComponentProps<any, ButtonProps>) => {
  return (
    <Button variant="light" m={15}>
      {props.children}
    </Button>
  );
};

const Navbar = (props: NavbarProps) => {
  return (
    <>
      <NavbarButton>Add repeating transaction</NavbarButton>
      <NavbarButton>Edit</NavbarButton>
      <NavbarButton>See messages</NavbarButton>
    </>
  );
};

export default Navbar;
