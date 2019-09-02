from django import template
from apps.payinfo.models import PayInfoOrder

register = template.Library()


@register.filter
def is_buyed(payInfo, user):
    if user.is_authenticated:
        result = PayInfoOrder.objects.filter(payInfo=payInfo, buyer=user, status=2).exists()
        return result
    else:
        return False
