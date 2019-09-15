from connector import Connector
from src.avaliacao.dao import DAOAvaliacao
from server import add_POST, add_GET

def add(req, data):
	avaliacao = {
		'nome': data.get('nome'),
		'nota': data.get('nota'),
		'idTurma': data.get('idTurma')
	}
	dao = DAOAvaliacao()
	conn = Connector()
	req.sendJSON(dao.add(conn, avaliacao))
add_POST('/avaliacao/add', add)


def update(req, data):
	avaliacao = {
		'id': data.get('id'),
		'nome': data.get('nome'),
		'idTurma': data.get('idTurma')
	}
	DAOAvaliacao().update(Connector(), avaliacao)
	req.sendJSON(True)
add_POST('/avaliacao/update', update)

def list(req, data):
	conn = Connector()
	dao = DAOAvaliacao()
	idTurma = data.get('idTurma')
	if (idTurma == None):
		array = dao.list(conn)
	else:
		array = dao.listByTurma(conn, idTurma)
	req.sendJSON(array)
add_GET('/avaliacao/list', list)

def get(req, data):
	id = data.get('id')
	req.sendJSON(DAOAvaliacao().get(Connector(), id))
add_GET('/avaliacao/get', get)

def remove(req, data):
	id = data.get('id')
	DAOAvaliacao().remove(Connector(), id)
	req.sendJSON(True)
add_POST('/avaliacao/remove', remove)