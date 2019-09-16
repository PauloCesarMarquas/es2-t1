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
System.addMenuOption({
	id: 'list-frequencia-por-data',
	parent_id: 'frequencia',
	title: 'Frequência por data',
	action: () => System.openFormPage('frequencia/por_data')
});