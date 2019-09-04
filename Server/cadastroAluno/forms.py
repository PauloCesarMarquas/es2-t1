from django import forms  
from cadastroAluno.models import Aluno
from cadastroAluno.models import Curso

class AlunoForm(forms.ModelForm):  
    class Meta:  
        model = Aluno
        fields = "__all__"  


class CursoForm(forms.ModelForm):  
    class Meta:  
        model = Curso
        fields = "__all__"  


from cadastroAluno.models import Disciplina



class DisciplinaForm(forms.ModelForm):  
    class Meta:  
        model = Disciplina
        fields = "__all__"  

from cadastroAluno.models import Matricula
class MatriculaForm(forms.ModelForm):  
    class Meta:  
        model = Matricula
        fields = "__all__"  

