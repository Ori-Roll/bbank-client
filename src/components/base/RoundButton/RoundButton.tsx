import { Button } from '@mantine/core';
import { PropsWithChildren } from 'react';
import style from './RoundButton.module.css';

type RoundButtonProps = PropsWithChildren<{}>;

function RoundButton({ children }: RoundButtonProps) {
  return <Button className={style.button}>{children}</Button>;
}

export default RoundButton;
