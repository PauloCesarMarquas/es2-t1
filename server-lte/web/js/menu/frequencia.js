import * as System from '/js/system.js';

System.addMenuOption({
	id: 'frequencia',
	title: 'Frequência'
});
System.addMenuOption({
	id: 'frequencia-add',
	parent_id: 'frequencia',
	title: 'Registrar frequência',
	action: () => System.openFormPage('frequencia/add')
});