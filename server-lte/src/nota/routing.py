from connector import Connector
from src.nota.dao import DAONota
from server import add_POST, add_GET

def add(req, data):

	nota = {
		'valor': data.get('valor'),
		'idAluno': data.get('idAluno'),
		'idAvaliacao': data.get('idAvaliacao')
	}

	conn = Connector()
	dao = DAONota()

	req.sendJSON(dao.add(conn, nota))

add_POST('/nota/add', add)

def list(req, data):

	idAvaliacao = data.get('idAvaliacao')

	conn = Connector()
	dao = DAONota()

	if idAvaliacao != None:
		req.sendJSON(dao.listByAvaliacao(conn, idAvaliacao))
	else:
		req.sendJSON(dao.list(conn))

add_GET('/nota/list', list)

# def get(req, data):
# 	id = data.get('id')
# 	req.sendJSON(DAONota().get(Connector(), id))
# add_GET('/nota/get', get)

# def update(req, data):
# 	nota = {
# 		'id': data.get('id'),
# 		'nome': data.get('nome')
# 	}
# 	dao = DAONota()
# 	conn = Connector()
# 	req.sendJSON(dao.update(conn, nota))
# add_POST('/nota/update', update)

# def remove(req, data):
# 	id = data.get('id')
# 	dao = DAONota()
# 	conn = Connector()
# 	req.sendJSON(dao.remove(conn, id))
# add_POST('/nota/remove', remove)