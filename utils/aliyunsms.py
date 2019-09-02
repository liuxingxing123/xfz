#!/usr/bin/env python
# coding=utf-8
import json

from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
# 不需要在里面添加<>
# client = AcsClient('<LTAI72sEXbdIvPtT>', '<sSjTRjrWCzSv7CQEDZldqIWFutepen>', 'default')
client = AcsClient('LTAI72sEXbdIvPtT', 'sSjTRjrWCzSv7CQEDZldqIWFutepen', 'default')


def send_sms(phone_numbers, code):
    request = CommonRequest()
    request.set_accept_format('json')
    request.set_domain('dysmsapi.aliyuncs.com')
    request.set_method('POST')
    request.set_protocol_type('https')  # https | http
    request.set_version('2017-05-25')
    request.set_action_name('SendSms')

    request.add_query_param('RegionId', "default")
    request.add_query_param('PhoneNumbers', phone_numbers)
    request.add_query_param('SignName', "小饭桌应用")
    request.add_query_param('TemplateCode', "SMS_172597882")
    template_param = json.dumps({"code": code})
    request.add_query_param('TemplateParam', template_param)
    response = client.do_action(request)
    # python2:  print(response)
    return str(response, encoding='utf-8')
