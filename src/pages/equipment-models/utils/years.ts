export const modelYearsString = {
  create: (years?: number[]): string => {
    if (!years || years?.length === 0) {
      return '';
    }

    const sorted = [...years].sort((a, b) => a - b);

    const start = sorted[0];
    const end = sorted[sorted.length - 1];

    const ranges: [number, number][] = [[start, start]];

    let rangeIndex = 0;

    for (let i = 1; i < sorted.length; i++) {
      const item = sorted[i];
      const prevItem = sorted[i - 1];

      if (item - prevItem === 1) {
        ranges[rangeIndex][1] = item;
        continue;
      }

      ranges.push([item, item]);
      rangeIndex++;
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
