<head>

<h1 align='center'>Difference Finder</h1>

[![Tests](https://github.com/Skryam/Project_2/actions/workflows/main.yml/badge.svg)](https://github.com/Skryam/Project_2/actions/workflows/main.yml)
<a href="https://codeclimate.com/github/Skryam/Project_2/maintainability"><img src="https://api.codeclimate.com/v1/badges/81607be88b0d0eedcf2a/maintainability" /></a>
<a href="https://codeclimate.com/github/Skryam/Project_2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/81607be88b0d0eedcf2a/test_coverage" /></a>

<h3 align="left">Difference Finder is a command-line tool for finding differences between two files in JSON or YAML format.<br>It outputs the differences in three different formats: stylish, plain, and JSON.</h3>
</head>
<body>
 <h2 aling="left">Requirements</h2>
   <ul>
     <li>Git</li>
     <li>Node.js</li>
   </ul>

   <h2 aling="left">installation</h2>
<p>1. Clone this repository:<br><strong>git clone https://github.com/Skryam/Project_2.git</strong></p>
<p>2. Navigate to the project directory:<br><strong>cd Difference Finder</strong></p>
<p>3. Install dependencies:<br><strong>npm install</strong></p>
<p>4. Make link:<br><strong>npm link</strong></p>

<h2 aling="left">Formats</h2>
<ul>
     <li><strong>Stylish:</strong> Shows differences in a human-readable format with indentation and color highlighting.
</li>
     <li><strong>Plain:</strong> Shows differences in a plain text format without any additional formatting.</li>
     <li><strong>JSON:</strong> Outputs differences in JSON format.</li>
   </ul>

<h2 aling="left">Formats</h2>
<p>Difference Finder can be used from the command line as follows:<br><strong>gendiff &ltpath-to-file1&gt &ltpath-to-file2&gt [format]</strong></p>
<p>Replace <strong>&ltpath-to-file1&gt</strong> and <strong>&ltpath-to-file2&gt</strong> with the paths to your JSON or YAML files. Optionally, you can specify the output format (stylish, plain, or json). If no format is provided, the default format is stylish.

<h2 aling="left">Examples</h2>

<h3>Differences between two JSON files in stylish format</h3>

[![asciicast](https://asciinema.org/a/4tc2JhHjnMylwXMqMUHW0jKjp.svg)](https://asciinema.org/a/4tc2JhHjnMylwXMqMUHW0jKjp)

<h3>Differences between two YAML files in stylish format</h3>

[![asciicast](https://asciinema.org/a/xwB0JuE2RpCiFAzyzoOv8rlUU.svg)](https://asciinema.org/a/xwB0JuE2RpCiFAzyzoOv8rlUU)

<h3>Differences between two deep JSON and YAML files in stylish format</h3>

[![asciicast](https://asciinema.org/a/zVAEGnze6rqLlsrAY4UwxphzK.svg)](https://asciinema.org/a/zVAEGnze6rqLlsrAY4UwxphzK)

<h3>Differences between two deep JSON and YAML files in plain format</h3>

[![asciicast](https://asciinema.org/a/bm9lLwznyAqkx0EPQvubgxPnv.svg)](https://asciinema.org/a/bm9lLwznyAqkx0EPQvubgxPnv)

<h3>Differences between two deep JSON files in JSON format</h3>

[![asciicast](https://asciinema.org/a/kppyZjhbLebVkFu0SGwlAW1Sn.svg)](https://asciinema.org/a/kppyZjhbLebVkFu0SGwlAW1Sn)