function Get-ClassName($baseName, $suffix) {
    $parts = $baseName -split "-"
    $className = ""
    foreach ($part in $parts) {
        if ($part -match '^\d+$') {
            $className += $part
        } else {
            $className += $part.Substring(0,1).ToUpper() + $part.Substring(1).ToLower()
        }
    }
    return "$className$suffix"
}

$frontofficeDirs = Get-ChildItem -Path "src/app/frontoffice-pages" -Directory | Select-Object -ExpandProperty Name
$adminDirs = Get-ChildItem -Path "src/app/pages" -Directory | Select-Object -ExpandProperty Name

$lines = @()
$lines += "import { NgModule } from '@angular/core';"
$lines += "import { RouterModule, Routes } from '@angular/router';"
$lines += "import { Index1FrontofficePageComponent } from './frontoffice-pages/index-1/index-1.component';"
$lines += ""
$lines += "export const routes: Routes = ["
$lines += "  { path: '', pathMatch: 'full', component: Index1FrontofficePageComponent },"
$lines += "  { path: 'frontoffice', pathMatch: 'full', redirectTo: 'frontoffice/index' },"
$lines += "  { path: 'admin', pathMatch: 'full', redirectTo: 'admin/index' },"

# Add Frontoffice routes
foreach ($dir in $frontofficeDirs) {
    if ($dir -eq "index-1") { continue }
    $className = Get-ClassName $dir "FrontofficePageComponent"
    $lines += "  { path: 'frontoffice/$dir', loadComponent: () => import('./frontoffice-pages/$dir/$dir.component').then((m) => m.$className) },"
}

# Add Admin routes
foreach ($dir in $adminDirs) {
    $className = Get-ClassName $dir "PageComponent"
    $lines += "  { path: 'admin/$dir', loadComponent: () => import('./pages/$dir/$dir.component').then((m) => m.$className) },"
}

# Add redirects for admin (legacy structure)
foreach ($dir in $adminDirs) {
    if ($dir -eq "index") { continue }
    $lines += "  { path: '$dir', pathMatch: 'full', redirectTo: 'admin/$dir' },"
}

$lines += "  { path: 'index', pathMatch: 'full', redirectTo: 'admin/index' },"
$lines += "  { path: '**', redirectTo: 'frontoffice/index' }"
$lines += "];"
$lines += ""
$lines += "@NgModule({"
$lines += "  imports: [RouterModule.forRoot(routes)],"
$lines += "  exports: [RouterModule]"
$lines += "})"
$lines += "export class AppRoutingModule {}"

$lines | Set-Content -Path "src/app/app-routing-module.ts"
