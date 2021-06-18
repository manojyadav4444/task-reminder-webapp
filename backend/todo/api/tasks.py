from __future__ import absolute_import, unicode_literals
from celery import shared_task
import time

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import notification


@shared_task
def manoj(x):
    titl, username = [temp for temp in x.split('$')]
    print(titl,"@@@@@@@@@@@@@@@@@",username)
    obj = notification(user_name=username, title=titl)
    obj.save()
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'task_group_a',
        {
                'type': 'task_message',
                'message': ""+str(x)
        }
    )


@shared_task
def later(x):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'task_group_a',
        {
                'type': 'task_message',
                'message': ""+str(x)
        }
    )
    return x
   