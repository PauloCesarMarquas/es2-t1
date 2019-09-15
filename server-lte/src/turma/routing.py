from connector import Connector
from src.turma.dao import DAOTurma
from server import add_POST, add_GET

def add(req, data):
	turma = {
		'nome': data.get('nome'),
		'idDisciplina': data.get('idDisciplina')
	}
	conn = Connector()
	dao = DAOTurma()
	req.sendJSON(dao.add(conn, turma))
add_POST('/turma/add', add)

def update(req, data):
	turma = {
		'id': data.get('id'),
		'nome': data.get('nome'),
		'idDisciplina': data.get('idDisciplina')
	}
	DAOTurma().update(Connector(), turma)
	req.sendJSON(True)
add_POST('/turma/update', update)

def list(req, data):
	conn = Connector()
	dao = DAOTurma()
	req.sendJSON(dao.list(conn))
add_GET('/turma/list', list)

def get(req, data):
	id = data.get('id')
	req.sendJSON(DAOTurma().get(Connector(), id))
add_GET('/turma/get', get)

def remove(req, data):
	id = data.get('id')
	DAOTurma().remove(Connector(), id)
	req.sendJSON(True)
add_POST('/turma/remove', remove)