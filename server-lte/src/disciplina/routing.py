from connector import Connector
from src.disciplina.dao import DAODisciplina
from server import add_POST, add_GET

def add(req, data):
	disciplina = {
		'nome': data.get('nome'),
		'idCurso': data.get('idCurso')
	}
	conn = Connector()
	dao = DAODisciplina()
	req.sendJSON(dao.add(conn, disciplina))
add_POST('/disciplina/add', add)

def update(req, data):
	disciplina = {
		'id': data.get('id'),
		'nome': data.get('nome'),
		'idCurso': data.get('idCurso')
	}
	DAODisciplina().update(Connector(), disciplina)
	req.sendJSON(True)
add_POST('/disciplina/update', update)

def list(req, data):
	conn = Connector()
	dao = DAODisciplina()
	idCurso = data.get('idCurso')
	if (idCurso == None):
		array = dao.list(conn)
	else:
		array = dao.listByCurso(conn, idCurso)
	req.sendJSON(array)
add_GET('/disciplina/list', list)

def get(req, data):
	id = data.get('id')
	req.sendJSON(DAODisciplina().get(Connector(), id))
add_GET('/disciplina/get', get)

def remove(req, data):
	id = data.get('id')
	DAODisciplina().remove(Connector(), id)
	req.sendJSON(True)
add_POST('/disciplina/remove', remove)