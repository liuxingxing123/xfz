from django.db import models
from shortuuidfield import  ShortUUIDField

class PayInfo(models.Model):
    title = models.CharField(max_length=100)
    profile = models.CharField(max_length=100)
    price = models.FloatField()
    # 文件存储的路径
    path = models.FilePathField()

class PayInfoOrder(models.Model):
    uid = ShortUUIDField(primary_key=True)
    payInfo = models.ForeignKey("PayInfo", on_delete=models.DO_NOTHING)
    buyer = models.ForeignKey("xfzauth.User", on_delete=models.DO_NOTHING)
    amount = models.FloatField(default=0)
    pub_time = models.DateTimeField(auto_now_add=True)
    # 1：代表的是支付宝支付。2：代表的是微信支付
    istype = models.SmallIntegerField(default=0)
    # 1：代表的是未支付。2：代表的是支付成功
    status = models.SmallIntegerField(default=1)