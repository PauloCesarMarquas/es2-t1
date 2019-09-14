from connector import Connector
from src.turma.dao import DAOTurma
from server import add_POST, add_GET

def add(req, data):
	turma = {
		'nome': data['nome'][0],
		'idDisciplina': data['idDisciplina'][0]
	}
	conn = Connector()
	dao = DAOTurma()
	req.sendJSON(dao.add(conn, turma))
add_POST('/turma/add', add)

def update(req, data):
	turma = {
		'id': data['id'][0],
		'nome': data['nome'][0],
		'idDisciplina': data['idDisciplina'][0]
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
	id = data['id'][0]
	req.sendJSON(DAOTurma().get(Connector(), id))
add_GET('/turma/get', get)

def remove(req, data):
	id = data['id'][0]
	DAOTurma().remove(Connector(), id)
	req.sendJSON(True)
add_POST('/turma/remove', remove)