from django.contrib.auth import get_user_model
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)

class Project(models.Model):
    project_name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    visibility = models.CharField(max_length=7)
    date_started = models.DateField()
    date_ended = models.DateField()
    
    users = models.ManyToManyField(get_user_model(), related_name="users")
    manages = models.ManyToManyField(get_user_model(), related_name="managers")

    def __str__(self):
        return self.project_name

class Document(models.Model):
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    date_added = models.DateField()

    def __str__(self):
        return self.title