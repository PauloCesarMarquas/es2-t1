import * as PageControl from '/js/page-control.js';
import '/js/form-init.js';
PageControl.addMenuOption({
	id: 'alunos',
	title: 'Alunos'
});
PageControl.addMenuOption({
	id: 'add-aluno',
	parent_id: 'alunos',
	title: 'Cadastrar aluno',
	action: () => {
		PageControl.openForm('aluno/add');
	}
});
PageControl.addMenuOption({
	id: 'list-aluno',
	parent_id: 'alunos',
	title: 'Listar alunos',
	action: () => {
		PageControl.openForm('aluno/list');
	}
});
$(document).ready(() => {
	PageControl.init();
});