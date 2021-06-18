from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class task(models.Model):
    title = models.CharField(max_length=100)
    dt = models.DateTimeField()
    status = models.BooleanField()
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        default=1
    ) 

class relation(models.Model):
    model_task_id = models.IntegerField()
    celery_task_id = models.CharField(max_length=100)

class notification(models.Model):
    user_name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)