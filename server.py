from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs
import index.html


class MessageHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # First, send a 200 OK response.
        self.send_response(200)

        # Then send headers.
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()

        # 2. Put the markdown from index.html into a variable
        html = index.html

        # 3. Send the response.
        self.wfile.write(html.encode())

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, MessageHandler)
    httpd.serve_forever()
