from django.contrib.auth import get_user_model
from django.db import models

class Project(models.Model):
    project_name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    visibility = models.CharField(max_length=7)
    date_started = models.DateField()
    date_ended = models.DateField()
    
    users = models.ManyToManyField(get_user_model(), related_name="users")
    managers = models.ManyToManyField(get_user_model(), related_name="managers", blank=True)

    def __str__(self):
        return self.project_name

class Tag(models.Model):
    name = models.CharField(max_length=10)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tags")

    def __str__(self):
        return self.name

class Document(models.Model):
    file = models.FileField(blank=False, null=False)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    added_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title