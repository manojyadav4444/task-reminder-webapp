from django.contrib import admin
from django.urls import path, include
from api import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from api.serializers import UserSerializer
import rest_framework
router = DefaultRouter()

router.register('todo', views.taskModelViewSet, basename='todo')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)), 
    path('register/', CreateAPIView.as_view(queryset=User.objects.all(), serializer_class=UserSerializer), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
]