<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('vendor/swagger/swagger-ui.css') }}">
    <link rel="icon" type="image/png" href="{{ asset('vendor/swagger/favicon-32x32.png') }}" sizes="32x32" />
    <link rel="icon" type="image/png" href="{{ asset('vendor/swagger/favicon-16x16.png') }}" sizes="16x16" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }

        body {
            margin: 0;
            background: #fafafa;
        }
    </style>
</head>

<body>
    <div id="swagger-ui"></div>
    <script src="{{ asset('vendor/swagger/swagger-ui-bundle.js') }}"></script>
    <script src="{{ asset('vendor/swagger/swagger-ui-standalone-preset.js') }}"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: "{{ route('swagger.docs') }}",
                dom_id: '#swagger-ui',
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                layout: "StandaloneLayout"
            })
            window.ui = ui
        }
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.7.0/swagger-ui-bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.7.0/swagger-ui-standalone-preset.min.js"></script>

</body>

</html>