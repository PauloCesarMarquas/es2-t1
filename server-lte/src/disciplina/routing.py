from connector import Connector
from src.disciplina.dao import DAODisciplina
from server import add_POST, add_GET

def add(req, data):
	disciplina = {
		'nome': data['nome'][0],
		'idCurso': data['idCurso'][0]
	}
	conn = Connector()
	dao = DAODisciplina()
	req.sendJSON(dao.add(conn, disciplina))
add_POST('/disciplina/add', add)

def update(req, data):
	disciplina = {
		'id': data['id'][0],
		'nome': data['nome'][0],
		'idCurso': data['idCurso'][0]
	}
	DAODisciplina().update(Connector(), disciplina)
	req.sendJSON(True)
add_POST('/disciplina/update', update)

def list(req, data):
	conn = Connector()
	dao = DAODisciplina()
	req.sendJSON(dao.list(conn))
add_GET('/disciplina/list', list)

def get(req, data):
	id = data['id'][0]
	req.sendJSON(DAODisciplina().get(Connector(), id))
add_GET('/disciplina/get', get)

def remove(req, data):
	id = data['id'][0]
	DAODisciplina().remove(Connector(), id)
	req.sendJSON(True)
add_POST('/disciplina/remove', remove)