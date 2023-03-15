from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
#from backend.models.player import Player


def signup(request):
    data = request.GET
    username = data.get('username', "").strip()  # 获取用户名，如果没有的话返回空，并把前后空格去掉
    password = data.get('password', "").strip()
    password_confirm = data.get('password_confirm', "").strip()

    if not username or not password:
        return JsonResponse({
            'result': '用户名或密码不能为空',
        })
    if password != password_confirm:
        return JsonResponse({
            'result': '两次密码不一致',
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': '用户名已存在',
        })

    user = User(username=username)
    user.set_password(password)
    user.save()
    #Player.objects.create(user=user, photo="https://cdn-userpic.codeforces.com/486565/avatar/7004b8994370c323.jpg")
    login(request, user)
    return JsonResponse({
        'result': "success",
    })
