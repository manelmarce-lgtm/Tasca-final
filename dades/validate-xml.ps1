$errors = @()
$settings = New-Object System.Xml.XmlReaderSettings
$schemaSet = New-Object System.Xml.Schema.XmlSchemaSet
$null = $schemaSet.Add([System.Xml.XmlQualifiedName]::Empty, 'activitats.xsd')
$settings.Schemas.Add($schemaSet) | Out-Null
$settings.ValidationType = [System.Xml.ValidationType]::Schema
$settings.add_ValidationEventHandler({ param($sender,$e) $errors += $e })
$reader = [System.Xml.XmlReader]::Create('activitats_001.xml', $settings)
try {
    while ($reader.Read()) { }
} catch {
    $errors += $_
} finally {
    $reader.Close()
}
if ($errors.Count -eq 0) {
    Write-Output 'VALID'
} else {
    Write-Output 'INVALID'
    $errors | ForEach-Object { Write-Output ('ERROR: ' + $_.Message) }
}
