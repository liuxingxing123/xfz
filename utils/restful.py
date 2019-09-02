from django.http import JsonResponse


class HttpCode(object):
    ok = 200
    paramsError = 400
    unAuth = 401
    methodError = 405
    serverError = 500
    smsError = 406


def result(code=HttpCode.ok, message="", data=None, kwargs=None):
    json_dict = {"code": code, "message": message, "data": data}
    if kwargs and isinstance(kwargs, dict) and kwargs.keys():
        json_dict.update(kwargs)

    return JsonResponse(json_dict)


def params_error(message="", data=None):
    return result(code=HttpCode.paramsError, message=message, data=data)


def unauth(message="", data=None):
    return result(code=HttpCode.unAuth, message=message, data=data)


def method_error(message="", data=None):
    return result(code=HttpCode.methodError, message=message, data=data)


def ok():
    return result()


def server_error(message="", data=None):
    return result(code=HttpCode.serverError, message=message, data=data)


def sms_error(message="", data=None):
    return result(code=HttpCode.smsError, message=message, data=data)
