from django.db import models

# Create your models here.

from django.urls import reverse

# Create your models here.

class Curso(models.Model):
	nome = models.CharField(
		max_length= 45,
		help_text="Nome do curso, Ex.: Ciência da Computação"
		)	
	class Meta:
		db_table = "cadastroAluno_curso"

class Aluno(models.Model):

	nome = models.CharField(
		max_length = 45,
		help_text="Nome completo do aluno, Ex.: \'Carlos Pesenha\'"
		)

	email = models.CharField(
		max_length = 45,
		help_text="endereço de e-mail do aluno, Ex.: email@gmail.com"
		)

	telefone = models.CharField(
		max_length = 15,
		help_text = "telefone do aluno, Ex.: (45)9999-99999"
		)

	curso = models.ForeignKey(
		'Curso',
		on_delete=models.CASCADE,
		null = True)

	class Meta:
		db_table = "cadastroAluno_aluno"


class Disciplina(models.Model):
	nome = models.CharField(
		max_length= 45,
		help_text="Nome da disciplina, Ex.: Fisica"
		)	
	curso = models.ForeignKey(
		'Curso',
		on_delete=models.CASCADE,
		null = False)
	
	class Meta:
		db_table = "cadastroAluno_disciplina"

class Matricula(models.Model):
	aluno = models.ForeignKey(
		'Aluno',
		on_delete=models.CASCADE,
		null = False)
	disciplina = models.ForeignKey(
		'Disciplina',
		on_delete=models.CASCADE,
		null = False)
	
	class Meta:
		db_table = "cadastroAluno_matricula"