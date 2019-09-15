import * as System from '/js/system.js';

System.addMenuOption({
	id: 'nota',
	title: 'Notas'
});
System.addMenuOption({
	id: 'add-nota',
	parent_id: 'nota',
	title: 'Nota da Avaliação',
	action: () => {
		System.openFormPage('nota/add');
	}
});
System.addMenuOption({
	id: 'list-nota',
	parent_id: 'nota',
	title: 'Listar Notas',
	action: () => {
		System.openFormPage('nota/list');
	}
});