# scripts/backup.ps1
# Backup/restore manual de la base de datos (local o remota).
#
# Uso:
#   .\scripts\backup.ps1 dump                                  # dump usando DATABASE_URL del entorno
#   .\scripts\backup.ps1 dump -DatabaseUrl "<connection>"      # dump con URL explícita
#   .\scripts\backup.ps1 restore -File backup.sql.gz           # restaurar (destructivo en el destino)
#
# Requiere: pg_dump / pg_restore / psql (PostgreSQL client).

param(
  [Parameter(Position = 0)]
  [ValidateSet("dump", "restore")]
  [string]$Mode = "dump",

  [string]$DatabaseUrl = $null,

  [string]$BackupDir = "backups",

  [string]$File = ""
)

$ErrorActionPreference = "Stop"

if (-not $DatabaseUrl) {
  $DatabaseUrl = $env:DATABASE_URL
  if (-not $DatabaseUrl) {
    Write-Error "No se encontró DATABASE_URL. Pásalo con -DatabaseUrl o define la variable de entorno."
    exit 1
  }
}

if (-not (Test-Path $BackupDir)) {
  New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

function Get-Bin {
  param([string]$Name)
  $cmd = Get-Command $Name -ErrorAction SilentlyContinue
  if (-not $cmd) {
    Write-Error "No se encontró '$Name'. Instala PostgreSQL client tools."
    exit 1
  }
  return $cmd.Source
}

$pgDump = Get-Bin "pg_dump"
$psql = Get-Bin "psql"

if ($Mode -eq "dump") {
  $ts = Get-Date -Format "yyyy-MM-ddTHHmmssZ"
  $file = Join-Path $BackupDir "portfolio-$ts.sql.gz"
  Write-Host "🚀 Dumping a $file ..."
  & $pgDump $DatabaseUrl --no-owner --no-acl -Z 9 -f $file
  Write-Host "✅ Backup creado: $file"
}
elseif ($Mode -eq "restore") {
  if (-not $File) {
    Write-Error "Indica el archivo a restaurar: .\scripts\backup.ps1 restore -File backups\dump-xxxx.sql.gz"
    exit 1
  }
  if (-not (Test-Path $File)) {
    Write-Error "No existe el archivo: $File"
    exit 1
  }

  Write-Host "⚠️  Esto SOBRESCRIBIRÁ los datos del destino: $DatabaseUrl"
  $confirm = Read-Host "Escribe 'SI' para continuar"
  if ($confirm -ne "SI") {
    Write-Host "❌ Cancelado."
    exit 1
  }

  $plain = $File
  if ($File -like "*.gz") {
    Write-Host "🚀 Restaurando $File ..."
    $base = $File -replace "\.gz$", ""
    & gzip -k -d $File
    $base = "$base"
    $plain = $base
    if (-not (Test-Path $plain)) {
      $plain = $File.TrimEnd(".gz")
    }
  }
  else {
    $plain = $File
  }

  Write-Host "🚀 Aplicando $plain a $DatabaseUrl ..."
  & $psql $DatabaseUrl -v ON_ERROR_STOP=1 -f $plain
  Write-Host "✅ Restauración completada."
}