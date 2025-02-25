export const modelYearsString = {
  create: (years?: number[]): string => {
    if (!years || years?.length === 0) {
      return '';
    }

    const sorted = [...years].sort((a, b) => a - b);

    const ranges: [number, number][] = [];

    let start = sorted[0];
    let end = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] - sorted[i - 1] === 1) {
        end = sorted[i];
      } else {
        ranges.push([start, end]);
        start = sorted[i];
        end = sorted[i];
      }
    }

    if (ranges.length === 0) {
      ranges.push([start, end]);
    }

    return ranges
      .map(([start, end]) => {
        if (start === end) {
          return start.toString();
        }

        return `${start} - ${end}`;
      })
      .join(', ');
  },

  parse: (years: string): number[] => {
    const ranges = years.split(',').map((range) => range.trim());

    return ranges.flatMap((range) => {
      const [start, end] = range.split('-').map((year) => Number(year.trim()));

      if (end) {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }

      return [start];
    });
  },
};
