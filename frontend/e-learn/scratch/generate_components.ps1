$templateDir = "frontoffice/dreamslms.dreamstechnologies.com/html/template"
$pagesDir = "src/app/frontoffice-pages"
$sharedComponent = "../../shared/xhtml-page-frame.component"

$htmlFiles = Get-ChildItem -Path "$templateDir/*.html" | Select-Object -ExpandProperty Name

foreach ($file in $htmlFiles) {
    $baseName = $file.Replace(".html", "")
    $componentDir = "$pagesDir/$baseName"
    
    # Generate Component Name
    $parts = $baseName -split "-"
    $componentClassName = ""
    foreach ($part in $parts) {
        if ($part -match '^\d+$') {
            $componentClassName += $part
        } else {
            $componentClassName += $part.Substring(0,1).ToUpper() + $part.Substring(1).ToLower()
        }
    }
    $componentClassName += "FrontofficePageComponent"
    
    if (-not (Test-Path $componentDir)) {
        New-Item -ItemType Directory -Path $componentDir -Force | Out-Null
        
        # TS
        $tsContent = @"
import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '$sharedComponent';

@Component({
  selector: 'app-frontoffice-$baseName-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './$baseName.component.html',
  styleUrl: './$baseName.component.css'
})
export class $componentClassName {
  readonly pagePath = 'frontoffice/template/$file';
  readonly pageTitle = 'frontoffice-$baseName';
}
"@
        $tsContent | Set-Content -Path "$componentDir/$baseName.component.ts"
        
        # HTML
        $htmlContent = "<app-xhtml-page-frame [pagePath]=""pagePath"" [pageTitle]=""pageTitle""></app-xhtml-page-frame>"
        $htmlContent | Set-Content -Path "$componentDir/$baseName.component.html"
        
        # CSS
        $cssContent = ":host { display: block; }"
        $cssContent | Set-Content -Path "$componentDir/$baseName.component.css"
        
        Write-Host "Created component for $file"
    } else {
        Write-Host "Component for $file already exists"
    }
}
