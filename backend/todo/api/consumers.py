from channels.generic.websocket import  AsyncWebsocketConsumer
import json 
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import notification


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.room_group_name = "task_group_a"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def task_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

        titl, username = [temp for temp in x.split('$')]
        obj = notification.objects.filter(title=titl, user_name=user.username)
        obj.delete()


   