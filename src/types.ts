export interface KanaMap {
  kana: string;
  roumaji: string;
  type: string;
}

export interface KanaEntry {
  translation: string;
  kana: Array<string>;
  kanji?: string;
}

export interface KanaEntryWithRoumaji extends KanaEntry {
  roumaji: Array<string>;
}
