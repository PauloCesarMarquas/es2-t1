import * as PageControl from '/js/page-control.js';

PageControl.addMenuOption({
	id: 'matriculas',
	title: 'Matrículas'
});
PageControl.addMenuOption({
	id: 'add-matricula',
	parent_id: 'matriculas',
	title: 'Matricular Aluno',
	action: () => {
		PageControl.openForm('matricula/add');
	}
});
PageControl.addMenuOption({
	id: 'list-matricula',
	parent_id: 'matriculas',
	title: 'Listar Matriculas',
	action: () => {
		PageControl.openForm('matricula/list');
	}
});