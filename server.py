import http.server
import socketserver
import os

port = int(os.environ.get('PORT', 8000)) # Use 8000 if no PORT variable
content = open('index.html')

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        # Root path. Send the form.
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        self.wfile.write(content.encode())

httpd = socketserver.TCPServer(("", port), Handler)

httpd.serve_forever()
