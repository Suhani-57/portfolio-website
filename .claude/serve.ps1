param([int]$port = 5173)
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8";
  ".webp"="image/webp"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".gif"="image/gif";
  ".svg"="image/svg+xml"; ".ttf"="font/ttf"; ".otf"="font/otf"; ".woff"="font/woff"; ".woff2"="font/woff2"; ".ico"="image/x-icon"
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "listening on http://localhost:$port/"
while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq "") { $rel = "index.html" }
    $path = Join-Path $root ($rel -replace '/', '\')
    if (Test-Path -LiteralPath $path -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ct = $mime[$ext]; if (-not $ct) { $ct = "application/octet-stream" }
      $ctx.Response.ContentType = $ct
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Output "200 /$rel"
    } else {
      $ctx.Response.StatusCode = 404
      Write-Output "404 /$rel"
    }
    $ctx.Response.OutputStream.Close()
  } catch { Write-Output ("ERR " + $_.Exception.Message) }
}
