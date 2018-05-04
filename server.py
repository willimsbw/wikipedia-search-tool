import http.server
import socketserver
import os

port = int(os.environ.get('PORT', 8000)) # Use 8000 if no PORT variable

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.html': 'text/html',
});

httpd = socketserver.TCPServer(("", port), Handler)

httpd.serve_forever()
