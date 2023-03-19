from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class InfoView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self,request):
        # 获取当前用户信息
        user = request.user
        print(user)
        return Response({
            'username': user.username,
            'result': "success",
        })
