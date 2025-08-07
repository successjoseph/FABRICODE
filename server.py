import http.server
import socketserver
import os
import time

PORT = 5050
URL = f'http://localhost:{PORT}/pages/index.html'


handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), handler)

print(f"Serving at {URL}")

# 2. Open browser after a short pause
time.sleep(1)
os.startfile(URL)

# 3. This call blocks and keeps your server alive
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server…")
    httpd.server_close()