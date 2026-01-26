$projects = @(
    "leetmetric", "leet-metric", "leet-metric-visualizer",
    "learning-style-ai", "learning-style-identifier", "learning-style-identification",
    "msme-investment", "msme-investment-platform", "msme-platform",
    "bus-fleet-management", "bus-fleet", "smart-bus-fleet"
)

foreach ($p in $projects) {
    $url = "https://$p.vercel.app"
    try {
        $request = Invoke-WebRequest -Uri $url -Method Head -ErrorAction SilentlyContinue
        if ($request.StatusCode -eq 200) {
            Write-Host "FOUND: $url"
        }
    } catch {
        # Ignore 404s
    }
}
