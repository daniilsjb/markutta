import { IconDownload } from '@tabler/icons-react';
import { Button, Menu, rem } from '@mantine/core';

export function ExportButton({ onExport, wrapperProps, buttonProps }) {
  const icon = <IconDownload style={{
    height: rem(18),
    width: rem(18),
  }}/>;

  return (
    <Menu {...wrapperProps}>
      <Menu.Target>
        <Button leftSection={icon} {...buttonProps}>
          Export
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Formats</Menu.Label>
        <Menu.Item onClick={() => onExport({ styled: false })}>
          Raw HTML
        </Menu.Item>
        <Menu.Item onClick={() => onExport({ styled: true })}>
          Styled HTML
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}