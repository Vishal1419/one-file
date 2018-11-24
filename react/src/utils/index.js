export const noop = () => {};

export const getBase64 = file => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = resolve;
    reader.onerror = reject;
  })
);

export const crypto = {
  'A': 'E', 'B': 'X', 'C': 'W', 'D': 'T', 'E': '0', 'F': 'R', 'G': 'S', 
  'H': 'U', 'I': 'P', 'J': 'G', 'K': 'I', 'L': '2', 'M': '3', 'N': 'A', 
  'O': 'K', 'P': '4', 'Q': 'Y', 'R': '5', 'S': 'Z', 'T': '6', 'U': 'C', 
  'V': 'J', 'W': '7', 'X': 'O', 'Y': '9', 'Z': 'V',
  '1': 'B', '2': 'H', '3': '8', '4': 'Q', '5': 'M', '6': 'D', '7': '1', 
  '8': 'N', '9': 'F', '0': 'L' 
};
