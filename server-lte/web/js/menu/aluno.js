import * as System from '/js/system.js';

System.addMenuOption({
	id: 'alunos',
	title: 'Alunos'
});
System.addMenuOption({
	id: 'add-aluno',
	parent_id: 'alunos',
	title: 'Cadastrar aluno',
	action: () => {
		System.openFormPage('aluno/add');
	}
});
System.addMenuOption({
	id: 'list-aluno',
	parent_id: 'alunos',
	title: 'Listar alunos',
	action: () => {
		System.openFormPage('aluno/list');
	}
});
System.addMenuOption({
	id: 'list-aluno-por-disciplina',
	parent_id: 'alunos',
	title: 'Listar por Disciplina',
	action: () => {
		System.openFormPage('aluno/por_disciplina');
	}
});
System.addMenuOption({
	id: 'list-aluno-por-curso',
	parent_id: 'alunos',
	title: 'Listar por Curso',
	action: () => {
		System.openFormPage('aluno/por_curso');
	}
});