from rest_framework import serializers
from .models import Profile, Project, Document

class ProjectSerializer(serializers.ModelSerializer):
  class Meta:
    model = Project
    fields = ('project_name', 'description', 'visibility', 'date_started', 'date_ended', 'users', 'managers')

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ('user', 'first_name', 'last_name')

class DocumentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Document
    fields = ('project_id', 'title', 'description', 'added_by', 'date_added')
