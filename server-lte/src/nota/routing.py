from connector import Connector
from src.nota.dao import DAONota
from server import add_POST, add_GET

def add(req, data):
	nota = {
		'idAluno': data.get('idAluno'),
		'idAvaliacao': data.get('idAvaliacao'),
		'nota': data.get('nota')
	}
	dao = DAONota()
	conn = Connector()
	req.sendJSON(dao.add(conn, nota))	
add_POST('/nota/add', add)

def list(req, data):
	dao = DAONota()
	conn = Connector()
	req.sendJSON(dao.list(conn))
add_GET('/nota/list', list)

def remove(req, data):
	id = data.get('id')
	dao = DAONota()
	conn = Connector()
	req.sendJSON(dao.remove(conn, id))
add_POST('/nota/remove', remove)