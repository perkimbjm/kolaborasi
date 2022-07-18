<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Coordinates Search">
    <meta name="author" content="DPRKP Kota Banjarmasin">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <link href="img/logo.png" rel="shortcut icon" type="image/png">
    <title>Form Survei DED</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.43.0/L.Control.Locate.css">
    <link rel="stylesheet" href="css/fullscreen.css">
    <style>
      #map {
        width: 100%;
        height: 250px;
      }

      label.required::after {
        content: '*';
        color: red;
    }
    </style>
  </head>
  <body class="bg-dark">
    <div class="container mt-2 mb-2">
      <section class="content">
        <div class="row">
          <div class="col-12">
            <form name="survei">
              <div class="card shadow" id="datalokasiobjek">
                <div class="card-header">
                  <div class="alert alert-primary text-center">
                    <h2>SURVEI DED KAWASAN KUMUH</h2>Silahkan tambahkan data objek<hr>
                    <a href="map" class="btn btn-sm btn-primary" target="_blank"><i class="fas fa-map-marked-alt"></i> Peta</a> | <a href="#" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#infoModal"><i class="fas fa-info-circle"></i> Info</a>
                  </div>
                  <div class="alert alert-success alert-dismissible fade show d-none my-alert" role="alert">
                    Berhasil menyimpan data.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <div class="card-body overflow-auto">
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="nama" class="required"><strong>Nama Ruas / STA / Segmen </strong></label>
                        <input type="text" class="form-control text-primary" id="nama" name="nama" placeholder="STA/Ruas/Segmen cth:STA 0+00" value="" required>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="alamat"><strong>Alamat / Gang /  Jalan</strong></label>
                        <input type="text" class="form-control text-primary" id="alamat" name="alamat" placeholder="Alamat Ruas / Gang / Nama Jalan" value="">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="rt"><strong>RT</strong></label>
                        <input type="number" class="form-control text-primary" id="rt" name="rt" placeholder="Nomor RT" value="">
                      </div>
                    </div>
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="kelurahan"><strong>Kelurahan</strong></label>
                        <input type="text" class="form-control text-primary" id="kelurahan" name="kelurahan" placeholder="Isikan Nama Kelurahan" value="">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="eksisting"><strong>Jenis Jalan Eksisting</strong></label>
                        <select class="form-control select2" name="eksisting" id="eksisting">
                          <option value="cor-beton" selected>Cor Beton</option>
                          <option value="tanah-asli">Tanah Asli</option>
                          <option value="tanah-lepas">Tanah Lepas</option>
                          <option value="tanah-pemadatan">Tanah Dengan Pemadatan</option>
                          <option value="makadam">Makadam</option>
                          <option value="titian">Titian Ulin</option>
                          <option value="paving">Paving Block</option>
                          <option value="aspal">Aspal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="kerusakan" class="required"><strong>Jenis Kerusakan</strong></label>
                        <input type="text" class="form-control text-primary" id="kerusakan" name="kerusakan" placeholder="contoh: retak, banjir rob, titian putus, dsb" value="" required>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="rencana"><strong>Rencana Penanganan</strong></label>
                        <select class="form-control select2" name="rencana" id="rencana">
                          <option value="cor-beton" selected>Cor Beton</option>
                          <option value="titian">Perbaikan Titian Ulin</option>
                          <option value="titian-cor-beton">Perbaikan Titian Ulin + Cor Beton</option>
                          <option value="aspal">Aspal</option>
                          <option value="paving">Paving Block Total</option>                          
                          <option value="aspal">Rehab Paving Block</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <h6><strong>Perlu Gorong-gorong ?</strong></h6>
                        <input type="radio" id="gorong2_tidak" name="gorong2" value="tidak" checked>  
                        <label for="gorong2"> Tidak</label><br>
                        <input type="radio" id="gorong2_ya" name="gorong2" value="ya">  
                        <label for="gorong2"> Ya</label>                       
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <h6><strong>Perlu Drainase Lingkungan ?</strong></h6>
                        <input type="radio" id="drainase_tidak" name="drainase" value="tidak" checked>  
                        <label for="drainase"> Tidak</label><br>
                        <input type="radio" id="drainase_ya" name="drainase" value="ya">  
                        <label for="drainase"> Ya</label>                       
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="panjang"><strong>Panjang (m)</strong></label>
                        <input type="number" class="form-control text-primary" id="panjang" name="panjang" placeholder="Panjang Ruas" value="">
                      </div>
                    </div>
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="lebar"><strong>Lebar rata-rata (m)</strong></label>
                        <input type="number" class="form-control text-primary" id="lebar" name="lebar" placeholder="Lebar Ruas" value="">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <h6><strong>Titik Ambil Koordinat</strong></h6>
                        <input type="radio" id="titik_pangkal" name="titik" value="pangkal" checked>  
                        <label for="titik"> Pangkal/ Awal / Tengah Jalan</label><br>
                        <input type="radio" id="titik_ujung" name="titik" value="ujung">  
                        <label for="titik"> Ujung Jalan</label>                       
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="latitude"><strong>Koordinat Lintang</strong></label>
                        <input type="text" class="form-control text-primary" id="latitude" name="latitude" placeholder="Latitude" value="">
                      </div>
                    </div>
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="longitude"><strong>Koordinat Bujur</strong></label>
                        <input type="text" class="form-control text-primary" id="longitude" name="longitude" placeholder="Longitude" value="">
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label><strong>&nbsp;</strong></label><br>
                        <a href="#" type="button" class="btn btn-danger btn-block" id="mapbutton" onclick="mapCenter()"><i class="fas fa-search-location"></i> Cari</a>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class="card p-1 mb-3" id="mapcoordinate">
                    <div id="map"></div>              
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="karakteristik"><strong>Karakteristik Jalan</strong></label>
                        <select class="form-control select2" name="karakteristik" id="karakteristik">
                          <option value="">Silahkan Pilih</option>
                          <option value="7">Jalan Utama</option>
                          <option value="6">Jalan Tembus</option>
                          <option value="5">Jalan Menuju Sekolah</option>
                          <option value="4">Jalan Menuju Fasum (mushola, wc umum, puskesmas, dsb)</option>
                          <option value="3">Jalan Menuju Alkah</option>
                          <option value="2">Jalan Menuju Sungai</option>
                          <option value="1">Jalan Buntu</option>
                        </select>
                      </div>
                    </div>
                </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="pengusul"><strong>Nama / Jabatan Warga yang Mengusulkan (Memberi Informasi)</strong></label>
                        <input type="text" class="form-control text-primary" id="pengusul" name="pengusul" placeholder="Kosongkan jika bukan usulan warga" value="">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="pm"><strong>Jumlah Penerima Manfaat (rumah)</strong></label>
                        <input type="number" class="form-control text-primary" id="pm" name="pm" placeholder="Asumsi Jumlah Rumah di Area Tersebut" value="">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="catatan"><strong>Catatan Khusus</strong></label>
                        <input type="text-area" class="form-control text-primary" id="catatan" name="catatan" placeholder="" value="">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-group">
                        <label for="surveyor" class="required"><strong>Nama Surveyor</strong></label>
                        <input type="text" class="form-control text-primary" id="surveyor" name="surveyor" placeholder="" value="" required>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="card-footer text-right">
                  <button type="submit" class="btn btn-primary btn-simpan" id="btnSave"><i class="fas fa-save"></i> Simpan</button>
                  <div class="mt-3 mb-3 text-left">Developed by DPRKP Banjarmasin</div>
                  <br>
                  <button class="btn btn-primary btn-loading d-none" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>

    <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header alert-info">
            <h5 class="modal-title" id="exampleModalCenterTitle"><i class="fas fa-info-circle"></i> Info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-sm">
              <tr>
                <td>Aktifkan Layanan Lokasi di Perangkat Anda </td>
              </tr>
              <tr>

              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.full.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-hash/0.2.1/leaflet-hash.min.js"></script>
    <script src="https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.43.0/L.Control.Locate.min.js"></script>
    <script src="js/L.Control.Fullscreen.min.js"></script>    
    
    <script src="app.js"></script>

    <script type="text/javascript">        
        if (window.location.protocol != "https:") {
           window.location.protocol = "https";
        }
    </script>
  </body>
</html>

