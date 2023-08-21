import type { KanaMap } from '@/types';

const findKana = (map: KanaMap[], kana: string) => map.find((m) => m.kana === kana);

const containsExtras = (kana: string): boolean =>
  kana.includes('ッ') || kana.includes('っ') || kana.includes('ー');

const parseExtras = (map: KanaMap[], kana: string): string => {
  const hasSokuon = ['ッ', 'っ'].includes(kana.charAt(0));
  const hasChoonpu = kana.charAt(kana.length - 1) === 'ー';
  const strToMatch = kana.replace('ー', '').replace('ッ', '').replace('っ', '');
  const mapped = findKana(map, strToMatch);
  if (mapped) {
    const prepend = hasSokuon ? mapped.roumaji.slice(0, 1) : '';
    const append = hasChoonpu ? mapped.roumaji.slice(-1) : '';
    return prepend + mapped.roumaji + append;
  }
  return '';
};

export const parseKana = (map: KanaMap[], kana: string): string => {
  const mapped = findKana(map, kana);
  if (mapped) return mapped.roumaji;
  return '';
};

export const mapKana =
  (map: KanaMap[]) =>
  (kana: string): string => {
    if (containsExtras(kana)) {
      return parseExtras(map, kana);
    }
    return parseKana(map, kana);
  };
