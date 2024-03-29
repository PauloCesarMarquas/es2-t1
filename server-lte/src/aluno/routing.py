from connector import Connector
from src.aluno.dao import DAOAluno
from server import add_POST, add_GET

def add(req, data):
	aluno = {
		'nome': data.get('nome'),
		'matricula': data.get('matricula'),
		'email': data.get('email'),
		'telefone': data.get('telefone')
	}
	req.sendJSON(DAOAluno().add(Connector(), aluno))
add_POST('/aluno/add', add)

def list(req, data):
	dao = DAOAluno()
	conn = Connector()
	idCurso = data.get('idCurso')
	idTurma = data.get('idTurma')
	idDisciplina = data.get('idDisciplina')
	if (idCurso != None):
		req.sendJSON(dao.listByCurso(conn, idCurso))
	elif (idTurma != None):
		req.sendJSON(dao.listByTurma(conn, idTurma))
	elif (idDisciplina != None):
		req.sendJSON(dao.listByDisciplina(conn, idDisciplina))
	else:
		req.sendJSON(dao.list(conn))
add_GET('/aluno/list', list)

def get(req, data):
	id = data.get('id')
	print(id)
	req.sendJSON(DAOAluno().get(Connector(), id))
add_GET('/aluno/get', get)

def update(req, data):
	aluno = {
		'id': data.get('id'),
		'nome': data.get('nome'),
		'matricula': data.get('matricula'),
		'email': data.get('email'),
		'telefone': data.get('telefone'),
		'idCurso': data.get('idCurso')
	}
	DAOAluno().update(Connector(), aluno)
	req.sendJSON(True)
add_POST('/aluno/update', update)

def remove(req, data):
	id = data.get('id')
	req.sendJSON(DAOAluno().remove(Connector(), id))
add_POST('/aluno/remove', remove)