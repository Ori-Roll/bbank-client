import { Grid } from '@mantine/core';
import { AccountData, TaskData } from '../../../types/schemaTypes';
import { useIsMobile } from '../../../hooks/configHooks';

type TaskSectionProps = {
  account: AccountData;
};

function TaskSection(props: TaskSectionProps) {
  const { account } = props;

  const isMobile = useIsMobile();

  return account.tasks.length > 0 ? (
    <Grid p="lg" gutter={isMobile ? 'md' : 'lg'}>
      {account.tasks.map((task: TaskData) => (
        <Grid.Col bd="1px solid gray" span={isMobile ? 12 : 4} key={task.id}>
          {task.title}
        </Grid.Col>
      ))}
    </Grid>
  ) : null;
}

export default TaskSection;
