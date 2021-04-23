from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Project, Profile, Document
from .serializers import ProjectSerializer, ProfileSerializer, DocumentSerializer

@api_view(['GET'])
def projects_all(request):
  if request.method == 'GET':
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def project_individual(request, pk):
  try: 
      project = Project.objects.get(pk=pk) 
  except Project.DoesNotExist: 
    return Response(
      {'message': 'The project does not exist'}, 
      status=404
    ) 

  if request.method == 'GET':
    serializer = ProjectSerializer(project)
    return Response(serializer.data)


@api_view(['GET'])
def profiles_all(request):
  if request.method == 'GET':
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def profile_individual(request, pk):
  try: 
      profile = Profile.objects.get(pk=pk) 
  except Profile.DoesNotExist: 
    return Response(
      {'message': 'The profile does not exist'}, 
      status=404
    ) 

  if request.method == 'GET':
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['GET'])
def documents_all(request):
  if request.method == 'GET':
    documents = Document.objects.all()
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def document_individual(request, pk):
  try: 
      document = Document.objects.get(pk=pk) 
  except Document.DoesNotExist: 
    return Response(
      {'message': 'The document does not exist'}, 
      status=404
    ) 

  if request.method == 'GET':
    serializer = DocumentSerializer(document)
    return Response(serializer.data)