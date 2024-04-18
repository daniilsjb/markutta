import { useCallback } from 'react';
import { makeHTML } from '../shell.js';

function write({ path, text }) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.setAttribute('download', path);
  anchor.click();

  window.URL.revokeObjectURL(url);
}

export function useExport({ path, body }) {
  return useCallback(({ styled }) => {
    write({
      path: path,
      text: makeHTML({ body, styled }),
    });
  }, [path, body]);
}