from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView

from django.contrib.auth.models import User
from .models import Project, Document, Tag

from .serializers import UserSerializer, ProjectSerializer, ProjectSerializerRead, TagSerializerRead, TagSerializerPost, DocumentSerializerRead, DocumentSerializer

# Get all users
@api_view(['GET'])
def users_all(request):
  if request.method == 'GET':
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Get an individual user
@api_view(['GET'])
def user_individual(request, pk):
  try: 
      user = User.objects.get(pk=pk)
  except User.DoesNotExist: 
    return Response(
      {'message': 'This user does not exist'}, 
      status=404
    ) 
  if request.method == 'GET':
    serializer = UserSerializer(user)
    return Response(serializer.data)


# Get all projects or Create a new project
@api_view(['GET', 'POST'])
def projects_all(request):
  if request.method == 'GET':
    projects = Project.objects.all()
    serializer = ProjectSerializerRead(projects, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, 201)
    return Response(serializer.errors, 400)

# Get all projects that a user can view
@api_view(['GET'])
def projects_user(request, user):
  try: 
      project = Project.objects.filter(Q(users__in=user) | Q(visibility="public")).distinct()
  except Project.DoesNotExist: 
    return Response(
      {'message': 'This user has no projects'}, 
      status=404
    ) 
  if request.method == 'GET':
    serializer = ProjectSerializerRead(project, many=True)
    return Response(serializer.data)

# Get a specific project, Modify a specific project, or Delete a specific project
@api_view(['GET', 'PATCH', 'DELETE'])
def project_individual(request, pk):
  try: 
      project = Project.objects.get(pk=pk) 
  except Project.DoesNotExist: 
    return Response(
      {'message': 'This project does not exist'}, 
      status=404
    ) 
  if request.method == 'GET':
    serializer = ProjectSerializerRead(project)
    return Response(serializer.data)
  elif request.method == 'PATCH':
    serializer = ProjectSerializer(project, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, 200)
    return Response(serializer.errors, 400)
  elif request.method == 'DELETE':
    project.delete()
    return Response(
      {'message': 'This project has been deleted'}, 
      status=204
    )


# Get all tags
@api_view(['GET', 'POST'])
def tags(request):
  if request.method == 'GET':
    tags = Tag.objects.all()
    serializer = TagSerializerRead(tags, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = TagSerializerPost(data=request.data, many=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, 201)
    return Response(serializer.errors, 400)

@api_view(['DELETE'])
def tags_project(request, project_id):
  if request.method == 'DELETE':
    tags = Tag.objects.filter(project_id=project_id)
    tags.delete()
    return Response(
      {'message': 'All tags have been deleted for this project'}, 
      status=204
    )

@api_view(['GET'])
def documents_all(request):
  if request.method == 'GET':
    documents = Document.objects.all()
    serializer = DocumentSerializerRead(documents, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE'])
def document_individual(request, pk):
  try: 
      document = Document.objects.get(pk=pk) 
  except Document.DoesNotExist: 
    return Response(
      {'message': 'The document does not exist'}, 
      status=404
    ) 
  if request.method == 'GET':
    serializer = DocumentSerializerRead(document)
    return Response(serializer.data)
  elif request.method == 'DELETE':
    document.delete()
    return Response(
      {'message': 'This project has been deleted'}, 
      status=204
    )

@api_view(['GET'])
def documents_project(request, project_id):
  try: 
      document = Document.objects.filter(project_id=project_id) 
  except Document.DoesNotExist: 
    return Response(
      {'message': 'This project has no documents'}, 
      status=404
    ) 
  if request.method == 'GET':
    serializer = DocumentSerializerRead(document, many=True)
    return Response(serializer.data)

class DocumentUpload(APIView):
		parser_classes = (MultiPartParser, FormParser)
		def post(self, request, *args, **kwargs):
				serializer = DocumentSerializer(data=request.data)
				if serializer.is_valid():
						serializer.save()
						return Response(serializer.data, status=201)
				else:
						return Response(serializer.errors, status=400)