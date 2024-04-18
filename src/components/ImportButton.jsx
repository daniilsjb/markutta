import { IconFileImport } from '@tabler/icons-react';
import { Button, FileButton, rem } from '@mantine/core';

export function ImportButton({ onImport, wrapperProps, buttonProps }) {
  const icon = <IconFileImport style={{
    height: rem(18),
    width: rem(18),
  }}/>;

  return (
    <FileButton onChange={onImport} accept=".md,.markdown,.txt" {...wrapperProps}>
      {(props) => <Button leftSection={icon} {...buttonProps} {...props}>Import</Button>}
    </FileButton>
  );
}