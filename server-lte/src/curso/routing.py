from connector import Connector
from src.curso.dao import DAOCurso
from server import add_POST, add_GET

def add(req, data):
	curso = { 'nome': data['nome'][0] }
	conn = Connector()
	dao = DAOCurso()
	req.sendJSON(dao.add(conn, curso))

def list(req, data):
	conn = Connector()
	dao = DAOCurso()
	req.sendJSON(dao.list(conn))

add_POST('/curso/add', add)
add_GET('/curso/list', list)