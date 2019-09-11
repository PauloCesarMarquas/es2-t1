import * as PageControl from '/js/page-control.js';

PageControl.addMenuOption({
	id: 'disciplinas',
	title: 'Disciplinas'
});
PageControl.addMenuOption({
	id: 'add-disciplina',
	parent_id: 'disciplinas',
	title: 'Cadastrar disciplina',
	action: () => {
		PageControl.openForm('disciplina/add');
	}
});
PageControl.addMenuOption({
	id: 'list-disciplina',
	parent_id: 'disciplinas',
	title: 'Listar disciplinas',
	action: () => {
		PageControl.openForm('disciplina/list');
	}
});