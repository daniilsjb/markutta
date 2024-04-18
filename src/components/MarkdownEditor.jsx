import { useMantineColorScheme } from '@mantine/core';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-markdown.js';
import 'ace-builds/src-noconflict/theme-textmate.js';
import 'ace-builds/src-noconflict/theme-twilight.js';

export function MarkdownEditor({ ...props }) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <AceEditor
      name="editor"
      mode="markdown"
      height="auto"
      fontSize={14}
      setOptions={{ printMargin: false }}
      theme={colorScheme === 'light' ? 'textmate' : 'twilight'}
      style={{
        background: colorScheme === 'light' ? 'var(--mantine-color-gray-0)' : undefined,
      }}
      {...props}
    />
  );
}