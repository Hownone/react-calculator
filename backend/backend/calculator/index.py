from django.urls import path
from backend.calculator.register import signup
from backend.calculator.get_status import InfoView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", signup, name="calculator_register"),
    path("get_status/", InfoView.as_view(),name="calculator_get_status"), #name是在后端渲染有用，前端渲染用不到
]
