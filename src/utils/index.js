export const noop = () => {};

export const getBase64 = file => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = resolve;
    reader.onerror = reject;
  })
);
