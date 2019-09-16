import sys
from server import startServer

args = sys.argv
n = len(args)
if (n > 1):
	port = int(args[1])
else:
	port = 80

import src.aluno.routing
import src.curso.routing
import src.disciplina.routing
import src.matricula.routing
import src.turma.routing
import src.avaliacao.routing
import src.frequencia.routing
import src.nota.routing

startServer(port)