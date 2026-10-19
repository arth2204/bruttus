param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot),
  [int]$Port = 8080
)
if (-not $Root) { $Root = (Split-Path -Parent $PSScriptRoot) }

$mime = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='application/javascript';
  '.json'='application/json'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg';
  '.webp'='image/webp'; '.svg'='image/svg+xml'; '.mp4'='video/mp4'; '.woff2'='font/woff2';
  '.woff'='font/woff'; '.ttf'='font/ttf'; '.ico'='image/x-icon'
}

$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
try {
  $l.Start()
} catch {
  $Port = 8081
  $l = New-Object System.Net.HttpListener
  $l.Prefixes.Add("http://localhost:$Port/")
  $l.Start()
}

$lrScript = @"
<script>
(function(){
  let last = null;
  setInterval(async function() {
    try {
      let r = await fetch('/__lr');
      let t = await r.text();
      if (last !== null && last !== t) { location.reload(); }
      last = t;
    } catch(e) {}
  }, 600);
})();
</script>
</body>
"@

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Servidor Live Reload - Bruttus Ferramentas     " -ForegroundColor Yellow
Write-Host "  Pasta: $Root" -ForegroundColor Gray
Write-Host "  Acesse: http://localhost:$Port/" -ForegroundColor Green
Write-Host "  -> O site atualiza sozinho ao salvar qualquer arquivo!" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

Start-Process "http://localhost:$Port/"

while ($l.IsListening) {
  $ctx = $l.GetContext()
  try {
    $p = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    
    if ($p -eq '__lr') {
      $max = (Get-ChildItem -Path $Root -Recurse -File -Exclude *.git* | Measure-Object -Property LastWriteTimeUtc -Maximum).Maximum.Ticks
      $bytes = [Text.Encoding]::UTF8.GetBytes("$max")
      $ctx.Response.ContentType = 'text/plain'
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      $ctx.Response.Close()
      continue
    }

    if ($ctx.Request.HttpMethod -eq 'POST' -and $p -match '^upload/([a-z0-9-]+\.png)$') {
      $name = $Matches[1]
      $body = (New-Object IO.StreamReader($ctx.Request.InputStream)).ReadToEnd()
      $b64 = $body.Substring($body.IndexOf(',') + 1)
      $dir = Join-Path $Root 'images\banners'
      New-Item -ItemType Directory -Force $dir | Out-Null
      [IO.File]::WriteAllBytes((Join-Path $dir $name), [Convert]::FromBase64String($b64))
      $ok = [Text.Encoding]::UTF8.GetBytes("saved $name")
      $ctx.Response.OutputStream.Write($ok, 0, $ok.Length)
      $ctx.Response.Close(); continue
    }

    if ($p -eq '' -or $p.EndsWith('/')) { $p += 'index.html' }
    $f = [IO.Path]::GetFullPath((Join-Path $Root $p))
    if ($f.StartsWith([IO.Path]::GetFullPath($Root)) -and (Test-Path $f -PathType Leaf)) {
      $ext = [IO.Path]::GetExtension($f).ToLower()
      $ctx.Response.ContentType = $(if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' })
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      
      if ($ext -eq '.html') {
        $html = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8)
        if ($html -match '</body>') {
          $html = $html -replace '</body>', $lrScript
        } else {
          $html += $lrScript
        }
        $b = [Text.Encoding]::UTF8.GetBytes($html)
      } else {
        $b = [IO.File]::ReadAllBytes($f)
      }
      
      $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    } else { $ctx.Response.StatusCode = 404 }
  } catch { $ctx.Response.StatusCode = 500 }
  $ctx.Response.Close()
}
