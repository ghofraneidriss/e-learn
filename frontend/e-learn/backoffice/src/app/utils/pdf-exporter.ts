export class PdfExporter {
  private readonly lines: string[] = [];
  private readonly separators: string[] = [];

  setFontSize(size: number): void {
    this.lines.push(`FontSize: ${size}`);
  }

  text(value: string | string[], _x: number, _y: number): void {
    if (Array.isArray(value)) {
      this.lines.push(...value);
    } else {
      this.lines.push(value);
    }
  }

  splitTextToSize(input: string, maxLineLength: number): string[] {
    if (!input) {
      return [];
    }
    const tokens = input.split(' ');
    const output: string[] = [];
    let current = '';
    for (const token of tokens) {
      if ((current + ' ' + token).trim().length > maxLineLength && current) {
        output.push(current.trim());
        current = token;
      } else {
        current = `${current} ${token}`.trim();
      }
    }
    if (current) {
      output.push(current);
    }
    return output;
  }

  save(filename: string): void {
    const blob = new Blob([this.lines.join('\n')], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }
}
