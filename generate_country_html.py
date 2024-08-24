import os
import pytz
from pytz import country_timezones


output_dir = './c'


if not os.path.exists(output_dir):
    os.makedirs(output_dir)


html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{country_code} Time Zone Clock</title>
    <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
    <div class="timer-container">
        <div id="time" class="time"></div>
        <div id="date" class="date"></div>
        <div id="offset" class="offset"></div>
    </div>

    <script src="../assets/script.js"></script>
    <script>
        initClock('{timezone}');
    </script>
</body>
</html>
"""


for country_code in pytz.country_names:
    timezones = country_timezones.get(country_code)
    if timezones:
        
        timezone = timezones[0]
        country_code_lower = country_code.lower()
        
        
        html_content = html_template.format(country_code=country_code_lower, timezone=timezone)
        
        
        output_file = os.path.join(output_dir, f'{country_code_lower}.html')
        with open(output_file, 'w') as file:
            file.write(html_content)

print(f"Generated HTML files for {len(pytz.country_names)} countries in the /c/ directory.")
