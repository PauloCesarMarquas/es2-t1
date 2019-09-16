from server import startServer

import src.aluno.routing
import src.curso.routing
import src.disciplina.routing
import src.matricula.routing
import src.turma.routing
import src.avaliacao.routing
import src.nota.routing
import src.frequencia.routing

startServer(8081)