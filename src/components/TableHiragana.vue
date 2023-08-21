<template>
  <div class="flex flex-col lg:flex-row items-start gap-1 lg:gap-6">
    <div class="-m-1">
      <table class="table-fixed w-full border-separate border-spacing-1 text-sm">
        <thead>
          <tr>
            <th v-for="cell of header">{{ cell }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[title, cells] of monographs">
            <td>{{ title }}</td>
            <td v-for="cell of cells">
              <div v-if="cell.length">{{ katakana ? cell[2] : cell[1] }}</div>
              <div v-if="cell.length">{{ cell[0] }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="-m-1">
      <table class="table-fixed w-full border-separate border-spacing-1 text-sm">
        <thead>
          <tr>
            <th v-for="cell of header">{{ cell }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[title, cells] of diacritics">
            <td>{{ title }}</td>
            <td v-for="cell of cells">
              <div v-if="cell.length">{{ katakana ? cell[2] : cell[1] }}</div>
              <div v-if="cell.length">{{ cell[0] }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    katakana: boolean;
  }>(),
  { katakana: false }
);
const header = ['', 'a', 'i', 'u', 'e', 'o', 'ya', 'yu', 'yo'];

const monographs = [
  [
    'k',
    [
      ['ka', 'か', 'カ'],
      ['ki', 'き', 'キ'],
      ['ku', 'く', 'ク'],
      ['ke', 'け', 'ケ'],
      ['ko', 'こ', 'コ'],
      ['kya', 'きゃ', 'キャ'],
      ['kyu', 'きゅ', 'キュ'],
      ['kyo', 'きょ', 'キョ']
    ]
  ],
  [
    's',
    [
      ['sa', 'さ', 'サ'],
      ['shi', 'し', 'シ'],
      ['su', 'す', 'ス'],
      ['se', 'せ', 'セ'],
      ['so', 'そ', 'ソ'],
      ['sha', 'しゃ', 'シャ'],
      ['shu', 'しゅ', 'シュ'],
      ['sho', 'しょ', 'ショ']
    ]
  ],
  [
    't',
    [
      ['ta', 'た', 'タ'],
      ['chi', 'ち', 'チ'],
      ['tsu', 'つ', 'ツ'],
      ['te', 'て', 'テ'],
      ['to', 'と', 'ト'],
      ['cha', 'ちゃ', 'チャ'],
      ['chu', 'ちゅ', 'チュ'],
      ['cho', 'ちょ', 'チョ']
    ]
  ],
  [
    'n',
    [
      ['na', 'な', 'ナ'],
      ['ni', 'に', 'ニ'],
      ['nu', 'ぬ', 'ヌ'],
      ['ne', 'ね', 'ネ'],
      ['no', 'の', 'ノ'],
      ['nya', 'にゃ', 'ニャ'],
      ['nyu', 'にゅ', 'ニュ'],
      ['nyo', 'にょ', 'ニョ']
    ]
  ],
  [
    'h',
    [
      ['ha', 'は', 'ハ'],
      ['hi', 'ひ', 'ヒ'],
      ['fu', 'ふ', 'フ'],
      ['he', 'へ', 'ヘ'],
      ['ho', 'ほ', 'ホ'],
      ['hya', 'ひゃ', 'ヒャ'],
      ['hyu', 'ひゅ', 'ヒュ'],
      ['hyo', 'ひょ', 'ヒョ']
    ]
  ],
  [
    'm',
    [
      ['ma', 'ま', 'マ'],
      ['mi', 'み', 'ミ'],
      ['mu', 'む', 'ム'],
      ['me', 'め', 'メ'],
      ['mo', 'も', 'モ'],
      ['mya', 'みゃ', 'ミャ'],
      ['myu', 'みゅ', 'ミュ'],
      ['myo', 'みょ', 'ミョ']
    ]
  ],
  ['y', [['ya', 'や', 'ヤ'], [], ['yu', 'ゆ', 'ユ'], [], ['yo', 'よ', 'ヨ'], [], [], []]],
  [
    'r',
    [
      ['ra', 'ら', 'ラ'],
      ['ri', 'り', 'リ'],
      ['ru', 'る', 'ル'],
      ['re', 'れ', 'レ'],
      ['ro', 'ろ', 'ロ'],
      ['rya', 'りゃ', 'リャ'],
      ['ryu', 'りゅ', 'リュ'],
      ['ryo', 'りょ', 'リョ']
    ]
  ],

  ['w/n', [['wa', 'わ', 'ワ'], [], ['n', 'ん', 'ン'], [], ['wo', 'を', 'ヲ'], [], [], []]]
];

const diacritics = [
  [
    'g',
    [
      ['ga', 'が', 'ガ'],
      ['gi', 'ぎ', 'ギ'],
      ['gu', 'ぐ', 'グ'],
      ['ge', 'げ', 'ゲ'],
      ['go', 'ご', 'ゴ'],
      ['gya', 'ぎゃ', 'ギャ'],
      ['gyu', 'ぎゅ', 'ギュ'],
      ['gyo', 'ぎょ', 'ギョ']
    ]
  ],
  [
    'z',
    [
      ['za', 'ざ', 'ザ'],
      ['ji', 'じ', 'ジ'],
      ['zu', 'ず', 'ズ'],
      ['ze', 'ぜ', 'ゼ'],
      ['zo', 'ぞ', 'ゾ'],
      ['ja', 'じゃ', 'ジャ'],
      ['ju', 'じゅ', 'ジュ'],
      ['jo', 'じゅ', 'ジュ']
    ]
  ],
  [
    'd',
    [
      ['da', 'だ', 'ダ'],
      ['ji', 'ぢ', 'ヂ'],
      ['zu', 'づ', 'ヅ'],
      ['de', 'で', 'デ'],
      ['do', 'ど', 'ド'],
      ['ja', 'ぢゃ', 'ヂャ'],
      ['ju', 'ぢゅ', 'ヂュ'],
      ['jo', 'ぢょ', 'ヂョ']
    ]
  ],
  [
    'b',
    [
      ['ba', 'ば', 'バ'],
      ['bi', 'び', 'ビ'],
      ['bu', 'ぶ', 'ブ'],
      ['be', 'べ', 'ベ'],
      ['bo', 'ぼ', 'ボ'],
      ['bya', 'びゃ', 'ビャ'],
      ['byu', 'びゅ', 'ビュ'],
      ['byo', 'びょ', 'ビョ']
    ]
  ],
  [
    'p',
    [
      ['pa', 'ぱ', 'パ'],
      ['pi', 'ぴ', 'ピ'],
      ['pu', 'ぷ', 'プ'],
      ['pe', 'ぺ', 'ペ'],
      ['po', 'ぽ', 'ポ'],
      ['pya', 'ぴゃ', 'ピャ'],
      ['pyu', 'ぴゅ', 'ピュ'],
      ['pyo', 'ぴょ', 'ピョ']
    ]
  ]
];
</script>

<style lang="postcss" scoped>
th,
td {
  @apply font-normal p-2 text-center rounded;
  @apply bg-gray-200 dark:bg-gray-800 text-gray-500;
}

th:empty,
td:empty {
  @apply bg-gray-100 dark:bg-gray-900;
}

td > div:first-child {
  @apply text-base lg:text-xl font-light text-black dark:text-white;
}
</style>
