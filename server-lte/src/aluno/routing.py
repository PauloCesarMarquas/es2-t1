from connector import Connector
from src.aluno.dao import DAOAluno
from server import add_POST, add_GET

def add(req, data):
	aluno = {
		'nome': data['nome'][0],
		'matricula': data['matricula'][0],
		'email': data['email'][0],
		'telefone': data['telefone'][0]
	}
	req.sendJSON(DAOAluno().add(Connector(), aluno))
add_POST('/aluno/add', add)

def list(req, data):
	req.sendJSON(DAOAluno().list(Connector()))
add_GET('/aluno/list', list)

def get(req, data):
	id = data['id'][0]
	req.sendJSON(DAOAluno().get(Connector(), id))
add_GET('/aluno/get', get)

def update(req, data):
	aluno = {
		'id': data['id'][0],
		'nome': data['nome'][0],
		'matricula': data['matricula'][0],
		'email': data['email'][0],
		'telefone': data['telefone'][0],
	}
	if 'idCurso' in data:
		aluno['idCurso'] = data['idCurso'][0]
	else:
		aluno['idCurso'] = None
	DAOAluno().update(Connector(), aluno)
	req.sendJSON(True)
add_POST('/aluno/update', update)

def remove(req, data):
	id = data['id'][0]
	req.sendJSON(DAOAluno().remove(Connector(), id))
add_POST('/aluno/remove', remove)