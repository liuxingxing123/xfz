from django.urls import path
from . import views

app_name = 'payinfo'

urlpatterns = [
    path("", views.index, name='index'),
    path("payInfo_order/", views.payInfo_order, name='payInfo_order'),
    path("notify_view/", views.notify_view, name='notify_view'),
    path("download/", views.download, name='download'),
]
