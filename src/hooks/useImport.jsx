import { useCallback } from 'react';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';

async function read(file) {
  const contents = await file.text();
  if (/[\x00-\x08\x0E-\x1F]/.test(contents)) {
    throw new Error('Attempting to import a binary file.');
  }
  return contents;
}

export function useImport({ text, setText }) {
  return useCallback((file) => {
    const cancel = () => {
      showCancelledNotification();
    };

    const confirm = (file) => {
      read(file)
        .then((data) => setText(data))
        .then(() => showSuccessNotification())
        .catch(() => showUnsupportedNotification());
    };

    if (!text.trim()) {
      confirm(file);
      return;
    }

    showConfirmationModal({
      onConfirm: () => confirm(file),
      onCancel: () => cancel(),
    });
  }, [text, setText]);
}

function showSuccessNotification() {
  notifications.show({
    color: 'teal',
    title: 'Success',
    message: 'Your file has been successfully imported! 🚀',
  });
}

function showCancelledNotification() {
  notifications.show({
    color: 'red',
    title: 'Cancelled',
    message: 'Your file import has been cancelled.',
  });
}

function showUnsupportedNotification() {
  notifications.show({
    color: 'red',
    title: 'Unsupported',
    message: 'Only Markdown and text files can be imported.',
  });
}

function showConfirmationModal({ onConfirm, onCancel }) {
  modals.openConfirmModal({
    title: 'Import',
    children: (
      <Text size="sm">
        Would you like to import the contents of this file into the editor?
        All of your previous work will be lost.
      </Text>
    ),
    labels: {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
    onConfirm,
    onCancel,
  });
}
