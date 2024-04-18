import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ToggleTheme({ wrapperProps }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Tooltip label="Toggle Theme" withArrow>
      <ActionIcon variant="transparent" radius="md" onClick={toggleColorScheme} {...wrapperProps}>
        {colorScheme === 'light' ? <IconMoon/> : <IconSun/>}
      </ActionIcon>
    </Tooltip>
  );
}