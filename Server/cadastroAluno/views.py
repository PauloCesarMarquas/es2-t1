from django.shortcuts import render, redirect  
from cadastroAluno.forms import AlunoForm  
from cadastroAluno.models import Aluno  

from cadastroAluno.forms import CursoForm  
from cadastroAluno.models import Curso  

# Create your views here.  
def alunoView(request):  
    if request.method == "POST":  
        form = AlunoForm(request.POST)  
        if form.is_valid():  
            try:  
                form.save()  
                return redirect('/show')  
            except:  
                pass  
    else:  
        form = AlunoForm()  
    return render(request,'index.html',{'form':form})  

def alunoShow(request):  
    alunos = Aluno.objects.all()  
    return render(request,"show.html",{'alunos':alunos})  

def alunoEdit(request, id):  
    aluno = Aluno.objects.get(id=id)  
    return render(request,'edit.html', {'aluno':aluno})  

def alunoUpdate(request, id):  
    aluno = Aluno.objects.get(id=id)  
    form = AlunoForm(request.POST, instance = aluno)  
    if form.is_valid():  
        form.save()  
        return redirect("/show")  
    return render(request, 'edit.html', {'aluno': aluno})  

def alunoDestroy(request, id):  
    aluno = Aluno.objects.get(id=id)  
    aluno.delete()  
    return redirect("/show")  

    
def cursoView(request):  
    if request.method == "POST":  
        form = CursoForm(request.POST)  
        if form.is_valid():  
            try:  
                form.save()  
                return redirect('/cursoShow')  
            except:  
                pass  
    else:  
        form = CursoForm()  
    return render(request,'cursoIndex.html',{'form':form})  

def cursoShow(request):  
    cursos = Curso.objects.all()  
    return render(request,"cursoShow.html",{'cursos':cursos})  

def cursoEdit(request, id):  
    curso = Curso.objects.get(id=id)  
    return render(request,'cursoEdit.html', {'curso':curso})  

def cursoUpdate(request, id):  
    curso = Curso.objects.get(id=id)  
    form = CursoForm(request.POST, instance = curso)  
    if form.is_valid():  
        form.save()  
        return redirect("/show")  
    return render(request, 'cursoEdit.html', {'curso': curso})  

def cursoDestroy(request, id):  
    curso = Curso.objects.get(id=id)  
    curso.delete()  
    return redirect("/cursoShow")  

from cadastroAluno.forms import DisciplinaForm  
from cadastroAluno.models import Disciplina

def disciplinaView(request):  
    if request.method == "POST":  
        form = DisciplinaForm(request.POST)  
        if form.is_valid():  
            try:  
                form.save()  
                return redirect('/disciplinaShow')  
            except:  
                pass  
    else:  
        form = DisciplinaForm()  
    return render(request,'disciplinaIndex.html',{'form':form})  

def disciplinaShow(request):  
    disciplinas = Disciplina.objects.all()  
    return render(request,"disciplinaShow.html",{'disciplinas':disciplinas})  

def disciplinaEdit(request, id):  
    disciplina = Disciplina.objects.get(id=id)  
    return render(request,'disciplinaEdit.html', {'disciplina':disciplina})  

def disciplinaUpdate(request, id):  
    disciplina = Disciplina.objects.get(id=id)  
    form = DisciplinaForm(request.POST, instance = disciplina)  
    if form.is_valid():  
        form.save()  
        return redirect("/disciplinaShow")  
    return render(request, 'disciplinaEdit.html', {'disciplina': disciplina})  

def disciplinaDestroy(request, id):  
    disciplina = Disciplina.objects.get(id=id)  
    disciplina.delete()  
    return redirect("/disciplinaShow")  

from cadastroAluno.forms import MatriculaForm  
from cadastroAluno.models import Matricula  

def matriculaView(request):  
    if request.method == "POST":  
        form = MatriculaForm(request.POST)  
        if form.is_valid():  
            try:  
                form.save()  
                return redirect('/matriculaShow')  
            except:  
                pass  
    else:  
        form = MatriculaForm()  
    return render(request,'matriculaIndex.html',{'form':form})  

def matriculaShow(request):  
    matriculas = Matricula.objects.all()  
    return render(request,"matriculaShow.html",{'matriculas':matriculas})  

def matriculaEdit(request, id):  
    matricula = Matricula.objects.get(id=id)  
    return render(request,'matriculaEdit.html', {'matricula':matricula})  

def matriculaUpdate(request, id):  
    matricula = Matricula.objects.get(id=id)  
    form = MatriculaForm(request.POST, instance = matricula)  
    if form.is_valid():  
        form.save()  
        return redirect("/matriculaShow")  
    return render(request, 'matriculaEdit.html', {'matricula': matricula})  

def matriculaDestroy(request, id):  
    matricula = Matricula.objects.get(id=id)  
    matricula.delete()  
    return redirect("/matriculaShow")  
