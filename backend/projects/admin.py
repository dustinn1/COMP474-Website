from django.contrib import admin
from .models import Project, Document, Tag

class ProjectAdmin(admin.ModelAdmin):
  list_display = ('project_name', 'visibility', 'date_started', 'date_ended')
  list_filter = ('visibility', 'date_started', 'date_ended')

admin.site.register(Project, ProjectAdmin)

class DocumentAdmin(admin.ModelAdmin):
  list_display = ('title', 'project_id', 'added_by', 'date_added')
  list_filter = ('date_added', )

admin.site.register(Document, DocumentAdmin)

class TagAdmin(admin.ModelAdmin):
  list_display = ('name', 'project_id')

admin.site.register(Tag, TagAdmin)
