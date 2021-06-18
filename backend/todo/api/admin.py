from django.contrib import admin
from .models import task, relation, notification
# Register your models here.
@admin.register(task)
class taskAdmin(admin.ModelAdmin):
    list_display = ['id','title','dt','status','author']

@admin.register(relation)
class relationAdmin(admin.ModelAdmin):
    list_display = ['id','model_task_id','celery_task_id']    

@admin.register(notification)
class taskAdmin(admin.ModelAdmin):
    list_display = ['id','user_name','title']
