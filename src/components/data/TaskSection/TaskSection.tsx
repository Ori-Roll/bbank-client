import { Grid, Text } from '@mantine/core';
import { AccountData, TaskData } from '../../../types/schemaTypes';
import { useIsMobile } from '../../../hooks/configHooks';
import AmountWithSign from '../../../components/base/AmountWithSign/AmountWithSign';
import AnimatedShake from '../../../components/base/Animated/AnimatedShake';

type TaskSectionProps = {
  account: AccountData;
};

function TaskSection(props: TaskSectionProps) {
  const { account } = props;

  const isMobile = useIsMobile();

  return account.tasks.length > 0 ? (
    <Grid p="lg" gutter={isMobile ? 'md' : 'lg'}>
      {account.tasks.map((task: TaskData, i) => (
        <Grid.Col span={isMobile ? 12 : 4} key={task.id}>
          <Text fw={700}>{task.title}</Text>
          <Text c="dimmed">{task.description}</Text>
          <AnimatedShake delay={i * 100}>
            <AmountWithSign amount={task.amount} />
          </AnimatedShake>
        </Grid.Col>
      ))}
    </Grid>
  ) : null;
}

export default TaskSection;
