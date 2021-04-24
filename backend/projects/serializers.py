from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Document

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'first_name', 'last_name')

class ProjectSerializerRead(serializers.ModelSerializer):
  users = UserSerializer(read_only=True, many=True)
  managers = UserSerializer(read_only=True, many=True)

  class Meta:
    model = Project
    fields = ('id', 'project_name', 'description', 'visibility', 'date_started', 'date_ended', 'users', 'managers')

class ProjectSerializer(serializers.ModelSerializer):
  class Meta:
    model = Project
    fields = ('id', 'project_name', 'description', 'visibility', 'date_started', 'date_ended', 'users', 'managers')

class DocumentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Document
    fields = ('id', 'project_id', 'title', 'description', 'added_by', 'date_added')
