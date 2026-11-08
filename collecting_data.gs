/****************************************************
 * STAGE 1 — COLLECT DATA
 *
 * GOOGLE SHEET → GOOGLE SHEET
 *
 * TANPA GOOGLE SHEETS API
 * TANPA ADVANCED GOOGLE SERVICE
 *
 * METODE UTAMA:
 * Sheet.copyTo(destinationSpreadsheet)
 *
 * SPECIAL LOGIC:
 *
 * 3. Shopee Data Order
 *    Copy A:AX
 *    AY:BB = formula
 *
 * 4. Tiktok Tokped Data Order
 *    Copy A:BK
 *    BL:BP = formula
 *
 * 5. Xendit
 *    Copy A:W
 *    X = formula
 *
 * 10. Scraping Data
 *    Copy F:J
 ****************************************************/


/****************************************************
 * 1. CONFIG
 ****************************************************/

const CONFIG = {

  SOURCES: {

    SOP: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'SOP Rekon (WAJIB BACA)',
      targetSheet: 'SOP Rekon (WAJIB BACA)'
    },

    SKU_LIST_SHOPEE_NEW: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'List SKU - Shopee',
      targetSheet: 'SKU List Shopee New'
    },

    SKU_LIST: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Master SKU List',
      targetSheet: 'Master SKU List'
    },

    SHOPEE_DATA_ORDER: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Shopee',
      targetSheet: 'Shopee Data Order'
    },

    TIKTOK_DATA_ORDER: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Tiktok - Tokopedia',
      targetSheet: 'Tiktok Tokped Data Order'
    },

    SHOPEE_SETTLED: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Shopee - LG New',
      targetSheet: 'Shopee Settled New'
    },

    TIKTOK_SETTLED: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Tokopedia-TikTok',
      targetSheet: 'Tiktok Tokped Settled'
    },

    DETAIL_XENDIT: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Detail Xendit',
      targetSheet: 'Detail Xendit'
    },

    XENDIT: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Xendit',
      targetSheet: 'Xendit'
    },

   MAGENTO: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Magento',
      targetSheet: 'Magento'
    },

   DATA_TRACKER: {
      url: 'https://docs.google.com/spreadsheets/d/',
      sourceSheet: 'Data Tracker',
      targetSheet: 'Data Tracker'
    },

    SCRAPING_DATA: {
      url: 'https://docs.google.com/spreadsheets/d/9',
      sourceSheet: 'Scraping Data',
      targetSheet: 'Scraping Data'
    }

  }

};


/****************************************************
 * 2. MENU
 ****************************************************/

function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu('📥 Data Collection')

    .addItem(
      '🚀 Collect ALL Data',
      'collectAllData'
    )

    .addSeparator()

    .addItem(
      'SOP',
      'collectSOP'
    )

    .addItem(
      'SKU List Shopee New',
      'collectSKUListShopeeNew'
    )

    .addItem(
      'SKU List',
      'collectSKUList'
    )

    .addItem(
      'Shopee Data Order',
      'collectShopeeDataOrder'
    )

    .addItem(
      'Tiktok Tokped Data Order',
      'collectTiktokDataOrder'
    )

    .addItem(
      'Shopee Settled',
      'collectShopeeSettled'
    )

    .addItem(
      'Tiktok Tokped Settled',
      'collectTiktokSettled'
    )

    .addItem(
      'Detail Xendit',
      'collectDetailXendit'
    )

    .addItem(
      'Xendit',
      'collectXendit'
    )

    .addItem(
      'Scraping Data',
      'collectScrapingData'
    )

    .addToUi();

}


/****************************************************
 * 3. COLLECT ALL
 ****************************************************/

function collectAllData() {

  const ss =
    SpreadsheetApp.getActiveSpreadsheet();

  const results = [];


  ss.toast(
    'Mulai copy seluruh data...',
    'Data Collection',
    5
  );


  Object.keys(CONFIG.SOURCES).forEach(
    function(key) {

      const config =
        CONFIG.SOURCES[key];


      if (!config.url) {

        results.push(
          '⏭ ' +
          key +
          ' — URL belum diisi'
        );

        return;

      }


      try {

        collectSheet(config);

        results.push(
          '✅ ' +
          key
        );

      } catch (error) {

        results.push(
          '❌ ' +
          key +
          ' — ' +
          error.message
        );

        console.error(
          key +
          ' : ' +
          error.stack
        );

      }

    }
  );


  console.log(
    results.join('\n')
  );


  ss.toast(
    'Collect ALL selesai.',
    'Data Collection',
    8
  );

}


/****************************************************
 * 4. INDIVIDUAL FUNCTIONS
 ****************************************************/

function collectSOP() {
  collectSheet(CONFIG.SOURCES.SOP);
}


function collectSKUListShopeeNew() {
  collectSheet(CONFIG.SOURCES.SKU_LIST_SHOPEE_NEW);
}


function collectSKUList() {
  collectSheet(CONFIG.SOURCES.SKU_LIST);
}


function collectShopeeDataOrder() {
  collectSheet(CONFIG.SOURCES.SHOPEE_DATA_ORDER);
}


function collectTiktokDataOrder() {
  collectSheet(CONFIG.SOURCES.TIKTOK_DATA_ORDER);
}


function collectShopeeSettled() {
  collectSheet(CONFIG.SOURCES.SHOPEE_SETTLED);
}


function collectTiktokSettled() {
  collectSheet(CONFIG.SOURCES.TIKTOK_SETTLED);
}


function collectDetailXendit() {
  collectSheet(CONFIG.SOURCES.DETAIL_XENDIT);
}


function collectXendit() {
  collectSheet(CONFIG.SOURCES.XENDIT);
}


function collectScrapingData() {
  collectSheet(CONFIG.SOURCES.SCRAPING_DATA);
}


/****************************************************
 * 5. CORE FUNCTION
 ****************************************************/

function collectSheet(config) {

  if (!config) {

    throw new Error(
      'Config tidak ditemukan.'
    );

  }


  if (!config.url) {

    throw new Error(
      'URL source belum diisi untuk ' +
      config.sourceSheet
    );

  }


  const destinationSS =
    SpreadsheetApp.getActiveSpreadsheet();


  /**************************************************
   * SOURCE SPREADSHEET ID
   **************************************************/

  const sourceSpreadsheetId =
    extractSpreadsheetId(
      config.url
    );


  if (!sourceSpreadsheetId) {

    throw new Error(
      'Spreadsheet ID tidak ditemukan dari URL.'
    );

  }


  /**************************************************
   * OPEN SOURCE
   **************************************************/

  const sourceSS =
    SpreadsheetApp.openById(
      sourceSpreadsheetId
    );


  const sourceSheet =
    sourceSS.getSheetByName(
      config.sourceSheet
    );


  if (!sourceSheet) {

    throw new Error(
      'Sheet "' +
      config.sourceSheet +
      '" tidak ditemukan di source spreadsheet.'
    );

  }


  /**************************************************
   * HAPUS TARGET LAMA
   **************************************************/

  const oldTarget =
    destinationSS.getSheetByName(
      config.targetSheet
    );


  if (oldTarget) {

    destinationSS.deleteSheet(
      oldTarget
    );

  }


  /**************************************************
   * COPY WHOLE SHEET
   *
   * INI YANG MEMPERTAHANKAN VISUAL
   **************************************************/

  const copiedSheet =
    sourceSheet.copyTo(
      destinationSS
    );


  copiedSheet.setName(
    config.targetSheet
  );


  /**************************************************
   * SPECIAL LOGIC
   **************************************************/

  switch (config.sourceSheet) {

    case 'Shopee Data Order':

      processShopeeDataOrder(
        copiedSheet
      );

      break;


    case 'Tiktok Tokped Data Order':

      processTiktokDataOrder(
        copiedSheet
      );

      break;


    case 'Xendit':

      processXendit(
        copiedSheet
      );

      break;


    case 'Scraping Data':

      processScrapingData(
        copiedSheet
      );

      break;

  }


  SpreadsheetApp.flush();


  destinationSS.toast(
    '✅ ' +
    config.targetSheet +
    ' berhasil dicopy.',
    'Data Collection',
    5
  );

}


/****************************************************
 * 6. SHOPEE DATA ORDER
 *
 * COPY A:AX
 *
 * AY:
 * =ARRAYFORMULA(
 *   IF(
 *     A2:A="",
 *     "",
 *     IF(
 *       A2:A=OFFSET(A2:A,-1,0),
 *       0,
 *       -1*AC2:AC
 *     )
 *   )
 * )
 *
 * AZ:
 * =ARRAYFORMULA(
 *   IF(
 *     M2:M="",
 *     "",
 *     REGEXEXTRACT(M2:M,"^[^.]+")
 *   )
 * )
 *
 * BA:
 * =MONTH(J2)
 *
 * BB:
 * =MONTH(AX2)
 ****************************************************/

function processShopeeDataOrder(sheet) {

  const lastRow =
    Math.max(
      sheet.getLastRow(),
      2
    );


  /**************************************************
   * AY
   **************************************************/

  sheet
    .getRange('AY2')
    .setFormula(
      '=ARRAYFORMULA(IF(A2:A="","",IF(A2:A=OFFSET(A2:A,-1,0),0,-1*AC2:AC)))'
    );


  /**************************************************
   * AZ
   **************************************************/

  sheet
    .getRange('AZ2')
    .setFormula(
      '=ARRAYFORMULA(IF(M2:M="","",REGEXEXTRACT(M2:M,"^[^.]+")))'
    );


  /**************************************************
   * BA
   *
   * User requested:
   * =MONTH(J2)
   *
   * Dibuat ARRAYFORMULA supaya otomatis
   * ke bawah dan tidak perlu drag.
   **************************************************/

  sheet
    .getRange('BA2')
    .setFormula(
      '=ARRAYFORMULA(IF(J2:J="","",MONTH(J2:J)))'
    );


  /**************************************************
   * BB
   *
   * User requested:
   * =MONTH(AX2)
   *
   * Dibuat ARRAYFORMULA supaya otomatis
   * ke bawah.
   **************************************************/

  sheet
    .getRange('BB2')
    .setFormula(
      '=ARRAYFORMULA(IF(AX2:AX="","",MONTH(AX2:AX)))'
    );

}


/****************************************************
 * 7. TIKTOK TOKPED DATA ORDER
 *
 * COPY A:BK
 *
 * BL:
 * =ARRAYFORMULA(
 *   IF(
 *     G2:G="",
 *     "",
 *     REGEXEXTRACT(G2:G,"^[^.]+")
 *   )
 * )
 *
 * BM:
 * DATE parsing dari AD
 *
 * BN:
 * LEFT(AD2,2)
 *
 * BO:
 * MID(AD2,4,2)
 *
 * BP:
 * YEAR(BM2)
 ****************************************************/

function processTiktokDataOrder(sheet) {

  /**************************************************
   * BL
   **************************************************/

  sheet
    .getRange('BL2')
    .setFormula(
      '=ARRAYFORMULA(IF(G2:G="","",REGEXEXTRACT(G2:G,"^[^.]+")))'
    );


  /**************************************************
   * BM
   **************************************************/

  sheet
    .getRange('BM2')
    .setFormula(
      '=ARRAYFORMULA(IF(AD2:AD="","",DATE(VALUE(MID(AD2:AD,FIND("/",AD2:AD,FIND("/",AD2:AD)+1)+1,4)),VALUE(MID(AD2:AD,FIND("/",AD2:AD)+1,FIND("/",AD2:AD,FIND("/",AD2:AD)+1)-FIND("/",AD2:AD)-1)),VALUE(LEFT(AD2:AD,FIND("/",AD2:AD)-1)))))'
    );


  /**************************************************
   * BN
   **************************************************/

  sheet
    .getRange('BN2')
    .setFormula(
      '=ARRAYFORMULA(IF(AD2:AD="","",LEFT(AD2:AD,2)))'
    );


  /**************************************************
   * BO
   **************************************************/

  sheet
    .getRange('BO2')
    .setFormula(
      '=ARRAYFORMULA(IF(AD2:AD="","",MID(AD2:AD,4,2)))'
    );


  /**************************************************
   * BP
   **************************************************/

  sheet
    .getRange('BP2')
    .setFormula(
      '=ARRAYFORMULA(IF(BM2:BM="","",YEAR(BM2:BM)))'
    );

}


/****************************************************
 * 8. XENDIT
 *
 * COPY A:W
 *
 * X:
 *
 * =ARRAYFORMULA(
 *   IF(
 *     J2:J="CREDIT",
 *     RIGHT(F2:F,11),
 *     ""
 *   )
 * )
 ****************************************************/

function processXendit(sheet) {

  sheet
    .getRange('X2')
    .setFormula(
      '=ARRAYFORMULA(IF(J2:J="CREDIT",RIGHT(F2:F,11),""))'
    );

}


/****************************************************
 * 9. SCRAPING DATA
 *
 * COPY F:J
 *
 * Karena source sheet hasil copy sudah dibuat
 * secara utuh, bagian selain F:J akan dikosongkan.
 *
 * Jadi output akhirnya hanya mempertahankan:
 *
 * F
 * G
 * H
 * I
 * J
 ****************************************************/

function processScrapingData(sheet) {

  const maxColumns =
    sheet.getMaxColumns();


  const maxRows =
    sheet.getMaxRows();


  /**************************************************
   * HAPUS A:E
   **************************************************/

  if (maxColumns >= 1) {

    const columnsToClear =
      Math.min(
        5,
        maxColumns
      );


    sheet
      .getRange(
        1,
        1,
        maxRows,
        columnsToClear
      )
      .clearContent();

  }


  /**************************************************
   * HAPUS K DAN SETERUSNYA
   **************************************************/

  if (maxColumns > 10) {

    sheet
      .getRange(
        1,
        11,
        maxRows,
        maxColumns - 10
      )
      .clearContent();

  }

}


/****************************************************
 * 10. EXTRACT SPREADSHEET ID
 ****************************************************/

function extractSpreadsheetId(url) {

  const match =
    String(url).match(
      /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/
    );


  if (!match) {

    return null;

  }


  return match[1];

}
