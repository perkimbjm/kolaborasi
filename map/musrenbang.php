<?php
$googleSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIe0YF5z56BRsUj2tPdeNPqEiqx7J83iP4Q8_Es6W03MjRu-3Q9qZwBWlj9qJoNHpflEHjiMqVfDTA/pub?output=csv";
$rowCount = 0;
$features = array();
$error = FALSE;
$output = array();

// attempt to set the socket timeout, if it fails then echo an error
if ( ! ini_set('default_socket_timeout', 15))
{
  $output = array('error' => 'Unable to Change PHP Socket Timeout');
  $error = TRUE;
} // end if, set socket timeout

// if the opening the CSV file handler does not fail
if ( !$error && (($handle = fopen($googleSpreadsheetUrl, "r")) !== FALSE) )
{
  // while CSV has data, read up to 1000 rows
  while (($csvRow = fgetcsv($handle, 1000, ",")) !== FALSE)
  {
    $rowCount++;

    if ($rowCount == 1) { continue; } // skip the first/header row of the CSV

    $features[] = array(
      'type'     => 'Feature',
      'geometry' => array(
        'type'   => 'Point',
        'coordinates' => array(
          (float) $csvRow[10], // longitude, casted to type float
          (float) $csvRow[9]  // latitude, casted to type float
        )
      ),
      'properties' => array(
        'nama' => $csvRow[1],
        'alamat' => $csvRow[2],
        'rt' => $csvRow[3],
        'kelurahan' => $csvRow[4],
        'kerusakan' => $csvRow[6],
        'catatan' => $csvRow[14],
        'status' => $csvRow[15],
        'tinjauan' => $csvRow[16],
        'surveyor' => $csvRow[17],
      )
    );
  } // end while, loop through CSV data

  fclose($handle); // close the CSV file handler

  $output = array(
    'type' => 'FeatureCollection',
    'features' => $features
  );
}  // end if , read file handler opened

// else, file didn't open for reading
else
{
  $output = array('error' => 'Problem Reading Google CSV');
}  // end else, file open fail

// convert the PHP output array to JSON "pretty" format
$jsonOutput = json_encode($output, JSON_PRETTY_PRINT);

// render JSON and no cache headers
header('Content-type: application/json; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Access-Control-Allow-Origin: *');

print $jsonOutput;

?>