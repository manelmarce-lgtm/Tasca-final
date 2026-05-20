function Validate-XmlFile($path, $schemaPath) {
    $errors = @()
    $settings = New-Object System.Xml.XmlReaderSettings
    $schemaSet = New-Object System.Xml.Schema.XmlSchemaSet
    $null = $schemaSet.Add([System.Xml.XmlQualifiedName]::Empty, $schemaPath)
    $settings.Schemas.Add($schemaSet) | Out-Null
    $settings.ValidationType = [System.Xml.ValidationType]::Schema
    $settings.add_ValidationEventHandler({ param($sender,$e) $errors += $e })

    $reader = [System.Xml.XmlReader]::Create($path, $settings)
    try {
        while ($reader.Read()) { }
    } catch {
        $errors += $_
    } finally {
        $reader.Close()
    }

    return [PSCustomObject]@{
        File = $path
        IsValid = ($errors.Count -eq 0)
        Errors = $errors
    }
}

$schemaPath = 'activitats.xsd'
$xmlFiles = Get-ChildItem -Path . -Filter 'activitats_*.xml' | Sort-Object Name
if ($xmlFiles.Count -eq 0) {
    Write-Output "No se encontraron archivos XML a validar."
    exit 1
}

foreach ($file in $xmlFiles) {
    $result = Validate-XmlFile $file.FullName $schemaPath
    if ($result.IsValid) {
        Write-Output "VALID: $($result.File)"
    } else {
        Write-Output "INVALID: $($result.File)"
        $result.Errors | ForEach-Object { Write-Output ('ERROR: ' + $_.Message) }
    }
}
