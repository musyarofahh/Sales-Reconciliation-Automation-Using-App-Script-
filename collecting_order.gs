function gabungkanDataPenjualan() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetTujuan = ss.getSheetByName("MASTER DATA"); // Sesuaikan nama sheet tujuan kamu

  var daftarTanggal = ["1", "2", "3", "4", "5", "6" , "7" , "8", "9" , "10", "11", "12", "13", "14", "15", "16" , "17" , "18", "19" , "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]; 
  var semuaData = [];

  Logger.log("=== RINCIAN JUMLAH DATA PER TANGGAL ===");

  daftarTanggal.forEach(function(tgl) {
    var namaSheet = "tgl " + tgl; // Sesuaikan format nama sheet ("tgl 13" / "Tgl 13" / "13")
    var sheetSumber = ss.getSheetByName(namaSheet);
    
    if (sheetSumber) {
      var lastRow = sheetSumber.getLastRow();
      
      if (lastRow < 2) {
        Logger.log("Tanggal " + tgl + ": 0 baris (Sheet Kosong)");
        return;
      }

      var kolomB = sheetSumber.getRange(1, 2, lastRow, 1).getValues(); 
      var startRowIndex = -1;

      // Cari baris pertama yang berisi data (mulai cek dari baris 4 ke bawah)
      for (var r = 0; r < kolomB.length; r++) {
        var val = kolomB[r][0];
        if (val !== "" && val !== null) {
          if (r + 1 >= 3) { 
            startRowIndex = r + 1; // Ketemu baris awal data (baris 3 atau 4)
            break;
          }
        }
      }

      if (startRowIndex !== -1 && startRowIndex <= lastRow) {
        var jumlahBaris = lastRow - startRowIndex + 1;
        
        // Ambil data dari kolom B (2) sebanyak 23 kolom (B sampai X)
        var data = sheetSumber.getRange(startRowIndex, 2, jumlahBaris, 23).getValues();
        
        for (var i = 0; i < data.length; i++) {
          semuaData.push(data[i]);
        }

        // Tampilkan jumlah data per tanggal di Log
        Logger.log("Tanggal " + tgl + ": " + jumlahBaris + " baris data (mulai dari baris " + startRowIndex + ")");
      } else {
        Logger.log("Tanggal " + tgl + ": 0 baris data");
      }
    } else {
      Logger.log("Sheet '" + namaSheet + "' TIDAK DITEMUKAN!");
    }
  });

  Logger.log("---------------------------------------");
  Logger.log("TOTAL KESELURUHAN DATA: " + semuaData.length + " baris");

  // Tempel ke sheet tujuan mulai dari B5
  if (semuaData.length > 0) {
    sheetTujuan.getRange(5, 2, semuaData.length, semuaData[0].length).setValues(semuaData);
  }
}
