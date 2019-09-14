import * as System from '/js/system.js';

System.addMenuOption({
	id: 'matriculas',
	title: 'Matrículas'
});
System.addMenuOption({
	id: 'add-matricula',
	parent_id: 'matriculas',
	title: 'Matricular Aluno',
	action: () => {
		System.openFormPage('matricula/add');
	}
});
System.addMenuOption({
	id: 'list-matricula',
	parent_id: 'matriculas',
	title: 'Listar Matriculas',
	action: () => {
		System.openFormPage('matricula/list');
	}
});