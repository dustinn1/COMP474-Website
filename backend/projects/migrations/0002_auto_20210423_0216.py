# Generated by Django 3.1.7 on 2021-04-23 02:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='manages',
            new_name='managers',
        ),
    ]