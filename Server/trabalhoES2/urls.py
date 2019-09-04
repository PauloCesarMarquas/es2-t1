"""trabalhoES2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from cadastroAluno import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('aluno', views.alunoView),  
    path('show', views.alunoShow),  
    path('edit/<int:id>', views.alunoEdit),  
    path('update/<int:id>', views.alunoUpdate),  
    path('delete/<int:id>', views.alunoDestroy),  

    path('matricula', views.matriculaView),  
    path('matriculaShow', views.matriculaShow),  
    path('matriculaEdit/<int:id>', views.matriculaEdit),  
    path('matriculaUpdate/<int:id>', views.matriculaUpdate),  
    path('matriculaDelete/<int:id>', views.matriculaDestroy),  

    path('curso', views.cursoView),  
    path('cursoShow', views.cursoShow),  
    path('cursoEdit/<int:id>', views.cursoEdit),  
    path('cursoUpdate/<int:id>', views.cursoUpdate),  
    path('cursoDelete/<int:id>', views.cursoDestroy),  


    path('disciplina', views.disciplinaView),  
    path('disciplinaShow', views.disciplinaShow),  
    path('disciplinaEdit/<int:id>', views.disciplinaEdit),  
    path('disciplinaUpdate/<int:id>', views.disciplinaUpdate),  
    path('disciplinaDelete/<int:id>', views.disciplinaDestroy),
]