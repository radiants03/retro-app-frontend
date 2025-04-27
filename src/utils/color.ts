export const ColorPalette = (length: number) => {
  const customRgb = [
    "rgb(32, 113, 228)",
    "rgb(228, 32, 130)",
    "rgb(22, 167, 60)",
    "rgb(28, 164, 188)",
  ];

  const arr = Array.from({ length: length }, (_, i) => {
    const r = Math.floor((Math.sin(i) * 127 + 128) % 256);
    const g = Math.floor((Math.sin(i + 2) * 127 + 128) % 256);
    const b = Math.floor((Math.sin(i + 4) * 127 + 128) % 256);

    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (brightness > 128) {
      const factor = 0.6;
      return `rgb(${Math.floor(r * factor)}, ${Math.floor(
        g * factor
      )}, ${Math.floor(b * factor)})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  });

  arr.forEach((item) => customRgb.push(item));

  return customRgb;
};

export const DarkerColor = (rgb: string, amount: number) => {
  if (rgb && amount) {
    const cleanedRgb = rgb.trim();

    if (!/^rgb\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)$/.test(cleanedRgb)) {
      throw new Error("Invalid RGB color format");
    }

    let [r, g, b] = cleanedRgb
      .replace(/[^\d,]/g, "")
      .split(",")
      .map(Number);

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return `rgb(${r}, ${g}, ${b})`;
  }
};
