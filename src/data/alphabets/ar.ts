export interface AnchorWord {
  text: string
  meaning: string
}

export interface AlphabetLetter {
  letter: string
  nameSimple: string   // For TTS
  romanized: string
  anchorWords: AnchorWord[]
}

export const arAlphabet: AlphabetLetter[] = [
  { letter: 'ا', nameSimple: 'ألف',  romanized: 'alif',  anchorWords: [{ text: 'أُمّ',    meaning: 'mother'   }, { text: 'أَب',     meaning: 'father'   }] },
  { letter: 'ب', nameSimple: 'باء',  romanized: 'ba',    anchorWords: [{ text: 'بَيت',   meaning: 'house'    }, { text: 'بَاب',    meaning: 'door'     }] },
  { letter: 'ت', nameSimple: 'تاء',  romanized: 'ta',    anchorWords: [{ text: 'تُفَّاح', meaning: 'apple'    }, { text: 'تَمر',    meaning: 'dates'    }] },
  { letter: 'ث', nameSimple: 'ثاء',  romanized: 'tha',   anchorWords: [{ text: 'ثَلج',   meaning: 'snow'     }, { text: 'ثَعلَب',  meaning: 'fox'      }] },
  { letter: 'ج', nameSimple: 'جيم',  romanized: 'jeem',  anchorWords: [{ text: 'جَمَل',  meaning: 'camel'    }, { text: 'جَبَل',   meaning: 'mountain' }] },
  { letter: 'ح', nameSimple: 'حاء',  romanized: 'ha',    anchorWords: [{ text: 'حَصَان', meaning: 'horse'    }, { text: 'حَلِيب',  meaning: 'milk'     }] },
  { letter: 'خ', nameSimple: 'خاء',  romanized: 'kha',   anchorWords: [{ text: 'خُبز',   meaning: 'bread'    }, { text: 'خَروف',   meaning: 'sheep'    }] },
  { letter: 'د', nameSimple: 'دال',  romanized: 'dal',   anchorWords: [{ text: 'دَجَاج', meaning: 'chicken'  }, { text: 'دَار',    meaning: 'home'     }] },
  { letter: 'ذ', nameSimple: 'ذال',  romanized: 'dhal',  anchorWords: [{ text: 'ذَهَب',  meaning: 'gold'     }, { text: 'ذِئب',    meaning: 'wolf'     }] },
  { letter: 'ر', nameSimple: 'راء',  romanized: 'ra',    anchorWords: [{ text: 'رَجُل',  meaning: 'man'      }, { text: 'رَأس',    meaning: 'head'     }] },
  { letter: 'ز', nameSimple: 'زاي',  romanized: 'zay',   anchorWords: [{ text: 'زَيت',   meaning: 'oil'      }, { text: 'زَهرَة',  meaning: 'flower'   }] },
  { letter: 'س', nameSimple: 'سين',  romanized: 'seen',  anchorWords: [{ text: 'سَمَك',  meaning: 'fish'     }, { text: 'سَيَّارَة', meaning: 'car'    }] },
  { letter: 'ش', nameSimple: 'شين',  romanized: 'sheen', anchorWords: [{ text: 'شَمس',   meaning: 'sun'      }, { text: 'شَجَرَة', meaning: 'tree'     }] },
  { letter: 'ص', nameSimple: 'صاد',  romanized: 'sad',   anchorWords: [{ text: 'صَدِيق', meaning: 'friend'   }, { text: 'صَابُون', meaning: 'soap'     }] },
  { letter: 'ض', nameSimple: 'ضاد',  romanized: 'dad',   anchorWords: [{ text: 'ضَيف',   meaning: 'guest'    }, { text: 'ضِفدَع',  meaning: 'frog'     }] },
  { letter: 'ط', nameSimple: 'طاء',  romanized: 'ta',    anchorWords: [{ text: 'طَائِر', meaning: 'bird'     }, { text: 'طِفل',    meaning: 'child'    }] },
  { letter: 'ظ', nameSimple: 'ظاء',  romanized: 'dha',   anchorWords: [{ text: 'ظِل',    meaning: 'shadow'   }, { text: 'ظَبي',    meaning: 'gazelle'  }] },
  { letter: 'ع', nameSimple: 'عين',  romanized: 'ain',   anchorWords: [{ text: 'عَين',   meaning: 'eye'      }, { text: 'عَصِير',  meaning: 'juice'    }] },
  { letter: 'غ', nameSimple: 'غين',  romanized: 'ghain', anchorWords: [{ text: 'غَيمَة', meaning: 'cloud'    }, { text: 'غُرفَة',  meaning: 'room'     }] },
  { letter: 'ف', nameSimple: 'فاء',  romanized: 'fa',    anchorWords: [{ text: 'فَم',    meaning: 'mouth'    }, { text: 'فِيل',    meaning: 'elephant' }] },
  { letter: 'ق', nameSimple: 'قاف',  romanized: 'qaf',   anchorWords: [{ text: 'قَلب',   meaning: 'heart'    }, { text: 'قَمَر',   meaning: 'moon'     }] },
  { letter: 'ك', nameSimple: 'كاف',  romanized: 'kaf',   anchorWords: [{ text: 'كِتَاب', meaning: 'book'     }, { text: 'كَلب',    meaning: 'dog'      }] },
  { letter: 'ل', nameSimple: 'لام',  romanized: 'lam',   anchorWords: [{ text: 'لَيمُون', meaning: 'lemon'   }, { text: 'لَبَن',   meaning: 'yogurt'   }] },
  { letter: 'م', nameSimple: 'ميم',  romanized: 'meem',  anchorWords: [{ text: 'مَاء',   meaning: 'water'    }, { text: 'مَدرَسَة', meaning: 'school'  }] },
  { letter: 'ن', nameSimple: 'نون',  romanized: 'noon',  anchorWords: [{ text: 'نَجمَة', meaning: 'star'     }, { text: 'نَهر',    meaning: 'river'    }] },
  { letter: 'ه', nameSimple: 'هاء',  romanized: 'ha',    anchorWords: [{ text: 'هَوَاء', meaning: 'air'      }, { text: 'هِلَال',  meaning: 'crescent' }] },
  { letter: 'و', nameSimple: 'واو',  romanized: 'waw',   anchorWords: [{ text: 'وَردَة', meaning: 'rose'     }, { text: 'وَلَد',   meaning: 'boy'      }] },
  { letter: 'ي', nameSimple: 'ياء',  romanized: 'ya',    anchorWords: [{ text: 'يَد',    meaning: 'hand'     }, { text: 'يَوم',    meaning: 'day'      }] },
]
