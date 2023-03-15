from django.urls import path
from backend.calculator.login import signin
from backend.calculator.logout import signout
from backend.calculator.register import signup

urlpatterns = [
    path("login/", signin, name="calculator_login"),
    path("logout/", signout, name="calculator_logout"),
    path("register/", signup, name="calculator_register"),
]
