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
	conn = Connector()
	dao = DAOAluno()
	req.sendJSON(dao.add(conn, aluno))

def list(req, data):
	conn = Connector()
	dao = DAOAluno()
	req.sendJSON(dao.list(conn))

add_POST('/aluno/add', add)
add_GET('/aluno/list', list)