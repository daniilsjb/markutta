import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Container, Group, Stack, Text } from '@mantine/core';

import { marked } from 'marked';
import DOMPurify from 'dompurify';

import { MarkdownEditor } from './components/MarkdownEditor.jsx';
import { MarkdownViewer } from './components/MarkdownViewer.jsx';
import { ImportButton } from './components/ImportButton.jsx';
import { ExportButton } from './components/ExportButton.jsx';
import { ToggleTheme } from './components/ToggleTheme.jsx';
import { ToggleMode } from './components/ToggleMode.jsx';
import { useImport } from './hooks/useImport.jsx';
import { useExport } from './hooks/useExport.jsx';

import README from '../README.md?raw';

export default function App() {
  const [text, setText] = useState(README);
  const body = DOMPurify.sanitize(marked.parse(text));

  const handleImport = useImport({ text, setText });
  const handleExport = useExport({ path: 'Markutta Output.html', body });

  const [opened, { toggle }] = useDisclosure(false);
  const [mode, setMode] = useState('edit');
  const toggleMode = () => {
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  const editor = <MarkdownEditor value={text} onChange={setText}/>;
  const viewer = <MarkdownViewer body={body}/>;

  return (
    <AppShell
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleImport(e.dataTransfer.files[0]);
      }}
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true },
      }}
    >
      <AppShell.Header>
        <Container size="xl">
          <Group p="md" justify="space-between">
            {/* TITLE */}
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
              <Text fz={24}>Markutta</Text>
            </Group>

            {/* ACTIONS */}
            <Group>
              <ImportButton
                onImport={handleImport}
                wrapperProps={{ visibleFrom: 'sm' }}
              />
              <ExportButton
                onExport={handleExport}
                wrapperProps={{ visibleFrom: 'sm', mr: 'xl' }}
              />
              <ToggleMode
                mode={mode} toggleMode={toggleMode}
                wrapperProps={{ hiddenFrom: 'sm' }}
              />
              <ToggleTheme/>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <ImportButton
            onImport={handleImport}
            buttonProps={{ variant: 'light', justify: 'left' }}
          />
          <ExportButton
            onExport={handleExport}
            buttonProps={{ variant: 'light', justify: 'left' }}
          />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ height: 'calc(100vh - 70px)' }}>
        {/* Two-column layout for larger screens. */}
        <Group visibleFrom="sm" align="stretch" style={{ height: '100%' }} grow>
          {editor}
          {viewer}
        </Group>

        {/* Single-column layout for mobile screens. */}
        <Group hiddenFrom="sm" align="stretch" style={{ height: '100%' }} grow>
          {mode === 'edit' ? editor : viewer}
        </Group>
      </AppShell.Main>
    </AppShell>
  );
}
