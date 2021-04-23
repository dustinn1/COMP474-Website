from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Project, Profile, Document
from .serializers import ProjectSerializer, ProfileSerializer, DocumentSerializer

@api_view(['GET'])
def projects(request):
  if request.method == 'GET':
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def profiles(request):
  if request.method == 'GET':
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def documents(request):
  if request.method == 'GET':
    documents = Document.objects.all()
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)