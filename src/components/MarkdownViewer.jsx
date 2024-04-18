import { Box } from '@mantine/core';

export function MarkdownViewer({ body }) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: body }}
      style={{ height: '100%', overflow: 'auto' }}
      p="md"
    />
  );
}