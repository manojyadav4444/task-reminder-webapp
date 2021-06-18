from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import task, relation, notification
from .serializers import taskSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView
from datetime import datetime, timedelta
from .tasks import manoj, later
from celery.result import AsyncResult 
from rest_framework.response import Response 

class UserModelViewSet(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # authentication_classes=[JWTAuthentication]
    # permission_classes=[IsAuthenticated]

class taskModelViewSet(viewsets.ModelViewSet):
  queryset = task.objects.all()
  serializer_class = taskSerializer

  authentication_classes=[JWTAuthentication]
  permission_classes=[IsAuthenticated]

  def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        model_task_id_temp = instance.id
        obj = relation.objects.get(model_task_id=model_task_id_temp)
        celery_task_id_temp = obj.celery_task_id
        AsyncResult(celery_task_id_temp).revoke()
        obj.delete()
        self.perform_destroy(instance)
        
        return Response(status=status.HTTP_204_NO_CONTENT)

  def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        model_task_id_temp = serializer.data['id']
        obj = relation.objects.get(model_task_id=model_task_id_temp)
        celery_task_id_temp = obj.celery_task_id
        print(celery_task_id_temp, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        AsyncResult(celery_task_id_temp).revoke()
        temp = serializer.data['dt']
        current_user = self.request.user
        titl = serializer.data['title']
        titl=str(titl)+"$"+str(current_user.username)
        t = manoj.apply_async(args=[titl], eta=temp)
        obj.celery_task_id = t.id
        obj.save()
        print(t.id, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$", obj.celery_task_id)
        return Response(serializer.data)


  def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        titl = request.data.get('title')
        temp = request.data.get('dt') 
        current_user = self.request.user
        titl=str(titl)+"$"+str(current_user.username)
        t = manoj.apply_async(args=[titl], eta=temp)
        new_relation = relation(model_task_id=serializer.data['id'], celery_task_id=t.id)
        new_relation.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

  def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        notes = notification.objects.filter(user_name=user.username).order_by('id')
        for note in notes:
              titl=str(note.title)+"$"+str(user.username)
              later.delay(titl)
        notes.delete()
        return task.objects.filter(author=user.id)

  
  
        