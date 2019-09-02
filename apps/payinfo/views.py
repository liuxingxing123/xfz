from django.http import FileResponse,Http404
from django.shortcuts import render
from django.urls import reverse

from utils import restful
from .models import PayInfo,PayInfoOrder
from apps.xfzauth.decorators import xfz_login_required
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import  os


def index(request):
    context = {
        'payinfos': PayInfo.objects.all()
    }
    return render(request, "payinfo/payinfo.html", context=context)

@xfz_login_required
def payInfo_order(request):
    payInfo_id = request.GET.get("payInfo_id")
    payInfo = PayInfo.objects.get(pk=payInfo_id)
    order = PayInfoOrder.objects.create(payInfo=payInfo,buyer=request.user,status=2,amount=payInfo.price)
    context = {
        'goods': {
            'thumbnail': '',
            'title': payInfo.title,
            'price': payInfo.price,
        },
        'order': order,
        'notify_url': request.build_absolute_uri(reverse('payinfo:notify_view')),
        'return_url': request.build_absolute_uri(reverse('payinfo:index'))
    }
    return render(request,"course/course_order.html",context=context)

@csrf_exempt
def notify_view(request):
    orderid = request.POST.get("orderid")
    PayInfoOrder.objects.filter(pk=orderid).update(status=2)
    return restful.ok()

@xfz_login_required
def download(request):
    payInfo_id = request.GET.get("payInfo_id")
    order = PayInfoOrder.objects.filter(payInfo_id=payInfo_id,buyer=request.user,status=2).first()

    if order:
        payInfo = order.payInfo
        path = payInfo.path
        fp = open(os.path.join(settings.MEDIA_ROOT,path),'rb')
        response = FileResponse(fp)
        response['Content-Type'] = 'image/jpeg'
        response['Content-Disposition'] = 'attachment,filename="%s"'%path.split("/")[-1]
        return response
    else:
        return Http404

