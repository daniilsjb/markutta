import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit, IconFileText } from '@tabler/icons-react';

export function ToggleMode({ mode, toggleMode, wrapperProps }) {
  return (
    <Tooltip label="Toggle Mode" withArrow>
      <ActionIcon variant="transparent" radius="md" onClick={toggleMode} {...wrapperProps}>
        {mode === 'edit' ? <IconFileText/> : <IconEdit/>}
      </ActionIcon>
    </Tooltip>
  )
}