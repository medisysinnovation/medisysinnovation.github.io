// https://juejin.im/post/6844904129513422862

export const downloadFile = (content: any, fileName: string) => {
  const blob = new Blob([content], {
    type: 'application/octet-stream',
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};
