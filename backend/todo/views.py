from django.shortcuts import render
from rest_framework import status, viewsets , response

from . import models
from . import serializers

# Create your views here.

class TodoViewset(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer
        
