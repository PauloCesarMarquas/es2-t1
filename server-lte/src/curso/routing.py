from connector import Connector
from src.curso.dao import DAOCurso
from server import add_POST, add_GET

def add(req, data):
	curso = { 'nome': data.get('nome') }
	conn = Connector()
	dao = DAOCurso()
	req.sendJSON(dao.add(conn, curso))
add_POST('/curso/add', add)

def list(req, data):
	conn = Connector()
	dao = DAOCurso()
	req.sendJSON(dao.list(conn))
add_GET('/curso/list', list)

def get(req, data):
	id = data.get('id')
	req.sendJSON(DAOCurso().get(Connector(), id))
add_GET('/curso/get', get)

def update(req, data):
	curso = {
		'id': data.get('id'),
		'nome': data.get('nome')
	}
	dao = DAOCurso()
	conn = Connector()
	req.sendJSON(dao.update(conn, curso))
add_POST('/curso/update', update)

def remove(req, data):
	id = data.get('id')
	dao = DAOCurso()
	conn = Connector()
	req.sendJSON(dao.remove(conn, id))
add_POST('/curso/remove', remove)