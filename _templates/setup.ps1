# Hygen Templates Setup and Demo

# Check if hygen is installed globally
if (!(Get-Command hygen -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Hygen globally..." -ForegroundColor Yellow
    npm install -g hygen
} else {
    Write-Host "Hygen is already installed" -ForegroundColor Green
}

# Display available templates
Write-Host "`nAvailable Hygen Templates:" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host "1. hygen api-service new        - Generate API service class" -ForegroundColor White
Write-Host "2. hygen type new               - Generate TypeScript interfaces" -ForegroundColor White  
Write-Host "3. hygen test new               - Generate test files" -ForegroundColor White
Write-Host "4. hygen service-with-type new  - Generate complete service with types" -ForegroundColor White

Write-Host "`nExample Usage:" -ForegroundColor Cyan
Write-Host "==============" -ForegroundColor Cyan
Write-Host "# Create a new API service"
Write-Host "hygen api-service new" -ForegroundColor Yellow
Write-Host ""
Write-Host "# Create type definitions"  
Write-Host "hygen type new" -ForegroundColor Yellow
Write-Host ""
Write-Host "# Create a complete service (recommended)"
Write-Host "hygen service-with-type new" -ForegroundColor Yellow

Write-Host "`nTo get started, try:" -ForegroundColor Green
Write-Host "hygen service-with-type new" -ForegroundColor Yellow
