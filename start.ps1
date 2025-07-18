#!/usr/bin/env pwsh
param(
    [ValidateSet('dev','prod')][string]$mode = 'dev'
)

$ErrorActionPreference = 'Stop'

try {
    if (-not (Get-Command "docker" -ErrorAction SilentlyContinue)) {
        Write-Error "Docker n'est pas installé ou n'est pas dans le PATH."
        exit 1
    }
    $composeCmd = "docker compose"
    if ($mode -eq 'prod') {
        Write-Host 'Lancement du site en mode production (docker-compose.prod.yml)' -ForegroundColor Green
        iex "$composeCmd -f docker-compose.prod.yml up --build"
    } else {
        Write-Host 'Lancement du site en mode développement (docker-compose.dev.yml)' -ForegroundColor Cyan
        iex "$composeCmd -f docker-compose.dev.yml up --build"
    }
} catch {
    Write-Error "Erreur lors du lancement du conteneur : $_"
    exit 1
}
