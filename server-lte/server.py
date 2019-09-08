import json

from http.server import HTTPServer, BaseHTTPRequestHandler

from lib.urllib.parse import urlparse, parse_qs
from lib.mime.mimetypes import guess_type

handlers = {}
def add_GET(path, handler):
	key = 'GET:' + path
	handlers[key] = handler

def add_POST(path, handler):
	key = 'POST:' + path
	handlers[key] = handler

def callHandler(type, path, req, data):
	key = type + ':' + path
	try:
		handler = handlers[key]
	except:
		handler = False
	if handler != False:
		handler(req, data)
		return True
	return False

def handleRequest(req, type):

	path = req.path
	parsed = urlparse(req.path)
	path = parsed.path

	if type == 'GET':
		data = parse_qs(parsed.query)
	if type == 'POST':
		content_len = int(req.headers.get('Content-Length'))
		post_body = req.rfile.read(content_len)
		data = parse_qs(post_body.decode('utf-8'))

	if callHandler(type, path, req, data) == True:
		return
	if path == '/':
		path += 'index.html'
	path = './web' + path

	try:
		msg = open(path, 'r', 'utf-8').read()
		file_read = True
	except:
		file_read = False
	if file_read:
		req.send_response(200)
		mime = guess_type(path)[0];
		req.send_header('Content-type', mime)
		req.end_headers()
		req.wfile.write(bytes(msg, 'utf-8'))
	else:
		req.send_response(404)
		req.end_headers()

class Server(BaseHTTPRequestHandler):

	def sendJSON(self, obj):
		self.send_response(200)
		self.send_header('Content-Type', 'application/json')
		self.end_headers()
		self.wfile.write(bytes(json.dumps(obj), 'utf-8'))

	def err(self):
		self.send_response(500)
		self.end_headers()

	def do_GET(self):
		handleRequest(self, 'GET')

	def do_POST(self):
		handleRequest(self, 'POST')

def startServer(PORT):
	HTTPServer(('localhost', PORT), Server).serve_forever()