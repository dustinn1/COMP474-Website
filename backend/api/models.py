from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.
class document(models.Model):
    doc_name = models.CharField(max_length=20)

class Project(models.Model):
    project_name = models.CharField(max_length=40)
    from_dateRange = models.DateField()
    to_dateRange = models.DateField()
    tags = models.CharField(max_length=10)
    documents = models.ManyToManyField(document)

    def public_proj(self):
        return super(Project, self).filter(private=False)

    def private_proj(self):
        user = get_user_model()
        users = user.objects.all()
        return super(Project, self).filter(private=True, user=users)

class User(AbstractBaseUser):
    username = models.CharField(
        verbose_name='Username',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)  # a superuser

    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []  # required username and password fields

    def get_full_name(self):
        # The user is identified by username
        return self.username

    def get_short_name(self):
        # The user is identified by their username
        return self.username

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        """
                Creates and saves a User
                """
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_username(username),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        """
        Creates and saves a superuser
        """
        user = self.create_user(
            username,
            password=password,
        )
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    objects = UserManager()
