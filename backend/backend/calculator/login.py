from django.contrib.auth import authenticate, login
from django.http import JsonResponse


def signin(request):
    data = request.GET
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    #print(user)
    if not user:
        return JsonResponse({
            'result': "Password or username incorrect"
        })
    login(request, user)

    return JsonResponse({
        'result': "success",
        "is_login": "true",
    })
